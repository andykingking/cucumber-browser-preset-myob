cucumber-browser-preset-myob
=============================

[![Build Status](https://travis-ci.org/MYOB-Technology/cucumber-browser-preset-myob.svg)](https://travis-ci.org/MYOB-Technology/cucumber-browser-preset-myob)
[![npm version](https://img.shields.io/npm/v/cucumber-browser-preset-myob.svg)](https://www.npmjs.com/package/cucumber-browser-preset-myob)
[![Dependency Status](https://david-dm.org/MYOB-Technology/cucumber-browser-preset-myob.svg)](https://david-dm.org/MYOB-Technology/cucumber-browser-preset-myob)

A Node library intended to simplify browser based automation.

Motivation
----------

@ MYOB we develop a number of frontend's using a similar browser automation toolsets and patterns.

We found the process for replicating, upgrading & sustaining these tools was onerous as the numbers of frontend's fanned-out.

This library strives to simplify this effort.

This library integrates tightly with the following libraries:
* [Cucumber](https://github.com/cucumber/cucumber-js)
* [Selenium](https://www.npmjs.com/package/selenium-webdriver)
* Installs & uses [geckodriver](https://github.com/mozilla/geckodriver) to drive Firefox

The library encourages UI automation patterns & practices:
 * Use of [Page Objects](http://martinfowler.com/bliki/PageObject.html)
 * Use of _Flow Objects_, an extension to Page Objects, capturing common flows of activity through a UI
 * Stubbing backend integration using [http_stub](https://github.com/MYOB-Technology/http_stub), giving you full control over backend data and availability
 * Takes a browser screenshot on any failure, writing an image to disk
 * Reduces the browsers size when configured to simulate a mobile screen size

See the features directory for a usage example.
