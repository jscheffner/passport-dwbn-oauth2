/* eslint prefer-arrow-callback: off, func-names: off */

const expect = require('chai').expect;
const DWBNStrategy = require('../');
const OAuth2Strategy = require('passport-oauth2');
const testUser = require('./test-user-data.json');
const sinon = require('sinon');

const options = {
  clientID: 'T3STID',
  clientSecret: 'psst'
};

const strategy = new DWBNStrategy(options, () => {});

describe('DWBN Strategy', function () {
  it('should be named dwbn', function () {
    expect(strategy.name).to.equal('dwbn');
  });

  it('should be a child of the OAuth Strategy', function () {
    expect(strategy instanceof OAuth2Strategy).to.equal(true);
  });

  describe('#userProfile', function () {
    const sandbox = sinon.sandbox.create();

    afterEach(function () {
      sandbox.restore();
    });

    it('should load profile', function (done) {
      const body = JSON.stringify(testUser);
      // eslint-disable-next-line no-underscore-dangle
      sandbox.stub(strategy._oauth2, 'get').callsArgWith(2, null, body);

      strategy.userProfile('token', function (err, profile) {
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
        expect(err).to.equal(null);
        return done();
      });
    });

    it('should provide InternalOAuthError if sso request fails', function (done) {
      // eslint-disable-next-line no-underscore-dangle
      sandbox.stub(strategy._oauth2, 'get').callsArgWith(2, new Error('test error'));
      strategy.userProfile('token', (err, data) => {
        expect(err instanceof OAuth2Strategy.InternalOAuthError).to.equal(true);
        expect(data).to.equal(undefined);
        done();
      });
    });

    it('should provide error if parsing data throws one', function (done) {
      // eslint-disable-next-line no-underscore-dangle
      sandbox.stub(strategy._oauth2, 'get').callsArgWith(2, null, '<nojson>');
      strategy.userProfile('token', (err, data) => {
        expect(err.message).to.include('Unexpected token');
        expect(data).to.equal(undefined);
        done();
      });
    });
  });
});
