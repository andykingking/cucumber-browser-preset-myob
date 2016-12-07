import Base from '../../lib/flows/Base';

export default class ViewResource extends Base {

  go() {
    const listPage = this.pageRegistry.find('Resource List');
    return listPage.loadAndWaitUntilVisible().then(() => listPage.viewResource(1));
  }

}
