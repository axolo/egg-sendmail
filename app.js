'use strict';

const Sendmail = require('./lib/sendmail');

function createSendmail(config, app) {
  const sendmail = new Sendmail(config, app);
  return sendmail;
}

module.exports = app => {
  // for signle client config =>
  // app.sendmail = new Sendmail(app.config.sendmail)
  // for multi clients config =>
  app.addSingleton('sendmail', createSendmail);
};
