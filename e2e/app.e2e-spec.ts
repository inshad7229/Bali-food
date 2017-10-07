import { BalifoodAdminPage } from './app.po';

describe('balifood-admin App', () => {
  let page: BalifoodAdminPage;

  beforeEach(() => {
    page = new BalifoodAdminPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
