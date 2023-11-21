# Pilli-o (pillio)

Pilli-o is a platform where care takers and care recipients can track drug treatments. It is a multi platform progressive web application (PWA) which can be accessed from the browser or by installing it as an application in the computer or smartphone.

<p align="center">Editing the alarm for a drug treatment in a smartphone</p>
<div
  style="
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    gap: 10px;
  "
>
  <img
    style="max-height: 600px;"
    alt="Lateral menu with options for alarms management and settings"
    src="https://user-images.githubusercontent.com/56984939/175789879-7a5b88ee-ef67-45d5-9a8e-725dedd27fea.png"
  >
  <img
    style="max-height: 600px;"
    alt="Home page"
    src="https://user-images.githubusercontent.com/56984939/175789890-57a6b942-bfe5-49fc-9fce-2063fb71211b.png"
  >
  <img
    style="max-height: 600px;"
    alt="Alarm edit page with fields such as drug name, when the treatment starts, doses and dispenser settings"
    src="https://user-images.githubusercontent.com/56984939/175789908-1a444535-4eae-4da8-bb2e-7659db9ba412.png"
  >
</div>

<p align="center">The dispenser has 15 usable slots to place medications. It also has a lid with a mechanism that registers when a care recipient removes the medication from the device.</p>
<div
  style="
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
  "
>
  <img
    style="max-height: 550px;"
    alt="Lateral menu with options for alarms management and settings"
    alt="Dispenser prototype with circular shape"
    src="https://user-images.githubusercontent.com/56984939/175790549-d4c8776e-41c4-46e5-bc72-2e3f99bc8b58.png"
  >
</div>

The back end and the pill dispenser were built by three other people that worked with me in this project: [Adryan](https://github.com/AdryanR), [Paloma](https://github.com/Paloma-Marian) and [Ricardo](https://github.com/ricardo-14).

Some of the technologies used to build this project:

- JavaScript
- Vue
- Pinia store
- Quasar
- Capacitor
- Firebase auth
- Service workers for push notifications
- MQTT for real-time communication with the pill dispenser
- The pill dispenser was built with an Arduino ESP32 with wifi and bluetooth support

Some of the features of this project:

- Register and track drug treatments by time and number of doses
- Care takers can track treatments for multiple care recipients
- Care recipients can have multiple on-going treatments at the same time
- Care recipients can access the system to track their own treatments
- Integration with device resources, such as camera and wifi

See the following links for more information.

### [In-depth Project Presentation](/docs/project-presentation.md)

### [Setup Development](/docs/setup-development.md)
