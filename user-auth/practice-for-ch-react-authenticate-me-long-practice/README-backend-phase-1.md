# Auth Me Backend, Phase 1: User Table And Model

Now that setup is complete, it's time to build out the basics of user
authentication. You'll start with the data layer--the 'M' within MVC--by
creating a `users` table and `User` Active Record model.

## Generate a `users` table and model

What data will you need to store in the `users` table?

To start, each user will have an `email` and a `username`. Both should be
strings and should be unique.

Each user will also have a password. However, you won't store that directly
(that would be a huge security risk). Rather, you'll want to store a hashed
version of their password called a `password_digest`. You'll never be able to
reverse-engineer a user's password from its digest; however, you'll be able to
check if a provided password matches a user's digest when they attempt to
login.

Finally, recall that after a user logs in or signs up, they're given a unique
`session_token`, which acts like temporary credentials for as long as they are
logged in (more on that later). This will be a unique, random string.

So, in addition to the customary `timestamps`, you will need four columns:
`email`, `username`, `password_digest`, and `session_token`. Run the following
generator command to create your `User` migration and model:

```sh
rails g model User email:string:uniq username:string:uniq password:digest session_token:string:uniq
```

Note that`password:digest` is a special attribute syntax that differs from the
typical `name:data_type:options`. It generates a `password_digest` column with a
type of string, and it also automatically includes [`has_secure_password`] in
your `User` model--refer back to the reading on `has_secure_password` for a
reminder on what this macro does.

First, you should complete your migration to create a `users` table. Head to the
newly created migration file in __db/migrate/__ and add `null: false`
constraints to every column:

```rb
# db/migrations/<UTC timestamp>_create_users.rb

# ...
t.string :email, null: false
t.string :username, null: false
t.string :password_digest, null: false
t.string :session_token, null: false
# ...
```

Next, run this migration to create the `users` table:

```sh
rails db:migrate
```

If you head to __db/schema.rb__, you should see your `users` table defined
there. Nice!

## Add validations and callbacks

Next, let's add some validations:

1. `username`, `email`, and `session_token` must all be present and unique (as
   per your database constraints).
2. `username` should be between 3 and 30 characters long:

   ```rb
   validates :username, length: { in: 3..30 }
   ```

3. `email` should be between 3 and 255 characters long
4. `email` should have the format of a valid email address. You can test this
   using a _regular expression_ (regex) with the [`format`] validation helper.
   Find an email regex online or use the `URI::MailTo::EMAIL_REGEXP` built into
   Ruby:

   ```rb
   validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }
   ```

5. `username` should **not** have the format of a valid email address. Follow a
   similar strategy to the one you used for `email`. Include a custom message
   for this validation: `can't be an email`.
6. `password`, if present, should be between 6 and 255 characters. Remember, a
   `password` will typically only be present upon creating a new `User`. Any
   existing `User` retrieved from the database will have a `nil` value for
   `password`, unless you explicitly provide the instance with a new
   `password`. For this reason, you should [`allow_nil`].

If you are forgetting some of the syntax for writing validations, be sure to
visit the [Rails guide][validations-guide] on validations.

Here's an example of what your finished validations might look like:

```rb
# app/models/user.rb

class User < ApplicationRecord
  validates :username, 
    uniqueness: true, 
    length: { in: 3..30 }, 
    format: { without: URI::MailTo::EMAIL_REGEXP, message:  "can't be an email" }
  validates :email, 
    uniqueness: true, 
    length: { in: 3..255 }, 
    format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :session_token, presence: true, uniqueness: true
  validates :password, length: { in: 6..255 }, allow_nil: true
end
```

Including a validation for `session_token` is a safeguard; however, this isn't
the user's responsibility to provide. You, the developer, should ensure
`session_token` is never `nil` by generating one for each new user
automatically. Let's do that before testing your validations.

Add the following lines to your `User` model class, below your validations:

```rb
# app/models/user.rb

before_validation :ensure_session_token

private

def generate_unique_session_token
  # in a loop:
    # use SecureRandom.base64 to generate a random token
    # use `User.exists?` to check if this `session_token` is already in use
    # if already in use, continue the loop, generating a new token
    # if not in use, return the token
end

def ensure_session_token
  # if `self.session_token` is already present, leave it be
  # if `self.session_token` is nil, set it to `generate_unique_session_token`
end
```

This code defines an `ensure_session_token` [callback] method that runs
automatically before validations are run. To get a random string,
`ensure_session_token` should call the `generate_unique_session_token` method,
which itself should use [`SecureRandom.base64`][base64]. Replace the pseudocode
provided above with your own code.

Let's test that your code works. Both of the above methods are private, so you
can't call them directly. Instead, in the Rails console (`rails c`), create a
blank new `User`, run `valid?` on the created user, and then verify that the
user's `session_token` is a random string:

```rb
[1] > User.new.tap(&:valid?).session_token
```

> **Note:** This uses [`Kernel#tap`][tap], a method that passes its receiver to
> the provided block, then returns its receiver. In the example above, `tap` is
> called on a `User` instance, the provided block calls `.valid?` on that user,
> then `tap` returns that same user so you can call `.session_token` on it
> afterward. `tap` allows you to chain together multiple method calls on the
> same object without ever having to save it to an intermediate variable. This
> is generally a bad idea in real code, but it's perfect for `pry`.

Next, test your validations. First, try creating a user without any attributes:

```rb
[2] > User.new.tap(&:valid?).errors.messages
```

You should get something like the following output in your console:

```rb
=> {:password=>["can't be blank"],
 :username=>["is too short (minimum is 3 characters)"],
 :email=>["is too short (minimum is 3 characters)", "is invalid"]}
```

It is not surprising that the `length` validations failed for `username` and
`email`. And it's good that the `session_token` didn't fail its `presence`
validation--that just means `ensure_session_token` is working.

But hold on, why is there a failed validation for `password`? Isn't it allowed
to be `nil`? Don't worry, Rails is just being sneaky. In fact, it is the
`presence` validation for `password_digest`--added by
`has_secure_password`--that has failed. Rails simply customized the resulting
error so that it would be associated with the `password` attribute.

Feel free to perform a few more tests on the `presence`, `length`, and `format`
validations. When you're ready, test the `uniqueness` validations:

```rb
[1] > attributes = Faker::Internet.user('username', 'email', 'password')
[2] > User.create(attributes)
[3] > User.create(attributes).tap(&:valid?).errors.messages
```

Here, you are using [`Faker`][faker] to generate some random attributes. The
first time you create a `User` with these attributes, it should save to the
database. The second attempt, though, should fail the `uniqueness` validations
for `username` and `email`, resulting in the following output:

```rb
=> {:username=>["has already been taken"], :email=>["has already been taken"]}
```

## Authentication methods

Finally, it is time to create the `User` authentication methods you'll be
calling from your controller actions: `User::find_by_credentials` and
`User#reset_session_token!`.

Anywhere below your validations and above your `private` methods, define a class
method `self.find_by_credentials`. This should take in a `credential` (either a
username or email) and a plaintext `password`.

In this method, use the [`find_by`] Active Record method to find a user whose
email or username matches the provided `credential`. To determine which field to
query by--`email` or `username`--check if the provided `credential` matches the
`URI::MailTo::EMAIL_REGEXP` regular expression. (Look through the documentation
for [`String`] and [`Regexp`] if you're not sure how to do that.)

If a matching user is found, check if the provided `password` matches their
`password_digest`. Use the `authenticate` instance method, defined by
`has_secure_password`, to do so--an example is provided in the documentation for
[`has_secure_password`].

Return the matching user if the provided password is correct. If no matching
user exists, or if the provided password is incorrect, return a falsey value.

Here's a method stub with some pseudocode to get you started:

```rb
# app/models/user.rb

# ...
def self.find_by_credentials(credential, password)
  # determine the field you need to query: 
  #   * `email` if `credential` matches `URI::MailTo::EMAIL_REGEXP`
  #   * `username` if not
  # find the user whose email/username is equal to `credential`

  # if no such user exists, return a falsey value

  # if a matching user exists, use `authenticate` to check the provided password
  # return the user if the password is correct, otherwise return a falsey value
end
# ...
```

Go ahead and test that `find_by_credentials` works:

```rb
[1] > User.destroy_all
[2] > User.create(username: 'usr', email: 'usr@email.io', password: 'starwars')
[3] > User.find_by_credentials('usr@email.com', 'starwars')
[4] > User.find_by_credentials('usr@email.io', 'startrek')
[5] > User.find_by_credentials('usr', 'starwars')
[6] > User.find_by_credentials('usr@email.io', 'starwars')
```

Here, you start by destroying existing users to avoid accidentally failing any
uniqueness validations, then you create a new `User`. The first two calls to
`find_by_credentials` should return falsey values, because of a wrong
`credential` in the first case and a wrong `password` in the second. The last
two calls should return the `User` instance you created.

After passing these tests, go ahead and write a `reset_session_token!` instance
method. Use `User::generate_unique_session_token` and the [`update!`] Active
Record instance method:

```rb
# app/models/user.b

def reset_session_token!
  # `update!` the user's session token to a new, random token
  # return the new session token, for convenience
end
```

Then, test your method:

```rb
[1] > u = User.first
[2] > old_token = u.session_token
[3] > new_token = u.reset_session_token!
[4] > u.session_token != old_token
[5] > u.session_token == new_token
```

The last two conditions should both return `true`.

Congratulations! Your `User` model is now complete, with working validations and
authentication methods!

## Seeding your database

It'll be nice to have some preexisting `User` instances for testing your
upcoming controllers and routes. Paste the following into __db/seeds.rb__:

```rb
# db/seeds.rb

ApplicationRecord.transaction do 
  puts "Destroying tables..."
  # Unnecessary if using `rails db:seed:replant`
  User.destroy_all

  puts "Resetting primary keys..."
  # For easy testing, so that after seeding, the first `User` has `id` of 1
  ApplicationRecord.connection.reset_pk_sequence!('users')

  puts "Creating users..."
  # Create one user with an easy to remember username, email, and password:
  User.create!(
    username: 'Demo-lition', 
    email: 'demo@user.io', 
    password: 'password'
  )

  # More users
  10.times do 
    User.create!({
      username: Faker::Internet.unique.username(specifier: 3),
      email: Faker::Internet.unique.email,
      password: 'password'
    }) 
  end

  puts "Done!"
end
```

Then, run `rails db:seed`.

Good job! **Commit your code,** then proceed to Phase 2!

[callback]: https://guides.rubyonrails.org/v7.0.3/active_record_callbacks.html
[faker]: https://github.com/faker-ruby/faker
[tap]: https://ruby-doc.org/core-3.0.2/Kernel.html#method-i-tap
[`has_secure_password`]: https://api.rubyonrails.org/classes/ActiveModel/SecurePassword/ClassMethods.html 
[`allow_nil`]: https://guides.rubyonrails.org/v7.0.3/active_record_validations.html#allow-nil
[`format`]: https://guides.rubyonrails.org/v7.0.3/active_record_validations.html#format
[validations-guide]: https://guides.rubyonrails.org/v7.0.3/active_record_validations.html
[base64]: https://ruby-doc.org/stdlib-3.0.2/libdoc/securerandom/rdoc/Random/Formatter.html#method-i-base64
[`find_by`]: https://api.rubyonrails.org/v7.0.3/classes/ActiveRecord/FinderMethods.html#method-i-find_by
[`String`]: https://ruby-doc.org/core-3.0.2/String.html
[`Regexp`]: https://ruby-doc.org/core-3.0.2/Regexp.html
[`update!`]: https://api.rubyonrails.org/v7.0.3/classes/ActiveRecord/Persistence.html#method-i-update-21