import Blank from './Blank';
import NotFoundError from './NotFoundError';

const merge = require('lodash.merge');

export default class Registry {

  constructor(World) {
    this.World = World;
    this.pageClassesByName = { Blank };
  }

  register(pages) {
    this.pageClassesByName = merge(this.pageClassesByName, pages);
  }

  find(name) {
    const PageClass = this.pageClassesByName[name];
    if (PageClass == null) throw new NotFoundError(name);
    return new PageClass(this.World);
  }

}
