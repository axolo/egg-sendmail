'use strict';

const Sendmail = require('./lib/sendmail');

function createSendmail(config) {
  const sendmail = new Sendmail(config);
  return sendmail;
}

module.exports = app => {
  app.addSingleton('sendmail', createSendmail);
};
