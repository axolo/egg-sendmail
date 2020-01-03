'use strict';

const _ = require('lodash');
const nodemailer = require('nodemailer');

class Sendmail {

  /**
   * **egg-sendmail**
   *
   *  发送邮件
   *
   * @param {Object} config 插件配置
   * @param {Object} app `Egg.js Application`
   */
  constructor(config, app) {
    this.config = config;
    this.app = app;
  }

  /**
   * **发送邮件**
   *
   * @see https://nodemailer.com/message/
   * @param {Object} mail 参数
   * @param {Object} [template=undefined] 模板
   * @param {Any} [data=undefined] 数据
   * @return {Promise} 结果
   * @memberof Sendmail
   */
  async send(mail, template = undefined, data = undefined) {
    return new Promise((resolve, reject) => {
      const config = this.config;
      if (!mail.to) reject(new Error({ error: 'mail receiver required' }));
      _.merge(mail, { from: config.from });
      if (template) _.merge(mail, this.template(template, data));
      // 配置并发送邮件
      const transporter = nodemailer.createTransport(config.smtp);
      transporter.sendMail(mail, (err, res) => {
        err && reject(err);
        resolve(res);
      });
    });
  }

  /**
   * **处理模板**
   *
   * @param {Object} template 模板
   * @param {Any}[data=undefined] 数据
   * @return {Object} 内容
   * @memberof Sendmail
   */
  template(template, data = undefined) {
    const result = {};
    // 1. 模板引擎：handlerbars、ejs、dot.js等
    switch (template.engine) {
      default: {
        _.merge(result, { subject: template.subject });
        _.merge(result, { content: template.content });
        break;
      }
      case 'handlebars': {
        const handlebars = require('handlebars');
        _.merge(result, { subject: handlebars.compile(template.subject)(data) });
        _.merge(result, { content: handlebars.compile(template.content)(data) });
        break;
      }
    }
    // 2. 编码格式：text、html、markdown
    switch (template.encode) {
      default:
      case 'text': {
        _.merge(result, { text: result.content });
        break;
      }
      case 'html': {
        _.merge(result, { html: result.content });
        break;
      }
      case 'markdown': {
        const marked = require('marked');
        _.merge(result, { html: marked(result.content) });
        break;
      }
    }
    return result;
  }

}

module.exports = Sendmail;
