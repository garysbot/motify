# Authenticate Me, Part 3: Deploying Your Rails + React App To Heroku

You will be using [Heroku] to deploy the live, production version of your
Rails-React app.

## Heroku: An Overview

Heroku is what's known as a Platform as a Service (PaaS). It provides you a free
domain where you can host your app (`<your-app-name>.herokuapp.com`) and
servers for running your app and its database.

What distinguishes Heroku from more bare-bones Infrastructure as a Service
(IaaS) platforms is that it provides numerous tools for easily managing and
scaling your app, doing a lot of the dirty work of network administration for
you.

For instance, Heroku takes care of setting up your server's runtime environment
for you: installing necessary dependencies, running the appropriate scripts for
compiling your code, setting environment variables, etc. You just need to tell
Heroku _what_ you want it to do; you don't need to worry about the _how_.

Another great thing about Heroku is that it uses `git` to manage your source
code. Just like GitHub can host remote repos, you'll create a remote repo on
Heroku for your project. All you will need to do then is `push` to this repo!

## Phase 1: Setting up your Rails + React application

Right now, your React application is on a different localhost port than your
Rails application. However, since your React application consists only of
static files that don't need to bundled continuously with changes in production,
your Rails application can serve the React assets in production too.

Running `npm run build` in the __frontend__ folder typically builds these static
files in the __frontend/build__ folder. For Rails to serve up these files,
however, you instead want to store them in the __public__ folder of your Rails
backend. To achieve this, specify a new `BUILDPATH` at the beginning of the
`build` script in your __frontend/package.json__:

```json
// frontend/package.json

  // ...
  "scripts": {
    "start": "react-scripts start",
    "build": "BUILD_PATH='../public' react-scripts build",
    // ...
  },
```

By specifying the build path in this way, you are instructing the script to
overwrite everything currently in __backend/public__ with the files of the
latest build. (Bye-bye __robots.txt__!) Once you've made this change, run `npm
build` in your __frontend__ directory and confirm that it populates the
top-level __public__ folder with your build files.

Next you need to tell Rails to serve up __public/index.html__ for any route that
does not begin with `api/`. For this, you will need to add another controller
and adjust your __routes.rb__ file.

Starting with the controller, create a new __static_pages_controller.rb__ file
inside your __app/controllers__ folder. All this controller needs to do is
`render file: Rails.root.join('public', 'index.html')`. In fact, you could have
just created a `frontend_index` action in your `ApplicationController` to handle
this case, except that your `ApplicationController` inherits from
`ActionController::API`, and `ActionController::API` **cannot** serve up html
pages. Making a new `StaticPagesController` that inherits from
`ActionController::Base` enables you to keep all of your other controllers
API-specific (i.e., **fast and lean**).

```rb
# app/controllers/static_pages_controller.rb

class StaticPagesController < ActionController::Base
  def frontend_index
    render file: Rails.root.join('public', 'index.html')
  end
end
```

In __config/routes.rb__, add the following catch-all route **after all of your
other routes**:

```rb
#config/routes.rb

get '*path', to: "static_pages#frontend_index"
```

Again, you can check that this worked. Boot up your Rails server and go to
[`http:localhost:5000`]. If everything is correctly configured, you should now
see your React pages showing up on port 5000!

### Getting your app ready for Heroku

There are a couple more things you need to configure before turning your
attention to Heroku. First, you ideally want Heroku to take care of building
your React app and storing the files in the __public__ folder. That way, you
don't have to worry about re-doing that task every time you make a small change
and push up new code.

Before discussing how to do this, it will be helpful to understand how Heroku
handles your app. When you push a repo to Heroku, Heroku examines the root
directory to see what kind of app it is. In this case, the __Gemfile__ will
signal to Heroku that your project is a Ruby app. The `railties` gem inside the
__Gemfile__ lets Heroku know that our project is also a Rails 7 app. Heroku will
accordingly proceed to run the usual build steps for deploying a Ruby-on-Rails
app, from running `bundle install` to deploying the web server with `rails
server`.

That's great for a Rails project, but you also need Heroku to handle the
JavaScript React portion of your app. For Heroku to recognize the React portion
of the project, it also needs to find a __package.json__ file to run **in the
root directory.**

In the root directory, run `npm init --yes` to create the __package.json__ with
default values. Inside the file, remove the "main" key/value pair. You could
also adjust the "name" and/or add a "description". What this file really needs
to do, however, is establish 1) engine versions and 2) scripts.

First, under a key of `"engines"`, specify the `node` version that Heroku should
use when running your app, either the exact version (e.g., `16.13.2`), a minor
range (e.g., `16.13`), or a major range (e.g., `16.x`):

```json
"engines": {
  "node": "16.x"
},
```

> **Note:** Since Node often releases security patches on all major versions,
> Heroku recommends specifying a major version range for Node, which will
> install the latest patch upgrades.

To find out which version you are using locally, run `node -v` in the
terminal.

Second, under `"scripts"`, replace `"test"` with the following `"build"` script:

```json
"scripts": {
  "build": "npm install --prefix frontend && npm run build --prefix frontend"
}
```

As part of its JS initialization, Heroku will automatically run "npm install" in
the root directory and then run the `build` script (if present) in the
root-level __package.json__. Here you tell it to `build` by running `npm
install` in the __frontend__ directory (`--prefix frontend`), followed by `npm
run build`, also in the __frontend__ directory. Thanks to this `build` script in
your __frontend/package.json__, Heroku will now build your frontend for you!

Test that this works by running `npm install && npm run build` in your root
directory. Feel free to add any other scripts you might find useful to run
locally to your root-level __package.json__.

Also, there's no reason to upload those big files in the __public__ directory
since they will just be overwritten on Heroku anyway, so add `/public` to your
root-level __.gitignore__. If you have already committed __public__ files to
version control, you will need to remove them from git before the __.gitignore__
will work. (If the files are not greyed-out in VSCode, they are not being
ignored.) Run this command in the root directory:

```sh
git rm -r --cached public
```

The files in __public__ will turn red in VSCode and show that they are marked
for deletion. Because you used the `--cached` flag, however, they won't be
deleted from your local machine, just the git repo. Once you stage and commit
the changes, the files will simply turn the desired grey.

**Tip:** Verify that files in __frontend/public__ are **NOT** being ignored.

The last configuration task is to create a __Procfile__ (no extension).
[__Procfile__s][procfiles] list the commands to run for various process types.
Each line has the form `<process type>: <command>`. For example, you can specify
your app's web server like this: `web: rails server -p $PORT -e $RAILS_ENV`.
Heroku would likely guess that command for a Rails app, but it's always best to
specify explicitly, especially since you have a hybrid app.

More importantly, a __Procfile__ gives you the opportunity to identify commands
to run before deploying a new release. In this case, it will prove convenient to
have Heroku automatically migrate any new migrations before deploying your app.
You can achieve this with a __Procfile__ that looks like this:

```plaintext
web: rails server -p $PORT -e $RAILS_ENV
console: rails console
release: rails db:migrate
```

(The first two lines copy Heroku defaults for Rails apps.)

Before committing your changes, use the magnifying glass in VSCode's left-hand
menu (or `cmd+shift+F`) to search your project and make sure that you have
removed all `debugger`s, extraneous `print`/`puts`/`p`s, and unnecessary
`console.log`s.

Also, if you use Faker in your seed file, move the `faker` gem to the top level
of your __Gemfile__ so it will be available when you go to seed your production
database. Similarly, if you want to use `pry` instead of `irb` for your
production console, move `pry-rails` to the top level of your __Gemfile__. If
you make any changes, `bundle install` to make sure everything still works.

Your app should now be ready. **Commit the changes to your `main` branch!**

## Phase 2: Deploy to Heroku

Now that you've prepared your app, it's time to set up Heroku and push your app
to production!

### Step 1: Create a new Heroku app

+ [Create an account][heroku-signup] on Heroku.

+ Create a new app. From the [dashboard], click `New` > `Create a new app`. Give
  it a unique name, and don't change the region. Click `Create app`.

### Step 2: Add buildpacks

Once it has discerned the type of app you have pushed, Heroku uses _buildpacks_
to know how to proceed. As noted above, it can often determine what buildpack to
use automatically. You need it to run two buildpacks, however--Ruby and
NodeJS--and you need them run in a specific order. (You want to make sure Heroku
builds your frontend first so Rails can incorporate the build files correctly.)

You can read more about the Ruby buildpack [here][ruby-buildpack], the Node.js
buildpack [here][node-buildpack].

To install the buildpacks:

+ Go to the _Settings_ tab in your newly created app's dashboard.
+ Scroll down to _Buildpacks_, click `Add buildpack`, and select
  `heroku/nodejs`.
+ Click `Add buildpack` again and select `heroku/ruby`.

The buildpacks will run in the order you install them.

### Step 3: Add config vars (environment variables)

+ Still in the _Settings_ tab, look for the _Config Vars_ section, and click
  `Reveal Config Vars`. These [configuration variables][config-vars] will be
  included in your app's environment on Heroku.

+ Create a key of `RAILS_MASTER_KEY`. Find the file __config/master.key__ in
  your Rails app, copy the string in that file, and paste it as the value for
  this variable on Heroku. (Heroku won't receive this file when you push, since
  it is git ignored). By giving Heroku access to your master key, your
  production app will have access to any [encrypted
  credentials][rails-credentials] you might create.

### Step 4: Pushing to Heroku

+ Install the Heroku Command Line Interface (CLI) by following [these
  instructions][heroku-cli].

+ Head to the _Deploy_ tab of your Heroku dashboard. Under _Deploy using Heroku
  Git_, find the _Existing Git repository_ header. Copy the command there (it
  should start with `heroku git:remote`) and run it in your terminal within your
  backend repo.

+ Push to Heroku: `git push heroku main`.

  + You may get an error message with `Failed to install gems via Bundler` in
    red. Above this, you might see a message that: 'Your bundle only supports
    platforms \["<some-platform>"] but your local platform is x86_64-linux'.

  + If you get this error, run the following command:

    ```sh
    bundle lock --add-platform x86_64-linux
    ```

    Then add all, commit, and run `git push heroku main` again.

  + You also might see a yellow `###### WARNING` letting you know that `There is
    a more recent Ruby version available for you to use.` Just ignore this for
    now. (Updating your Ruby version sounds simple, but it will likely take more
    time than you want to give it right now.)

  + If the process fails to complete successfully, read the error messages
    carefully and adjust accordingly. Ask an instructor if you get stuck.

### Step 5: Seeding your production database

Remember that your development database and production database are distinct.
The `release` command in your __Procfile__ took care of migrating your database,
but you might want to seed it too, at least after this initial push. To do
so, you will need access to the command line of your production app. This is
made easy by the Heroku CLI. To run a command in your app's production
environment on Heroku's computers, just start the command with `heroku run`.

+ Run the following command in your terminal to seed your database:

  ```sh
  heroku run rails db:seed
  ```

+ Test that the seed was successful:

  ```sh
  heroku console
  ```

  This will open your production Rails console using the command from your
  __Procfile__. (You could also use `heroku run rails c`.) Inside the console,
  run `User.all`. You should see the users you seeded to your production
  database!

### Step 6: See your site!

Once you've finished the above steps, run `heroku open` to open
`https://<your-app-name>.herokuapp.com` in a browser and see your live app!

If you see an `Application Error` or are experiencing different behavior than
what you see in your local environment, check the logs by running:

```bash
heroku logs
```

If you want Heroku to output the logs to your terminal continuously, run

```bash
heroku logs --tail
```

The logs may give you clues as to why you are experiencing errors or different
behavior.

### Wrapping up

If you made it this far, Congratulations! You've created a production-ready,
dynamic, full-stack website that can be securely accessed anywhere in the world!
Give yourself a pat on the back. You're a web developer!

[Heroku]: https://www.heroku.com/
[procfiles]: https://devcenter.heroku.com/articles/procfile
[heroku-signup]: https://signup.heroku.com/
[ruby-buildpack]: https://devcenter.heroku.com/articles/ruby-support
[node-buildpack]: https://devcenter.heroku.com/articles/nodejs-support
[dashboard]: https://dashboard.heroku.com/
[rails-credentials]: https://guides.rubyonrails.org/security.html#custom-credentials
[heroku-cli]: https://devcenter.heroku.com/articles/heroku-command-line
[config-vars]: https://devcenter.heroku.com/articles/config-vars
[`http:localhost:5000`]: http:localhost:5000