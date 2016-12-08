const fs = require('fs');
const path = require('path');

export default class Presets {

  static preferences() {
    const filePath = path.join(process.cwd(), 'features', '.presetsrc');
    try {
      const presets = JSON.parse(fs.readFileSync(filePath));
      return presets.preferences;
    } catch (err) {
      return {};
    }
  }

}
