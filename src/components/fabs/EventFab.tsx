import React from "react";
import { IonFab, IonFabButton, IonIcon } from "@ionic/react";
import { add } from "ionicons/icons";
import { StageModal } from "../modals/StageModal";
import { useEventForm } from "../../hooks/useEventForm";

interface EventFabProps {}

const EventFab: React.FC<EventFabProps> = () => {
  const form = useEventForm();

  return (
    <>
      <IonFab vertical="bottom" horizontal="end" slot="fixed">
        <IonFabButton onClick={() => form.setShowEventForm(true)}>
          <IonIcon icon={add}></IonIcon>
        </IonFabButton>
      </IonFab>

      <StageModal form={form} />
    </>
);
};

export default EventFab;
