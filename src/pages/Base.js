import promise from 'selenium-webdriver/lib/promise';

export default class Base {

  constructor(World) {
    this.config = World.config;
    this.browser = World.browser;
    this.driver = World.driver;
    this.until = this.driver.until;
    this.wait = World.wait;
    this.screenshot = World.screenshot;
  }

  // eslint-disable-next-line class-methods-use-this
  load() {
    return Promise.resolve('Pages are not loaded directly by default');
  }

  loadAndWaitUntilVisible() {
    return this.load().then(() => this.waitUntilVisible());
  }

  findElement(locatorName) {
    return this.wait.untilFound(this.elementLocators[locatorName]);
  }

  findVisibleElement(locatorName) {
    return this.wait.untilVisible(this.elementLocators[locatorName]);
  }

  findVisibleElements(locatorName) {
    return this.wait.untilAnyFound(this.elementLocators[locatorName])
      .then(elements => promise.filter(elements, element => element.isDisplayed()));
  }

  waitUntilNotFound(locatorName) {
    return this.wait.untilNotFound(this.elementLocators[locatorName]);
  }

  textIn(locatorName) {
    return this.findVisibleElement(locatorName).getText();
  }

  waitUntilElementContains(locatorName, text) {
    return this.wait.untilElementContains(this.findVisibleElement(locatorName), text);
  }

  disableClick(locatorName) {
    return this.browser.executeScript(
      'arguments[0].onclick=function() { return false; };', this.findElement(locatorName)
    );
  }

}
