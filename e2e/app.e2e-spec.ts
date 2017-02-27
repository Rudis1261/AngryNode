import { AngryNodeV2Page } from './app.po';

describe('angry-node-v2 App', () => {
  let page: AngryNodeV2Page;

  beforeEach(() => {
    page = new AngryNodeV2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
