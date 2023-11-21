# Setup Development

### Install the dependencies

```bash
npm install
```

### Setup locally-trusted certificates

**Locally-trusted certificates should not be used in production environment.**

1. Install [mkcert](https://github.com/FiloSottile/mkcert?ref=words.filippo.io#installation)

2. Run

   `mkcert -install`

3. Run

   `mkdir -p certs && mkcert -cert-file ./certs/localhost-key.pem -key-file ./certs/localhost.pem localhost`

### Start the app in development mode

Development mode provides features such as hot-code reloading and error reporting.

```bash
quasar dev
```

### Lint the files

```bash
npm run lint
```

### Format the files

```bash
npm run format
```

### Build the app for production

```bash
quasar build
```

### Example: Build the app for Android (.apk generation on Android Studio)

```bash
quasar build -m capacitor -T android --skip-pkg --ide
```

See [Build commands](https://quasar.dev/quasar-cli-vite/developing-capacitor-apps/build-commands).

### Customize the configuration

See [Configuring quasar.conf.js](https://quasar.dev/quasar-cli/quasar-conf-js).
