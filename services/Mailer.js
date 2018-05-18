const sendgrid = require("sendgrid");
const helper = sendgrid.mail;
const keys = require("../config/keys");

class Mailer extends help.Mailer {
  constructor({ subject, recipients }, content) {
    super();

    this.from_email = new helper.Email("no-reply@surveys.com");
    this.subject = subject;
    this.body = new helper.Content("text/html", content);
    this.recipients = this.formatAdresses(recipients);
  }
}

module.exports = Mailer;
