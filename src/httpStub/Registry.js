import Stub from './Stub';
import NoOp from './NoOp';
import StubNotFoundError from './StubNotFoundError';

export default class Registry {

  constructor(config) {
    this.config = config;
    this.stubsByName = {};
  }

  register(nameAndPorts) {
    Object.keys(nameAndPorts).forEach((name) => {
      const port = nameAndPorts[name];
      this.stubsByName[name] = this.config.isStubbed ? new Stub(this.config.stubHost, port) : NoOp;
    });
  }

  find(name) {
    const stub = this.stubsByName[name];
    if (stub == null) throw new StubNotFoundError(name);
    return stub;
  }

  all() {
    return Object.keys(this.stubsByName).map(name => this.stubsByName[name]);
  }

}
