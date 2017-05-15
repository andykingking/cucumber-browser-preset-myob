# cucumber-browser-preset-myob

[![Build Status](https://travis-ci.org/MYOB-Technology/cucumber-browser-preset-myob.svg)](https://travis-ci.org/MYOB-Technology/cucumber-browser-preset-myob)
[![npm version](https://img.shields.io/npm/v/cucumber-browser-preset-myob.svg)](https://www.npmjs.com/package/cucumber-browser-preset-myob)
[![Dependency Status](https://david-dm.org/MYOB-Technology/cucumber-browser-preset-myob.svg)](https://david-dm.org/MYOB-Technology/cucumber-browser-preset-myob)

A Node library intended to simplify browser based automation.

## Motivation

At MYOB we develop a number of frontend's using a similar browser automation toolsets and patterns.

We found the process for replicating, upgrading & sustaining these tools was onerous as the numbers of frontend's fanned-out.

This library strives to simplify this effort.

## Dependencies

This library integrates tightly with the following libraries:

* [Cucumber](https://github.com/cucumber/cucumber-js)
* [Selenium](https://www.npmjs.com/package/selenium-webdriver)
* [geckodriver](https://github.com/mozilla/geckodriver) to drive Firefox
* [chromedriver](https://sites.google.com/a/chromium.org/chromedriver) to drive Google Chrome

## Patterns & Practices

The library encourages UI automation patterns & practices:

* Use of [Page Objects](http://martinfowler.com/bliki/PageObject.html)
* Use of _Flow Objects_, an extension to Page Objects, capturing common flows of activity through a UI
* Stubbing backend integration using [http_stub](https://github.com/MYOB-Technology/http_stub), giving you full control over backend data and availability
* Takes a browser screenshot on any failure, writing an image to disk
* Reduces the browsers size when configured to simulate a mobile screen size

## Usage

The [projects features directory](https://github.com/MYOB-Technology/cucumber-browser-preset-myob/tree/master/features) is a usage example.
The project offers a number of integration points.

### Test Runner

A `cucumber_browser_runner` sh script is provided that runs cucumber using [babel](https://github.com/babel/babel/tree/master/packages/babel-register) and auto-loads essential `cucumber-browser-preset-myob` dependencies.

The driver can be selected using the `SELENIUM_DRIVER` environment variable. Currently supported drivers are:

* firefox (default)
* chrome

### Page Objects

A base [Page class](https://github.com/MYOB-Technology/cucumber-browser-preset-myob/blob/master/src/pages/Base.js) provides short-hand for interacting with elements on page.
To use a Page Object, extend the base class, register the class and then find and use the page when needed:

``` js
// pages/MyPage.js
import { Page } from 'cucumber-browser-preset-myob';

export default class MyPage extends Page {

  // Define location of elements referred to on page
  elementLocators = {
    someElement: { id: 'someElement' },
    submit: { xpath: '\\input[type="submit"]' }
  };

  // Implement load if your page can be accessed directly
  load() {
    return this.browser.get('http://my.page');
  }

  // Provide some way of determining the page is loaded (mandatory)
  waitUntilVisible() {
    return this.findVisibleElement('someElement');
  }

  // Interact with elements of page as needed
  submit() {
    return this.findVisibleElement('submit');
  }

}

// support/world.js
import CucumberPresets from 'cucumber-browser-preset-myob';
import MyPage from '../pages/MyPage';

module.exports = CucumberPresets.createWorld(
  (world) => {
    // Pages must be registered for use
    world.pageRegistry.register({ 'My Page', MyPage });
  }
);

// step_definitions/my-steps.js
import World from '../support/World';

module.exports = function() {
  this.World = World;

  this.When(/^I submit My Page$/, function () {
    // Pages can be found in the registry
    this.page = this.pageRegistry.find('My Page');
    return this.page.loadAndWaitUntilVisible().then(() => this.page.submit());
  });

}
```

A set of page related step definitions are loaded by the test runner and available by default - see [page-steps.js](https://github.com/MYOB-Technology/cucumber-browser-preset-myob/blob/master/src/stepDefinitions/page-steps.js).

### Flow Objects

A base [Flow class](https://github.com/MYOB-Technology/cucumber-browser-preset-myob/blob/master/src/flows/Base.js) aids navigation across pages.
To use a Flow Object, the steps are identical to Page Objects:

``` js
// flows/MyFlow.js
import { Flow } from 'cucumber-browser-preset-myob';

export default class MyFlow extends Flow {

  // Implements the steps of the flow (mandatory)
  go() {
    const myPage = this.pageRegistry.find('My Page');
    return myPage.loadAndWaitUntilVisible().then(() => myPage.submit());
  }

}

// support/world.js
import CucumberPresets from 'cucumber-browser-preset-myob';
import MyFlow from '../flows/MyFlow';

module.exports = CucumberPresets.createWorld(
  (world) => {
    // Pages must be registered for use
    world.flowRegistry.register({ 'My Flow', MyFlow });
  }
);

// step_definitions/my-steps.js
import World from '../support/World';

module.exports = function() {
  this.World = World;

  this.When(/^I have submitted data$/, function () {
    // Flows can be found in the registry
    return this.flowRegistry.find('My Flow').go();
  });

}
```

### http_stub Stubs

Through a stub registry you can register a stub as being available on a port and subsequently interact with the stub.

``` js
// support/world.js
import CucumberPresets from 'cucumber-browser-preset-myob';

module.exports = CucumberPresets.createWorld(
  (world) => {
    // Stubs running on a port are referenced by name
    world.stubRegistry.register({ 'My Stub', 5000 });
  }
);

// step_definitions/my-steps.js
import World from '../support/World';

module.exports = function() {
  this.World = World;

  this.When(/^I have submitted data$/, function () {
    // Flows can be found in the registry
    return this.stubRegistry.find('My Stub').activate('My Scenario');
  });

}
```

### World Generation

A cucumber World factory method is provided that provides the ability to use Page & Flow Objects as well as Stubs - see the examples above.
