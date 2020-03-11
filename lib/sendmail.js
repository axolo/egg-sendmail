'use strict';

const nodemailer = require('nodemailer');
const handlebars = require('handlebars');
const marked = require('marked');
class Sendmail {
  /**
   * **构造器**
   *
   * `config.nodemailer`：从外部指定`nodemailer`，若未指定则使用内置`nodemailer`。
   *
   * @param {Object} [config={}] 插件配置
   */
  constructor(config = {}) {
    this.config = config;
    this.nodemailer = config.nodemailer || nodemailer;
  }

  /**
   * **发送邮件**
   *
   * @see https://nodemailer.com/message/
   * @param {Object} mail 参数，`nodemailer`的`message`，支持其所有参数。
   *  但不会被编译和转换，一般用于设置接收人。
   * @param {Object} [template={}] [模板]{@link Sendmail#template}
   * @param {Any} [data] 数据
   * @return {Promise} 结果
   * @memberof Sendmail
   */
  send(mail, template = {}, data) {
    const { nodemailer, config } = this;
    const { smtp, from } = config;
    return new Promise((resolve, reject) => {
      if (!mail || !mail.to) {
        const error = new Error();
        error.name = 'EggSendmailError';
        error.code = 400;
        error.message = 'mail receiver required';
        return reject(error);
      }
      const content = this.template(template, data);
      const message = { ...mail, ...content, from };
      const transporter = nodemailer.createTransport(smtp);
      transporter.sendMail(message, (err, res) => {
        if (err) return reject(err);
        return resolve(res);
      });
    });
  }

  /**
   * **处理模板**
   *
   * @see https://nodemailer.com/message/
   * @param {Object} message 消息，`nodemailer`的`message`，支持其所有参数。
   *
   * 其中：
   *
   * - `subject`：支持`Handlebars`模板引擎，数据来源于`data`
   * - `html`：支持`Handlerbars`模板引擎，数据来源于`data`，支持`Markdown`格式编码
   *
   * @param {Any} data 数据
   * @return {Object} 内容
   * @memberof Sendmail
   */
  template(message, data) {
    const subject = handlebars.compile(message.subject)(data);
    const markdown = handlebars.compile(message.html)(data);
    const html = marked(markdown);
    return { ...message, subject, html };
  }
}

module.exports = Sendmail;
