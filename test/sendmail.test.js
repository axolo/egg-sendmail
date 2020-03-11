'use strict';

const mock = require('egg-mock');

const content = () => {
  const nodemailer = require('nodemailer');
  const Sendmail = require('../lib/sendmail');
  const config = { nodemailer };
  const sendmail = new Sendmail(config);
  const { template } = sendmail;
  const data = {
    buyerName: '方跃明',
    statusMsg: '开票成功',
    invoiceDate: '2020-03-10 15:33:32',
    invoiceLine: '电子增值税普通发票',
    invoiceFileUrl: 'https://www.baidu.com',
    taxIncludedAmount: 218,
  };
  const tmpl = {
    subject: '电子发票{{ statusMsg }}',
    html: `**{{ buyerName }}，您好：**

您于{{ invoiceDate }}申请的金额为 **{{ taxIncludedAmount }}** 元的{{ invoiceLine }}{{ statusMsg }}，请及时查收。

点击 [此处]({{ invoiceFileUrl }}) 下载电子发票。

若无法下载，请复制以下地址到浏览器中打开：{{ invoiceFileUrl }}`,
  };
  const result = template(tmpl, data);
  return result;
};

console.log(content());

describe('test/sendmail.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/sendmail-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, sendmail')
      .expect(200);
  });
});
