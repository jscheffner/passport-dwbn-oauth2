/* eslint prefer-arrow-callback: off, func-names: off */

const expect = require('chai').expect;
const DWBNStrategy = require('../');
const OAuth2Strategy = require('passport-oauth2');
const testUser = require('./test-user-data.json');

const options = {
  clientID: 'T3STID',
  clientSecret: 'psst'
};

const verify = () => {};

const strategy = new DWBNStrategy(options, verify);

describe('DWBN Strategy', function () {
  it('should be named dwbn', function () {
    expect(strategy.name).to.equal('dwbn');
  });

  it('should be a child of the OAuth Strategy', function () {
    expect(strategy instanceof OAuth2Strategy).to.equal(true);
  });

  // TODO: Test default options

  describe('#userProfile', function () {
    it('should load profile', function (done) {
      // eslint-disable-next-line no-underscore-dangle
      strategy._oauth2.get = function (url, token, callback) {
        const body = JSON.stringify(testUser);
        callback(null, body);
      };

      strategy.userProfile('token', function (err, profile) {
        if (err) {
          return done(err);
        }

        const expectedProfile = {
          provider: 'dwbn',
          id: '1234',
          displayName: 'Jon Doe',
          name: {
            familyName: 'Doe',
            givenName: 'Jon'
          },
          emails: [
            { value: 'admin@jon-doe.com' }
          ]
        };
        expect(profile).to.eql(expectedProfile);
        return done();
      });
    });
  });
});
