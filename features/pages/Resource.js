import Base from '../../lib/pages/Base';

export default class Resource extends Base {

  elementLocators = {
    name: { id: 'name' }
  };

  waitUntilVisible() {
    return this.findVisibleElement('name');
  }

}
