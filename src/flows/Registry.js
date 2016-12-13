import merge from 'lodash.merge';
import NotFoundError from './NotFoundError';

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
