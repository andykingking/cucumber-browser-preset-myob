import CucumberPresets from '../../lib/cucumber-browser-preset-myob';

export default class ViewResource extends CucumberPresets.Flow {

  go() {
    const listPage = this.pageRegistry.find('Resource List');
    return listPage.loadAndWaitUntilVisible().then(() => listPage.viewResource(1));
  }

}
