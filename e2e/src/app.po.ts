import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getH1Text() {
    return element(by.css('fbc-root h1')).getText();
  }

  clickTitle() {
    return element(by.css('fbc-root a')).click();
  }
}
