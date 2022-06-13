// import { getMessaging, getToken } from "firebase/messaging";
// import { firebaseApp } from "src/boot/firebase.boot";
import { updatePushNotificationToken } from "src/services/user/user-config.service";

export const requestPermissionPushNotifications = async () => {
  try {
    // const messaging = getMessaging(firebaseApp);
    // const pushNotificationToken = await getToken(messaging);

    const status = await Notification.requestPermission();
    console.log(status);

    // await updatePushNotificationToken(pushNotificationToken);
  } catch (error) {
    console.error(error);
  }
};
