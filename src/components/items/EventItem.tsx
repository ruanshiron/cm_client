import React from "react";
import { IonNote, IonItem, IonLabel, IonSkeletonText } from "@ionic/react";
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
        {data ? (
          <>
            <IonLabel>
              <h2>
                {data.workshop}・<b>{data.process}</b>
              </h2>
              <p>
                {data.product} / {data.size}
              </p>
            </IonLabel>
            <IonNote slot="end" color="success">
              <h4>{data.quantity}</h4>
            </IonNote>
          </>
        ) : (
          <>
            <IonSkeletonText animated style={{ width: "60%" }} />
            <IonSkeletonText animated />
          </>
        )}
      </IonItem>

      <EventModal form={form} />
    </>
  );
};

export default React.memo(EventItem);
