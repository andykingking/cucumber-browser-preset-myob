import Chrome from 'selenium-webdriver/chrome';
import Firefox from 'selenium-webdriver/firefox';
import config from '../config';

const seleniumDriver = process.env.SELENIUM_DRIVER || 'firefox';
const preferences = config.browserPreferences();

const firefoxProfile = new Firefox.Profile();
Object.keys(preferences).forEach((preferenceName) => {
  firefoxProfile.setPreference(preferenceName, preferences[preferenceName]);
});

// eslint-disable-next-line
export const driver = require('selenium-webdriver');
export const browser = new driver.Builder()
  .forBrowser(seleniumDriver)
  .setFirefoxOptions(new Firefox.Options().setProfile(firefoxProfile))
  .setChromeOptions(new Chrome.Options().setUserPreferences(preferences))
  .build();
