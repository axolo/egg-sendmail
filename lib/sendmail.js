'use strict';

const _ = require('lodash');

class Sendmail {
  /**
   * **构造器**
   *
   * @param {Object} config 插件配置
   */
  constructor(config) {
    this.config = _.omit(config, 'nodemailer');
    this.nodemailer = config.nodemailer || require('nodemailer');
  }

  /**
   * **发送邮件**
   *
   * @see https://nodemailer.com/message/
   * @param {Object} mail 参数
   * @param {Object} [template={}] 模板
   * @param {Any} [data] 数据
   * @return {Promise} 结果
   * @memberof Sendmail
   */
  send(mail, template = {}, data) {
    const { nodemailer, config } = this;
    const { smtp, from } = config;
    return new Promise((resolve, reject) => {
      if (!mail.to) {
        const error = new Error();
        error.name = 'EggSendmail';
        error.code = 400;
        error.message = 'mail receiver required';
        return reject(error);
      }
      const content = this.template(template, data);
      const mailData = { ...mail, ...content, from };
      const transporter = nodemailer.createTransport(smtp);
      transporter.sendMail(mailData, (err, res) => {
        if (err) return reject(err);
        return resolve(res);
      });
    });
  }

  /**
   * **处理模板**
   *
   * @param {Object} template 模板
   * @param {Any}[data={}] 数据
   * @return {Object} 内容
   * @memberof Sendmail
   */
  template(template, data) {
    const handlebars = require('handlebars');
    const marked = require('marked');
    const subject = handlebars.compile(template.subject)(data);
    const markdown = handlebars.compile(template.html)(data);
    const html = marked(markdown);
    return { ...template, subject, html };
  }
}

module.exports = Sendmail;
