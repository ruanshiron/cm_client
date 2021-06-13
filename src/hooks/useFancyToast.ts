import { useIonToast } from "@ionic/react";
import { useEffect } from "react";
import { useSelector } from "../store";
import { Plugins, PushNotification } from "@capacitor/core";
const { PushNotifications } = Plugins;

export const useFancyToast = () => {
  const [present, dismiss] = useIonToast();

  const toast = useSelector((state) => state.toasts[0]);

  useEffect(() => {
    PushNotifications.addListener(
      "pushNotificationReceived",
      (notification: PushNotification) => {
        present({
          buttons: [{ text: "đóng", handler: () => dismiss() }],
          message: notification.body,
          duration: 3000,
        });
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (toast)
      present({
        buttons: [{ text: "đóng", handler: () => dismiss() }],
        message: toast.messages,
        color: toast.color,
        duration: 3000,
      });
  }, [dismiss, present, toast]);
};
