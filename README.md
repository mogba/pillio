# Pilli-o (pillio)

A platform where the caregiver of the elderly and its elderly people can record and track alarms for drug treatments.

<p align="center">
  <img
    width="30%"
    alt="sistema-menu"
    src="https://user-images.githubusercontent.com/56984939/175789879-7a5b88ee-ef67-45d5-9a8e-725dedd27fea.png"
  >
  <img
    width="30%"
    alt="sistema-home"
    src="https://user-images.githubusercontent.com/56984939/175789890-57a6b942-bfe5-49fc-9fce-2063fb71211b.png"
  >
  <img
    width="30%"
    alt="app-edit-alarm"
    src="https://user-images.githubusercontent.com/56984939/175789908-1a444535-4eae-4da8-bb2e-7659db9ba412.png"
  >
</p>

This application works together with an automated pills dispenser, built with embedded systems.

The dispenser has 15 usable slots to place medications. It also has a lid with a mechanism that registers when an elderly person removes the medication from the device.

<p align="center">
  <img
    width="45%"
    alt="Dispenser prototype with circular shape"
    src="https://user-images.githubusercontent.com/56984939/175790549-d4c8776e-41c4-46e5-bc72-2e3f99bc8b58.png"
  >
</p>

This front-end application is part of a project where I worked with three other people: [Adryan](https://github.com/AdryanR), Paloma and [Ricardo](https://github.com/ricardo-14).

## Install the dependencies

```bash
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)

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
