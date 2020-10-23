import React from 'react';
import {useLocation} from 'react-router-dom';
import {withTranslation} from 'react-i18next';
import {NavDropdown} from 'react-bootstrap';

import {SUPPORTED_LANG, SUPPORTED_LANG_NAME} from '../../constants/lang';
import {I18nComponent, I18nProps} from '../base/I18nComponent';

type States = {}

/**
 * Language switch element.
 */
class LanguageSwitch extends I18nComponent<I18nProps, States> {
  /**
   * Change the language.
   *
   * @param {string} newLanguage language to use
   */
  changeLanguage(newLanguage?: string) {
    const newLang: string = newLanguage || new URLSearchParams(useLocation().search).get('lang') || 'dev';
    // noinspection JSIgnoredPromiseFromCall
    this.props.i18n.changeLanguage(newLang);
  }

  /**
   * Render the language switch.
   *
   * @return {JSX} language switch as a dropdown
   */
  render() {
    return (
      <NavDropdown title={this.getCurrentLanguage()} id="language-switch" className="pr-2">
        <NavDropdown.Header>{this.props.t('lang.in-use')}</NavDropdown.Header>
        <NavDropdown.Item disabled>{this.getCurrentLanguage()}</NavDropdown.Item>
        <NavDropdown.Divider/>
        {
          SUPPORTED_LANG.map((lang) => (
            <NavDropdown.Item key={lang} onClick={() => this.changeLanguage(lang)}>
              {SUPPORTED_LANG_NAME.get(lang)}
            </NavDropdown.Item>
          ))
        }
      </NavDropdown>
    );
  }

  /**
   * Get the current language.
   *
   * @param {boolean} getName if the return should be the name of the language
   * @return {string} current language in-use
   */
  private getCurrentLanguage(getName: boolean = true): string {
    const lang: string = this.props.i18n.language;

    return getName ? (SUPPORTED_LANG_NAME.get(lang) || lang) : lang;
  }
}

export default withTranslation()(LanguageSwitch);
