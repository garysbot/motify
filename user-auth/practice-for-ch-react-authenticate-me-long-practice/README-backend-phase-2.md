# Auth Me Backend, Phase 2: User Authentication And API Routes

Now that the data layer is complete, it is time to build out your application's
API and session-based authentication system. Let's quickly review authentication
conceptually before you write any code.

## Review of session-based authentication

To log in, a user must provide a valid credential and password. This establishes
a new login _session_, which is active until they log out. While this session is
active, whenever the user makes a new request, the server should be able to see
that they have an active session and identify who they are.

So how is this done?

1. After a user logs in or signs up, a `session_token` representing the newly
   active session is generated. It is stored in the `session_token` column for
   that user in the database. Until the user logs out, they just need to provide
   this token to establish their identity--it acts like temporary credentials.
2. The server gives this token to the user by putting it in the Rails `session`
   cookie, which is included in the server's response. The `session` cookie is a
   special cookie provided by the session middleware you added; it is encrypted
   and tamper-proof. As with all cookies, the session cookie is stored in the
   user's browser and sent back automatically with every subsequent request.
   Read more about it [here][session].
3. On each new request, the server checks for a token stored in the `session`
   cookie that was sent with the request. The server then looks for a
   corresponding `User` in the database whose `session_token` attribute matches
   the token in the request. If a matching user is found, they are considered
   the `current_user` for the current request-response cycle.
4. Upon logging out, a user's `session_token` should no longer be valid. Thus,
   the `session_token` attribute is reset for this user in the database. For
   good measure, it is removed from the `session` cookie as well.

## Session authentication methods in `ApplicationController`

To facilitate this process, you'll be writing some helper methods in
`ApplicationController`:

* `current_user`: returns the `User` whose `session_token` attribute matches the
  token provided in the `session` cookie.
* `login!(user)`: takes a `User` instance and resets their session token. The
  new token is then stored in the `session` cookie.
* `logout!(user)`: resets the session token of the `current_user` and clears
  the session token from the `session` cookie.
* `require_logged_in`: renders a message of 'Unauthorized' with a 401 status if
  there is no `current_user`. You can add this as a `before_action` callback for
  any controller actions that require a logged-in user.

Here's a skeleton with pseudocode to get you started:

```rb
# app/controllers/application_controller.rb

def current_user
  @current_user ||= # user whose `session_token` == token in `session` cookie
end

def login!(user)
  # reset `user`'s `session_token` and store in `session` cookie
end

def logout!
  # reset the `current_user`'s session cookie, if one exists
  # clear out token from `session` cookie
  @current_user = nil # so that subsequent calls to `current_user` return nil
end

def require_logged_in
  unless current_user
    render json: { message: 'Unauthorized' }, status: :unauthorized 
  end
end
```

Go ahead and fill out these methods. Remember that the `session` getter, defined
for controllers, returns a Hash-like object. Here's an example of how to use it:

```rb
# request from brand new user / browser, Sennacy's MacBook (Chrome)
session[:banana]            # => nil

# your app responds by changing `session[:banana]` to 'hello'
session[:banana] = 'hello'  

# another request from Sennacy's MacBook (Chrome)
session[:banana]            # => 'hello'

# your app responds by changing `session[:banana]` to nil
session[:banana] = nil  

# one more request from Sennacy's MacBook (Chrome)
session[:banana]            # => nil
```

You should choose a consistent key within the session where you'll store the
token, e.g., `session[:session_token]` or `session[:token]`.

## Testing your `ApplicationController` authentication methods

Once you've finished filling out these methods, it's time to test them. But how?
The `session` cookie comes from requests, which you can't create from the Rails
console. To test, you'll create a simple `test` route. Head to
__config/routes.rb__ and define the following route:

```rb
# config/routes.rb

post 'api/test', to: 'application#test'
```

All of your routes will start with `api/` to show that you're only returning
JSON data. You'll see later why you should use the `POST` method here. Run
`rails routes` to see the route this defined.

> **Note:** You never want any 'real' routes mapped to actions within
> `ApplicationController`, but for a simple test route like this, it's the
> easiest thing to do.

Go back to `ApplicationController` and define the following `test` action:

```rb
# app/controllers/application_controller.rb

# ...
def test
  if params.has_key?(:login)
    login!(User.first)
  elsif params.has_key?(:logout)
    logout!
  end

  if current_user
    render json: { user: current_user.slice('id', 'username', 'session_token') }
  else
    render json: ['No current user']
  end
end
# ...
```

Carefully read through this action and make sure you understand what each line
is doing. Read more about `slice` [here][slice].

Next, start your server (`rails s`), go to [`localhost:5000`] in your browser,
open up the Chrome console, and make the following `fetch` request:

```js
> await fetch('/api/test', { method: 'POST' }).then(res => res.json())
```

You should get `['No current user']` as the JSON response. (If not, debug your
`current_user` method.) This makes sense since you haven't logged in yet!

Next, make a request with a `login` query string param:

```js
> await fetch('/api/test?login', { method: 'POST' }).then(res => res.json())
```

You should see the 'Demo-lition' user returned under a key of `user`! (If not,
debug your `login!` method.) Take note of Demo-lition's `session_token`.

Next, remove the `login` query string param and run the `fetch` request a few
more times:

```js
> await fetch('/api/test', { method: 'POST' }).then(res => res.json())
```

Verify that Demo-lition is still logged in and that their `session_token`
doesn't change.

Finally, add a `logout` query string param:

```js
> await fetch('/api/test?logout', { method: 'POST' }).then(res => res.json())
```

You should get back `['No current user']`. Remove `logout` from the query
string, and make a few more requests. You should still get back `['No current
user']`. If not, debug your `logout!` method.

## User and session routes

You now have the necessary logic in place to support session authentication.
It's time to build out your real routes and controllers!

As mentioned before, since your backend's role is to be an API serving JSON
data, all your routes will be served at URL paths starting with `api/`.

You will be creating the following routes:

* **Signing up:** `POST api/users`
* **Retrieving the current user:** `GET api/session`
* **Logging in:** `POST api/session`
* **Logging out:** `DELETE api/session`

Go ahead and add the following routes to your __config/routes.rb__:

```rb
# config/routes.rb

namespace :api, defaults: { format: :json } do
  resources :users, only: :create
  resource :session, only: [:show, :create, :destroy]
end
```

Remember that by nesting your routes within `namespace :api`, each route path is
automatically prefixed with `api/`, each controller must be defined within
__app/controllers/api/__, and each controller class name must begin with
`Api::`.

Run `rails routes` to verify the routes you have created. Note that the singular
`resource` before `:session` causes the `show` and `destroy` routes to have no
`:id` wildcard. This is because, with your current application architecture,
each client can have at most one session.

## Generating user and session controllers

Next, it's time to define user and session controllers to handle requests to
your user and session routes.

Conveniently, Rails provides a generator for controller files. Run the following
command to create an `Api::UsersController` within __controllers/api__:

```sh
rails g controller api/users create --skip-routes
```

Here, `api/users` is the controller name. By prefixing it with `api/`, you
essentially tell Rails to do everything necessary for creating a namespaced
controller.

`create` tells Rails to include a stubbed `create` action.

`--skip-routes` tells Rails not to define new routes for the provided actions
(since you already defined them).

After verifying that the generator was successful, run:

```sh
rails g controller api/sessions show create destroy --skip-routes
```

## `Api::SessionsController`

Next, it's time to fill out your stubbed actions. Start with the
`Api::SessionsController` in __app/controllers/api/sessions_controller.rb__,
using the following pseudocode as guidance:

* `show`
  * if there is a `current_user`: render `current_user` as JSON, under a
    top-level key of `user`
  * if there is not a `current_user`: render `{ user: nil }` as JSON
* `create`
  * pass the credentials from the request body, stored under top level keys of
    `credential` and `password`, to `User::find_by_credentials`; save the result
    to `@user`
  * if a user with matching credentials was found (i.e., `@user` is truthy):
    * login `@user`
    * render `@user` as JSON, under a top-level key of `user`
  * if no user was found (i.e., `@user` is falsey):
    * render `{ errors: ['The provided credentials were invalid.'] }` as JSON,
      with a status of `:unauthorized`
* `destroy`
  * log out the `current_user`, if one exists
  * render `{ message: 'success' }` as JSON

> **Note:** You'll be replacing these JSON responses shortly. **You should never
> actually send a user's complete database data--which includes their
> `session_token`, `password_digest`, etc.--in a JSON response.**

Restart your server, then test your code by making the following `fetch`
requests in your Chrome console.

```js
> loginRequestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ credential: 'Demo-lition', password: 'password' })
  }

> await fetch('/api/session', loginRequestOptions).then(res => res.json())
// should return the 'Demo-lition' user

> await fetch('/api/session', { method: 'GET' }).then(res => res.json())
// should return the 'Demo-lition' user

> await fetch('/api/session', { method: 'DELETE' }).then(res => res.json())
// should return `{ message: 'success' }`

> await fetch('/api/session', { method: 'GET' }).then(res => res.json())
// should return `{ user: null }`
```

## `Api::UsersController`

Head to `Api::UsersController`.

The `create` action, which is used to sign up a new user, will use mass
assignment with [strong params] to set the new user's attributes.

Add the following code to the bottom of your users controller:

```rb
# app/controllers/api/users_controller.rb

private

def user_params
  params.require(:user).permit(:email, :username, :password)
end
```

To generate the strong params, you first `require` a top level key of `user`,
under which all of the user attributes from the request body will exist. This is
to clearly separate user attribute params from any other params that shouldn't
get passed to `User.new`.

It would be nice, though, if the frontend didn't need to use this nested
structure in every request that involves creating or updating a resource--the
frontend shouldn't have to care about the backend's implementation details.

Thankfully, Rails performs resource-based nesting automatically. For requests
whose body is formatted as JSON (and only those requests), Rails sees if it can
perform automatic nesting: it looks at the name of the controller that will
handle the request--say, `Api::BananasController`--and checks if there is an
Active Record model with a matching name (`Banana`).

If there is, Rails will look for top-level keys in the request body matching any
of the model's attributes (`Banana.attribute_names`), duplicating matching
parameters and nesting them under a top-level key corresponding to the model's
name (here, `banana`).

By default, then, any `username` or `email` keys in the body of `POST api/users`
requests will get automatically nested under a top-level key of `user`.

Unfortunately, a `password` will also be included in requests to sign up, and
that is technically not a `User` attribute--`password_digest` is.

You can override what keys you want Rails to automatically nest by making a call
to [`wrap_parameters`] at the top of any controller definition. Add the
following to the top of your `UsersController`:

```rb
# app/controllers/api/users_controller.rb

wrap_parameters include: User.attribute_names + ['password']
```

> **Note:** Since this automatic nesting occurs before the `params` object ever
> reaches your controllers, if you ever want automatic nesting of attributes
> that are camelCased in the request body, you must `include` them explicitly,
> just as you did above for `password`.

To test that your strong params are working, add `render json: user_params` to
your `create` action:

```rb
# app/controllers/api/users_controller.rb

def create
  render json: user_params
end
```

Then, make the following request from your Chrome console:

```js
> signupRequestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
      email: 'coolemail@hotmail.net', 
      username: 'cooluser',
      password: 'starwars',
    })
  }

> await fetch('/api/users', signupRequestOptions).then(res => res.json())
// should return an object with all three attributes from the request body
```

After confirming that your `user_params` work, fill out the `create` action:

* instantiate a new `User` instance, passing in `user_params`, and save it to
  `@user`
* try to save this `@user` to the database with `@user.save`
* if `@user.save` returns a `true` (i.e., the `@user` was saved to the
  database):
  * login `@user`
  * render `@user` as JSON
* if `@user.save` returns `false` (i.e., the `@user` failed your validations):
  * render `{ errors: @user.errors.full_messages }` as JSON, with a status of
    `:unprocessable_entity`

Test that your `create` action is working by using the same `fetch` request you
used to test `user_params`. Test that you successfully logged in this new user
by making a `fetch` request to `GET api/session`; this should return the new
user.

Congratulations! Your API is fully functional: you can sign up, log in, log out,
and retrieve the current user!

Next: On to Phase 3 (just as soon as you **commit your code**)!

[session]: https://guides.rubyonrails.org/v7.0.3/action_controller_overview.html#session
[slice]: https://api.rubyonrails.org/v7.0.3/classes/ActiveRecord/Core.html#method-i-slice
[strong params]: https://api.rubyonrails.org/v7.0.3/classes/ActionController/StrongParameters.html
[`wrap_parameters`]: https://api.rubyonrails.org/v7.0.3/classes/ActionController/ParamsWrapper.html
[`localhost:5000`]: http://localhost:5000