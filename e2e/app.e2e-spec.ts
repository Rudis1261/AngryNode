import { ClientAngularIoPage } from './app.po';

describe('client-angular-io App', () => {
  let page: ClientAngularIoPage;

  beforeEach(() => {
    page = new ClientAngularIoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
