export default class StubNotFoundError extends Error {

  constructor(stubName) {
    super(`Stub ${stubName} not found`);
  }

}
