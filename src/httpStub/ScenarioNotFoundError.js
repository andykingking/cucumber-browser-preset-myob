import Error from './Error';

export default class ScenarioNotFoundError extends Error {

  constructor(scenarioName) {
    super(`Unable to find scenario '${scenarioName}'`);
  }

}
