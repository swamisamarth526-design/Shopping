const Mailchimp = require('mailchimp-api-v3');

const keys = require('../config/keys');

const { key, listKey } = keys.mailchimp;

class MailchimpService {
  init() {
    if (!key || !listKey) {
      console.warn('Missing Mailchimp configuration. Newsletter subscription is disabled.');
      return null;
    }

    return new Mailchimp(key);
  }
}

const mailchimp = new MailchimpService().init();

exports.subscribeToNewsletter = async email => {
  try {
    if (!mailchimp) {
      throw new Error('Mailchimp is not configured. Set MAILCHIMP_KEY and MAILCHIMP_LIST_KEY.');
    }

    return await mailchimp.post(`lists/${listKey}/members`, {
      email_address: email,
      status: 'subscribed'
    });
  } catch (error) {
    return error;
  }
};
