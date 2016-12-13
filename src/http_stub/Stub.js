import rp from 'request-promise-native';

const propagateError = (err) => { throw err; };

export default class RealStub {

  constructor(host, port) {
    this.baseUri = `http://${host}:${port}`;
  }

  activate(scenarioName) {
    return rp({
      method: 'POST',
      uri: `${this.baseUri}/http_stub/scenarios/activate`,
      form: { name: scenarioName }
    }).catch(propagateError);
  }

  reset() {
    return rp({
      method: 'POST',
      uri: `${this.baseUri}/http_stub/stubs/reset`
    }).catch(propagateError);
  }

}
