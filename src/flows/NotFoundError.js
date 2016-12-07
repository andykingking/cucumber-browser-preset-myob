export default class NotFoundError extends Error {

  constructor(flowName) {
    super(`Flow ${flowName} not recognised`);
  }

}
