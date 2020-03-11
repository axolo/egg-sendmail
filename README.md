# egg-sendmail

[Nodemailer](https://nodemailer.com) plugin for Egg.js.

## Install

```bash
npm i @axolo/egg-sendmail --save
```

## Usage

```js
// {app_root}/config/plugin.js
exports.sendmail = {
  enable: true,
  package: 'egg-sendmail',
};
```

## Configuration

```js
// {app_root}/config/config.default.js
exports.sendmail = {
  client: {
    from: '"no-reply" <no-reply@localhost>',  // mail from
    smtp: { // smtp server
      host: 'smtp.local.host', // smtp host
      port: 465, // smtp port
      secure: true, // true for 465, false for other ports
      auth: {
        user: 'no-reply@local.host', // mail
        pass: 'password', // password
      },
    },
  },
};
```

see [config/config.default.js](config/config.default.js) for more detail.

## Example

```js
// /app/controller/mail.js
class MailController extends Controller {
  async index() {
    const { app, ctx } = this;
    const { sendmail } = app;
    const to = 'to@email.com';
    const data = {
      buyerName: '方跃明',
      statusMsg: '开票成功',
      invoiceDate: '2020-03-10 15:33:32',
      invoiceLine: '电子增值税普通发票',
      invoiceFileUrl: 'https://www.baidu.com',
    };
    const message = {
      subject: '电子发票{{ statusMsg }}',
      html: `**{{ buyerName }}，您好：**

您于{{ invoiceDate }}申请的{{ invoiceLine }}{{ statusMsg }}，请及时查收。

点击 [此处]({{ invoiceFileUrl }}) 下载电子发票。

若无法下载，请复制以下地址到浏览器中打开：{{ invoiceFileUrl }}`,
    };
    const result = await sendmail.send({ to }, message, data);
    ctx.body = result;
  }
}

module.exports = MailController;
```

## Documents

Please open documents [here](https://axolo.github.io/egg-sendmail).

## Questions & Suggestions

Please open an issue [here](https://github.com/axolo/egg-sendmail/issues).

## License

[MIT](LICENSE)
