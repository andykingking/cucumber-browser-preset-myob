import CucumberPresets from '../../lib/cucumber-browser-myob-presets';

export default class ViewResource extends CucumberPresets.Flow {

  go() {
    const listPage = this.pageRegistry.find('Resource List');
    return listPage.loadAndWaitUntilVisible().then(() => listPage.viewResource(1));
  }

}
