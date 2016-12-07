import NotFoundError from './NotFoundError';

const merge = require('lodash.merge');

export default class Registry {

  constructor(World) {
    this.World = World;
    this.flowClassesByName = {};
  }

  register(flows) {
    this.flowClassesByName = merge(this.flowClassesByName, flows);
  }

  find(name) {
    const FlowClass = this.flowClassesByName[name];
    if (FlowClass == null) throw new NotFoundError(name);
    return new FlowClass(this.World);
  }

}
