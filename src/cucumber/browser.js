import { Profile, Options } from 'selenium-webdriver/firefox';
import config from '../config';

const firefoxProfile = new Profile();
const preferences = config.browserPreferences();
Object.keys(preferences).forEach((preferenceName) => {
  firefoxProfile.setPreference(preferenceName, preferences[preferenceName]);
});
const firefoxOptions = new Options().setProfile(firefoxProfile);

// eslint-disable-next-line
export const driver = require('selenium-webdriver');
export const browser = new driver.Builder().forBrowser('firefox').setFirefoxOptions(firefoxOptions).build();
