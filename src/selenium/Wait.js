const by = require('selenium-webdriver/lib/by');
const webdriver = require('selenium-webdriver/lib/webdriver');

const Condition = webdriver.Condition;

export default class Wait {

  constructor(World) {
    this.browser = World.browser;
    this.until = World.driver.until;
  }

  untilTitleContains(text) {
    return this.browser.wait(this.until.titleContains(text));
  }

  untilVisible(locator) {
    return this.browser.wait(this.until.elementIsVisible(this.untilFound(locator)));
  }

  untilFound(locator) {
    return this.browser.wait(this.until.elementLocated(locator));
  }

  untilAnyFound(locator) {
    return this.browser.wait(this.until.elementsLocated(locator));
  }

  untilNotFound(locator, timeout = 30000) {
    const checkedLocator = by.checkedLocator(locator);
    const locatorDescription = typeof checkedLocator === 'function' ? 'by function()' : `${checkedLocator}`;
    return this.browser.wait(
      new Condition(
        `for element ${locatorDescription} to not be found`,
        driver => driver.findElements(checkedLocator).then(elements => elements.length === 0)
      ),
      timeout
    );
  }

  untilElementContains(element, text) {
    return this.browser.wait(this.until.elementTextContains(element, text));
  }

  untilNumberOfWindows(number, timeout = 30000) {
    return this.browser.wait(
      new Condition(
        `for ${number} window(s) to be available`,
        () => {
          return this.browser.getAllWindowHandles()
            .then((handles) => { return handles.length === number ? handles : null; });
        }
      ),
      timeout
    );
  }

}
