import {DEFAULT_LANG} from '../../src/i18n/langCode';


describe('Ads showing behavior', () => {
  const sessionPath = '/api/auth/session';

  it('shows ads if the user is not logged in', () => {
    cy.fixture('session/empty.json').then((session) => {
      cy.intercept('GET', sessionPath, {body: session}).as('session');

      cy.visit(`/${DEFAULT_LANG}/quest`).then(() => {
        cy.wait('@session').then(() => {
          cy.get('iframe')
            .then((element) => expect(element).to.not.undefined);
        });
      });
    });
  });

  it('shows ads if the user should have ads shown', () => {
    cy.fixture('session/userShowAds.json').then((session) => {
      cy.intercept('GET', sessionPath, {body: session}).as('session');

      cy.visit(`/${DEFAULT_LANG}/quest`).then(() => {
        cy.wait('@session').then(() => {
          cy.get('iframe')
            .then((element) => expect(element).to.not.undefined);
        });
      });
    });
  });

  it('does not show ads', () => {
    cy.fixture('session/userNoAds.json').then((session) => {
      cy.intercept('GET', sessionPath, {body: session}).as('session');

      cy.visit(`/${DEFAULT_LANG}/quest`).then(() => {
        cy.wait('@session').then(() => {
          cy.get('ins.adsbygoogle').should('not.exist');
        });
      });
    });
  });
});
