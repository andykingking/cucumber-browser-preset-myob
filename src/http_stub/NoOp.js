export default class NoOp {

  static activate() {
    return Promise.resolve('NoOp');
  }

  static reset() {
    return Promise.resolve('NoOp');
  }

}
