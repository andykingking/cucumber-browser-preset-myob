import { expect } from 'chai';
import World from '../support/world';

module.exports = function () {
  this.World = World;

  this.Given(/^there are resources$/, function () {
    return this.stubRegistry.find('Stub').activate('Get: Many Resources');
  });

  this.Given(/^there are no resources$/, function () {
    return this.stubRegistry.find('Stub').activate('Get: No Resources');
  });

  this.When(/^I view a resource$/, function () {
    return this.flowRegistry.find('View Resource').go();
  });

  this.Then(/^I see resources$/, function () {
    return this.page.numberOfResources().then(number => expect(number).to.be.above(0));
  });

  this.Then(/^I see no resources$/, function () {
    return this.page.waitUntilThereAreNoResources();
  });

};
