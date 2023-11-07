# Auth Me Frontend, Interlude (1.5): Sessions, Sessions Everywhere!

It's easy to confuse all the different ways that "session" gets used. For
example, you saw in Backend Phase 3 that an authenticity token is tied to the
browser session (which is tracked through a session cookie), not an individual
user's session in your app. That's why, as long as you are using the same
browser, you can use the same authenticity token to log in a user, log out that
user, and log in a completely different user.

## `sessionStorage`

As mentioned in Frontend Phase 0, `sessionStorage` represents yet another
session, namely a browser tab session. To see the difference between the session
cookie and `sessionStorage`, open a new tab in your browser, go to
[http://localhost:3000], and log in. Before reading any further, answer this
question: If you now open [http://localhost:3000] in a new tab, will you be
logged in or logged out, and why?

Once you have an answer, test it to see if you are right! Open a new tab and go
to [http://localhost:3000] again.

When the page loads, it will show you as logged in under the same user as the
previous tab. How does that happen if `sessionStorage` is new with every browser
tab?

## From session to session to session

`sessionStorage` does indeed start out empty in this new tab. When your app
finds nothing in `sessionStorage`, however, it fires off a request to
`api/session` to find out if there is a current session. The browser session
cookie--which persists from tab to tab--gets sent with that request.

When your backend gets the request, it looks in the (browser) session cookie for
a user's (app) session token (remember `session[:session_token]`?). It then
returns the user--if any--who has that particular (app) session token. When your
frontend gets the response, it then stores the relevant information in the tab's
`sessionStorage`.

To verify that this is what happened, open the browser DevTools. You should see
a `session/setCurrentUser` (or your equivalent) action logged in the console. If
you look in `prev state`, you should see the session user as `null`; `next
state` should then show the currently logged-in user. Now, however, the user is
stored in `sessionStorage`. Go ahead and refresh the page. This time it still
shows you as logged in, but no action needs to be dispatched because no query
was made to the backend. The console is empty.

In fact, go crazy: in the same tab, open a completely different website (MDN,
Amazon, ESPN, whatever). In the DevTools console, check the value of
`sessionStorage["X-CSRF-Token"]`. It will likely report the value as `undefined`
because `sessionStorage` is site specific. (If your currently loaded site also
happens to use that particular key, note the value; it will be different than
the value stored for your site.)

Now, still in the same tab, navigate to [http://localhost:3000] again. What do
you see? You are still logged in, but no action was dispatched. `sessionStorage`
for the win! Check the `sessionStorage["X-CSRF-Token"]` value; you should see
your CSRF token. Nice!

## Different CSRF tokens?

One final point is worth noting. Check the value of
`sessionStorage["X-CSRF-Token"]` in the tab where you originally logged in. The
`X-CSRF-Token`s in your two tabs will be different, yet each still works as an
authentication token. Not only are they different, they are interchangeable!

To see this, first log out in the second tab:

```js
> await csrfFetch('api/session', { method: 'DELETE' }).then(sessionStorage.removeItem("currentUser"))
```

Next refresh the browser tab so it will acknowledge the logout. Copy the token
value from the original tab and set `X-CSRF-Token` to that value in the second
tab:

```js
> sessionStorage.setItem("X-CSRF-Token", <pasted token value>)
```

Verify that `sessionStorage["X-CSRF-Token"]` has the new value, then log in. It
should work even though you used a CSRF token from a different tab. How can this
be?

In truth, the underlying CSRF token is not changing from tab to tab: it stays
the same for the entire browser session. (It's stored in the encrypted session
cookie!) Similarly to the way that BCrypt salts a password before encrypting it,
however, Rails adds a different "one-time pad" to the token each time before
processing, encrypting, and storing it in the header. This is essentially what
the `masked_authenticity_token` method does. (See Backend Part 3 if you don't
remember using that method.)

In other words, each of those different `X-CSRF-TOKEN` values that come from the
same browser session will ultimately resolve to the same CSRF token; any one of
them will accordingly validate a request. Why does Rails do this? To help
mitigate against another type of attack, namely, a [BREACH attack]. But that's a
topic for another time.

Now that you have a better grasp on all these sessions, let's get back to
coding!

[http://localhost:3000]: http://localhost:3000
[BREACH attack]: https://en.wikipedia.org/wiki/BREACH