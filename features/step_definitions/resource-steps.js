import { expect } from 'chai';

module.exports = function () {

  this.Given(/^there are resources$/, () => {
    return this.stubRegistry.find('Stub').activate('Get: Many Resources');
  });

  this.Given(/^there are no resources$/, () => {
    return this.stubRegistry.find('Stub').activate('Get: No Resources');
  });

  this.When(/^I view a resource$/, () => {
    return this.flowRegistry.find('View Resource').go();
  });

  this.Then(/^I see resources$/, () => {
    return this.page.numberOfResources().then(number => expect(number).to.be.above(0));
  });

  this.Then(/^I see no resources$/, () => {
    return this.page.waitUntilThereAreNoResources();
  });

};
