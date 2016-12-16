import axios from 'axios';
import Error from './Error';
import ScenarioNotFoundError from './ScenarioNotFoundError';

export default class Stub {

  constructor(host, port) {
    this.baseUri = `http://${host}:${port}`;
  }

  activate(scenarioName) {
    return axios.post(
      `${this.baseUri}/http_stub/scenarios/activate`,
      `name=${encodeURIComponent(scenarioName)}`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    ).then((response) => {
      if (response.status !== 200) {
        throw new ScenarioNotFoundError(scenarioName);
      }
      return response;
    });
  }

  reset() {
    return axios.post(`${this.baseUri}/http_stub/stubs/reset`).then((response) => {
      if (response.status !== 200) {
        throw new Error(`Unable to reset stub memory.  Response: ${response.status} ${response.body}`);
      }
      return response;
    });
  }

}
