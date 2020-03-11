# egg-sendmail

[Nodemailer](https://nodemailer.com) Egg.js插件。

## 安装插件

```bash
npm i @axolo/egg-sendmail --save
```

## 开启插件

```js
// config/plugin.js
exports.sendmail = {
  enable: true,
  package: '@axolo/egg-sendmail',
};
```

## 详细配置

```js
// {app_root}/config/config.default.js
exports.sendmail = {
  client: {
    from: '"no-reply" <no-reply@localhost>',  // 发件人
    smtp: { // 邮件发送服务器配置
      host: 'smtp.local.host', // 主机
      port: 465, // 端口
      secure: true, // 是否启用SSL
      auth: { // 授权信息
        user: 'no-reply@local.host', // 用户名
        pass: 'password', // 密码
      },
    },
  },
};
```

请到 [config/config.default.js](config/config.default.js) 查看详细配置项说明。

## 例子

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

您于{{ invoiceDate }}申请的{{ invoiceLine }} {{ statusMsg }}，请及时查收。

点击 [此处]({{ invoiceFileUrl }}) 下载电子发票。

若无法下载，请复制以下地址到浏览器中打开：{{ invoiceFileUrl }}`,
    };
    const result = await sendmail.send({ to }, message, data);
    ctx.body = result;
  }
}

module.exports = MailController;
```

## 接口文档

[文档](https://axolo.github.io/egg-sendmail)

## 提问交流

请到 [egg issues](https://github.com/axolo/egg-sendmail/issues) 异步交流。

## License

[MIT](LICENSE)
