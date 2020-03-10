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
exports.sendmail = {};
```

see [config/config.default.js](config/config.default.js) for more detail.

## Documents

Please open documents [here](https://axolo.github.io/egg-sendmail).

## Questions & Suggestions

Please open an issue [here](https://github.com/axolo/egg-sendmail/issues).

## License

[MIT](LICENSE)
