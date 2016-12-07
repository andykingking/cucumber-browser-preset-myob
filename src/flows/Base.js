export default class Base {

  constructor(World) {
    this.config = World.config;
    this.wait = World.wait;
    this.pageRegistry = World.pageRegistry;
  }

}
