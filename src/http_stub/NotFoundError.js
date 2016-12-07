export default class NotFoundError extends Error {

  constructor(stubName) {
    super(`Stub ${stubName} not found`);
  }

}
