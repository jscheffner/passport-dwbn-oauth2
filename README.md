[![Build Status](https://travis-ci.org/jscheffner/passport-dwbn-oauth2.svg?branch=master)](https://travis-ci.org/jscheffner/passport-dwbn-oauth2) [![Coverage Status](https://coveralls.io/repos/github/jscheffner/passport-dwbn-oauth2/badge.svg?branch=master)](https://coveralls.io/github/jscheffner/passport-dwbn-oauth2?branch=master)

# passport-dwbn-oauth2

[Passport](http://passportjs.org/) authentication strategy for [DWBN](http://dwbn.org/)

## Usage

First, you need to install this module:

````
npm install --save passport-dwbn-oauth2
````

Now, you can import it and create an instance of the strategy:

````
const Strategy = require('passport-dwbn-oauth2');
const strategy = new Strategy(OPTIONS);
````

Just replace `OPTIONS` with an object that suits your needs. ([Available Options](#options))
Then, tell Passport to use the strategy:

````
passport.use(strategy, VERIFY);
````

Here, you have to replace `VERIFY` with a verify callback. Now, you can authenticate with this strategy. Just call `passport.authenticate('dwbn')`.

If you need more information, check out Passport's [documentation](http://passportjs.org/docs).

## API

### `constructor(options)`
- `options {object}` - authorizationURL, tokenURL, userinfoURL, clientID, clientSecret, callbackURL

### Options

#### `authorizationURL`
default: https://sso.dwbn.org/oauth2/authorize/

#### `tokenURL`
default: https://sso.dwbn.org/oauth2/token/

#### `userinfoURL`
default: https://sso.dwbn.org/api/v1/users/me/

#### `clientID`, `clientSecret`, `callbackSecret`
Ask your admin.

## ISC Licence ##

Copyright (c) 2016-2017, Jonas Scheffner

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
