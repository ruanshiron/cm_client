import React from "react";
import { IonAvatar, IonNote, IonItem, IonLabel } from "@ionic/react";
import { Event } from "../../models";
import { useEventForm } from "../../hooks/useEventForm";
import { EventModal } from "../modals/EventModal";

interface EventItemProps {
  data: Event;
}

const EventItem: React.FC<EventItemProps> = ({ data }) => {
  const form = useEventForm(data);

  return (
    <>
      <IonItem
        onClick={() => form.setShowEventForm(true)}
        button
        detail={false}
      >
        <IonAvatar slot="start">
          <img
            alt=""
            src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y"
          />
        </IonAvatar>
        <IonLabel>
          <h2>
            {data.workshop}・<b>{data.typeCode}</b>
          </h2>
          <p>
            {data.productCode} / {data.sizeCode}
          </p>
        </IonLabel>
        <IonNote slot="end" color="success">
          <h4>{data.quantity}</h4>
        </IonNote>
      </IonItem>

      <EventModal form={form} />
    </>
  );
};

export default React.memo(EventItem);
