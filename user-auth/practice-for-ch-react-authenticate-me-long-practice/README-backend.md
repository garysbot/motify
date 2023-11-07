# Authenticate Me, Part 1: Backend

In this multi-part project, you will learn how to put together an entire Rails +
React application with authentication. In Part 1, you will build the Rails
backend. In Part 2, you will build the React frontend. Finally, in Part 3, you
will deploy your full stack authentication project to Heroku, making it a live
web app.

Let's get started!

## Phase 0: Backend setup

First, make sure that you are not inside an existing git repository. Then create
a new Rails API application called `authenticate-me`:

```sh
rails new authenticate-me -d=postgresql --api --minimal -T
```

Create an initial git commit: run `git add .` and `git commit -m "Initial
commit"`. Then run `git branch` to verify that your default branch is named
`main`. If it has a different name--e.g., `master`--rename it: `git branch -M
main`.

During development, you'll want your server to listen to requests on port 5000,
reserving port 3000 for your frontend. Go to __config/puma.rb__ and look for the
following line, around line 18:

```rb
# config/puma.rb

port ENV.fetch("PORT") { 3000 }
```

Change `3000` to `5000`:

```rb
# config/puma.rb

port ENV.fetch("PORT") { 5000 }
```

Finally, initialize your database:

```sh
rails db:create
```

### Add dependencies to Gemfile

Next, head to your Gemfile. At the top level, you should add `bcrypt` and
`jbuilder`.

Then, within the `:development` group, add some convenience gems:
`annotate`, `pry-rails`, `better_errors`, and `binding_of_caller`.

Within the `:development, :test` group, add the `faker` gem. You can also
optionally replace the default `debug` gem with `byebug` if you want to use
Byebug for debugging. If you do so, you'll want to add the line
`.byebug_history` to your __.gitignore__.

```rb
# Gemfile

# Add the following gems at the top level
gem "bcrypt"
gem "jbuilder"

# Add the `faker` gem to the `:development, :test` group
# Optionally replace `"debug"` with `"byebug"`
group :development, :test do
  gem "byebug", platforms: %i[ mri mingw x64_mingw ]
  gem "faker"
end

# Add the following gems to the `:development` group
group :development do
  gem "annotate"
  gem "pry-rails"
  gem "better_errors"
  gem "binding_of_caller"
end
```

After adding all these gems, run `bundle install`.

### Add session support

By default, an API-only Rails application does not include cookie support.
Session-based authentication requires cookies, however, so you'll need to
explicitly opt in to using them.

To do so, you'll need to add middleware for cookie and session management. Head
to __config/application.rb__ and add the following lines inside the
`Application` class:

```rb
# config/application.rb

module Backend
  class Application < Rails::Application
    # ...
    config.middleware.use ActionDispatch::Cookies
    config.middleware.use ActionDispatch::Session::CookieStore,
      key: '_auth_me_session',
      same_site: :lax, 
      secure: Rails.env.production?
  end
end
```

The `key` option here simply sets the name of the session cookie.

Skipping `same_site` for the moment, the `secure` option specifies whether or
not the cookie requires a secure context (i.e., `https`).

The `same_site` option specifies restrictions on sending the cookie along with
requests from [third-party] sites, behavior that could expose your app to
certain CSRF attacks. You can set `same_site` to:

* `Strict` - Send the cookie only when making requests from the same site.
* `Lax` - Send the cookie only for requests from the same site or when
  actually navigating to the site through a link. This is the current default
  setting in Chrome and Rails.
* `None` - Always send the cookie (i.e., a cross-domain cookie). This setting is
  useful, e.g., if you want to store information that users send to your app
  from other websites (likes, wishlist items, videos on your site to watch
  later, etc.). This was the default behavior everywhere until the standard
  changed in 2019-20. **Note:** `secure` must be true if `same_site` is `:none`.

Because default values for the cookie `same_site` attribute are currently in
flux across different browsers, best practice is always to set the `same_site`
attribute explicitly. Since you will be hosting your frontend and backend
together, requests from your frontend will be coming from the same domain, so
`:lax` should be fine.

For more information about cookies and the http `SameSite` attribute, see [this
great web.dev article][samesite] and the [MDN docs][mdn-samesite].

### Transform request and response keys

Lastly, you'll want to set up automatic transformations of keys in requests and
responses so that your frontend code can consistently use camelCase and your
backend code can consistently use snake_case.

Requests are created on the frontend and processed on the backend. So their
keys should be converted from camelCase to snake_case. You'll do this by using a
`before_action` [controller filter][filters] to transform the keys in your
`params` before you hit any controller actions. Head to
__app/controllers/application_controller.rb__ and add the following:

```rb
# app/controllers/application_controller.rb

before_action :snake_case_params

private

def snake_case_params
  params.deep_transform_keys!(&:underscore)
end
```

Responses, on the other hand, are created on the backend but handled on the
frontend, so their keys should be converted from snake_case to camelCase. You'll
be using Jbuilder to construct your responses; thankfully, you can instruct
Jbuilder to transform the keys in your responses before you send them out. Head
to __config/environment.rb__ and add the following lines at the end:

```rb
# config/environment.rb

# ...
Jbuilder.key_format camelize: :lower
Jbuilder.deep_format_keys true
```

This is a good time to **commit your code.**

[third-party]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#third-party_cookies
[samesite]: https://web.dev/samesite-cookies-explained/
[mdn-samesite]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite
[filters]: https://guides.rubyonrails.org/v7.0.3/action_controller_overview.html#filters