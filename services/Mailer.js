const sendgrid = require("sendgrid");
const helper = sendgrid.mail;
const keys = require("../config/keys");

class Mailer extends help.Mailer {
  constructor({ subject, recipients }, content) {
    super();

    this.sgApi = sendgrid(keys.SEND_GRID_KEY);
    this.from_email = new helper.Email("no-reply@surveys.com");
    this.subject = subject;
    this.body = new helper.Content("text/html", content);
    this.recipients = this.formatAddresses(recipients);

    this.addContent(this.body);
    this.addClickTracking();
    this.addRecipients();
  }

  formatAddresses(recipients) {
    return recipients.map(({ email }) => {
      return new helper.Email(email);
    });
  }

  addClickTracking() {
    const trackingSettings = new helper.TrackingSettings();
    const clickTracking = new helper.ClickTracking(true, true);

    trackingSettings.setClickTracking(clickTracking);
  }

  addRecipients() {
    const personalize = new helper.Personalization();
    this.recipients.forEach(recipient => {
      persinalize.addTo(recipient);
      this.addPersonalization(personalize);
    });
  }

  async send() {
    const request = this.sgApi.emptyRequest({
      method: "POST",
      path: "v3/mail/send",
      body: this.toJSON()
    });
    let response = this.sgApi.send(request);
    return response;
  }
}

module.exports = Mailer;
