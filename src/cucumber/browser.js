import Presets from '../config/Presets';

// eslint-disable-next-line global-require
export const driver = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');

const firefoxProfile = new firefox.Profile();
const preferences = Presets.preferences();
Object.keys(preferences).forEach((preferenceName) => {
  firefoxProfile.setPreference(preferenceName, preferences[preferenceName]);
});
const firefoxOptions = new firefox.Options().setProfile(firefoxProfile);
export const browser = new driver.Builder().forBrowser('firefox').setFirefoxOptions(firefoxOptions).build();
