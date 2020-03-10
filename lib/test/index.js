'use strict';

const Sendmail = require('../sendmail');

const config = {};
const sendmail = new Sendmail(config);
const { template } = sendmail;

const tmpl = {
  subject: '电子发票{{ statusMsg }}',
  html: `**{{ buyerName }}，您好：**

您于{{ invoiceDate }}申请的金额为 **{{ taxIncludedAmount }}** 元的{{ invoiceLine }} {{ statusMsg }}，请及时查收。

点击 [此处]({{ invoiceFileUrl }}) 下载电子发票。

若无法下载，请复制以下地址到浏览器中打开：{{ invoiceFileUrl }}`,
};

const data = {
  buyerName: '方跃明',
  statusMsg: '开票成功',
  invoiceDate: '2020-03-10 15:33:32',
  invoiceLine: '电子增值税普通发票',
  invoiceFileUrl: 'https://www.baidu.com',
  taxIncludedAmount: 218,
};

const result = template(tmpl, data);

console.log(result);
