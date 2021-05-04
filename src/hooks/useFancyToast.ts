import { useIonToast } from "@ionic/react";
import { useEffect } from "react";
import { useSelector } from "../store";

export const useFancyToast = () => {
  const [present, dismiss] = useIonToast();

  const toast = useSelector((state) => state.toasts[0]);

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
