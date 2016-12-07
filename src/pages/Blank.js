import Base from './Base';

export default class Blank extends Base {

  load() {
    return this.browser.get('http:').catch(() => Promise.resolve('Blank page forcibly clears DOM'));
  }

  waitUntilVisible() {
    return this.wait.untilTitleContains('Problem loading page');
  }

}
