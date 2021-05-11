import {TFunction} from '../../i18n/types';
import {AlertData} from './data';

/**
 * Class that contains the methods to make global alert payload.
 */
export class AlertPayloadMaker {
  /**
   * Payload to show the alert that the page is accessible for admins only.
   *
   * @param {TFunction} t t-function of react-i18next
   * @return {AlertData} alert payload
   */
  static adminOnly(t: TFunction): AlertData {
    return {
      show: true,
      message: t('message.warning.admin_only'),
      variant: 'danger',
    };
  }

  /**
   * Payload to show the alert that the post has been published.
   *
   * @param {TFunction} t t-function of react-i18next
   * @return {AlertData} alert payload
   */
  static postPublished(t: TFunction): AlertData {
    return {
      show: true,
      message: t('posts.message.published'),
      variant: 'success',
    };
  }
}
