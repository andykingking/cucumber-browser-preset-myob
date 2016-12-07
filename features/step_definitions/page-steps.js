import World from '../support/world';

module.exports = function () {
  this.World = World;

  this.When(/^I navigate to the (.+) page$/, (pageName) => {
    this.page = this.pageRegistry.find(pageName);
    return this.page.loadAndWaitUntilVisible();
  });

  this.Then(/^I am on the (.+) page$/, (pageName) => {
    this.page = this.pageRegistry.find(pageName);
    return this.page.waitUntilVisible();
  });

};
