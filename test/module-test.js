/* eslint prefer-arrow-callback: off, func-names: off */

const expect = require('chai').expect;
const DWBNStrategy = require('../');

describe('passport-dwbn-oauth2', () => {
  it('should expose the strategy directly from the package', function () {
    expect(typeof DWBNStrategy).to.equal('function');
  });

  it('should expose the strategy at .Strategy', function () {
    expect(typeof DWBNStrategy.Strategy).to.equal('function');
  });
});
