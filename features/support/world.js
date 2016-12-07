import WorldFactory from '../../lib/WorldFactory';
import ResourceList from '../pages/ResourceList';
import Resource from '../pages/Resource';
import ViewResource from '../flows/ViewResource';

const path = require('path');

module.exports = WorldFactory.create(
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
  },
  path.resolve(__dirname, '../config.json')
);
