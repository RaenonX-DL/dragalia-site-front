import {SupportedLanguages} from '../../src/api-def/api/other/lang';
import {DEFAULT_LANG} from '../../src/i18n/langCode';
import {CookiesKeys} from '../../src/utils/cookies/keys';


describe('Page redirection behavior', () => {
  // 301 = Moved permanently for GET and HEAD
  // 308 is *not* for GET
  //  - https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/301
  // Cypress GHA: https://github.com/cypress-io/github-action

  it('redirects to language root', () => {
    cy.visit('/')
      .location('pathname')
      .then((path) => expect(path).to.equal(`/${DEFAULT_LANG}`));
  });

  it('bypasses file requests', () => {
    cy.visit('/_next/main.css', {failOnStatusCode: false})
      .location('pathname')
      .then((path) => {
        expect(path)
          .to.equal('/_next/main.css')
          .and.not.equal(`/${DEFAULT_LANG}/_next/main.css`);
      });
  });

  it('bypasses api request w/ trailing slash', () => {
    cy.request('/api/auth/session/')
      .then((response) => {
        // Optional chaining doesn't work: https://github.com/cypress-io/cypress/issues/16914
        expect(response.redirects).not.to.undefined;
        if (response.redirects) {
          expect(response.redirects.length).to.equal(1);
          expect(response.redirects[0].endsWith('/api/auth/session')).to.true;
        }
      });
  });

  it('bypasses api requests w/o trailing slash', () => {
    cy.request('/api/auth/session')
      .then((response) => expect(response.redirects).to.undefined);
  });

  it('redirects non-existed page to i18n specific page', () => {
    cy.visit('/something', {failOnStatusCode: false})
      .location('pathname')
      .then((path) => expect(path).to.equal(`/${DEFAULT_LANG}/something`));
  });

  it('redirects existed page to i18n specific page w/ trailing slash', () => {
    cy.visit('/quest')
      .location('pathname')
      .then((path) => expect(path).to.equal(`/${DEFAULT_LANG}/quest`));
  });

  it('redirects existed page to i18n specific page w/o trailing slash', () => {
    cy.visit('/quest/')
      .location('pathname')
      .then((path) => expect(path).to.equal(`/${DEFAULT_LANG}/quest`));
  });

  it('redirects post page to i18n specific page w/ trailing slash', () => {
    cy.visit('/analysis/27')
      .location('pathname')
      .then((path) => expect(path).to.equal(`/${DEFAULT_LANG}/analysis/27`));
  });

  it('redirects post page to i18n specific page w/o trailing slash', () => {
    cy.visit('/analysis/27/')
      .location('pathname')
      .then((path) => expect(path).to.equal(`/${DEFAULT_LANG}/analysis/27`));
  });

  it('redirects according to language in cookies', () => {
    cy.visit('/analysis/27', {headers: {cookie: `${CookiesKeys.LANG}=${SupportedLanguages.EN}`}})
      .location('pathname')
      .then((path) => expect(path).to.equal(`/${SupportedLanguages.EN}/analysis/27`));
  });
});
