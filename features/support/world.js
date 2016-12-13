import CucumberPresets from '../../lib/cucumber-browser-preset-myob';
import ResourceList from '../pages/ResourceList';
import Resource from '../pages/Resource';
import ViewResource from '../flows/ViewResource';

module.exports = CucumberPresets.createWorld(
  (world) => {
    world.pageRegistry.register({
      'Resource List': ResourceList,
      Resource
    });
    world.flowRegistry.register({
      'View Resource': ViewResource
    });
    world.stubRegistry.register({
      Stub: 5000
    });
  }
);
