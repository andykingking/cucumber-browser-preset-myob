import path from 'path';
import mkdirp from 'mkdirp';
import toLower from 'lodash.tolower';
import sanitize from 'sanitize-filename';
import fs from 'mz/fs';

export default class Screenshot {

  constructor(browser) {
    this.directory = path.join('tmp', 'screenshot');
    this.browser = browser;
  }

  ensureDirectoryExists() {
    return new Promise((resolve, reject) => {
      mkdirp(this.directory, {}, (error, made) => { return error === null ? resolve(made) : reject(error); });
    });
  }

  create(filePrefix) {
    return this.browser.takeScreenshot().then((data) => {
      const fileName = sanitize(`${toLower(filePrefix)}.png`).replace(/ /g, '_');
      const filePath = path.join(this.directory, fileName);
      const base64Data = data.replace(/^data:image\/png;base64,/, '');
      // eslint-disable-next-line no-console
      return fs.writeFile(filePath, base64Data, 'base64').catch(err => console.warn(err));
    });
  }

}
