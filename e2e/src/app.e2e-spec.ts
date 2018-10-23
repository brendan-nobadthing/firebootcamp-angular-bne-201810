import { AppPage } from './app.po';
import { HomePage } from './home.po';
import { element, by } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getH1Text()).toEqual('Welcome, Brisbane, to firebootcamp-crm!');
  });

  it('click navigation', () => {
    page.navigateTo();
    page.clickTitle();
    expect(element(by.css('fbc-root p')).getText()).toEqual('home works!');
  });

  it('Home Page', () => {
    let homePage = new HomePage();
    homePage.navigateTo();
    expect(homePage.getParaText()).toEqual('home works!');
  });
});
