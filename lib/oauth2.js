'use strict';

const OAuth2Strategy = require('passport-oauth2');

const InternalOAuthError = OAuth2Strategy.InternalOAuthError;

class Strategy extends OAuth2Strategy {
  constructor(options, verify) {
    const completedOptions = options;
    completedOptions.authorizationURL = options.authorizationURL || 'https://sso.dwbn.org/oauth2/authorize/';
    completedOptions.tokenURL = options.tokenURL || 'https://sso.dwbn.org/oauth2/token';

    super(options, verify);
    this.name = 'dwbn';
    this.userinfoURL = options.userinfoURL || 'https://sso.dwbn.org/api/v1/users/me/';
  }

  userProfile(token, callback) {
    // eslint-disable-next-line no-underscore-dangle
    this._oauth2.get(this.userinfoURL, token, (err, body) => {
      if (err) {
        return callback(new InternalOAuthError('failed to fetch user profile', err));
      }

      try {
        const data = JSON.parse(body);
        const profile = { provider: 'dwbn' };
        profile.id = data.id;
        profile.displayName = `${data.given_name} ${data.family_name}`;
        profile.name = {
          familyName: data.family_name,
          givenName: data.given_name
        };
        profile.emails = [{ value: data.email }];
        return callback(null, profile);
      } catch (e) {
        return callback(e);
      }
    });
  }
}

module.exports = Strategy;
module.exports.Strategy = Strategy;
