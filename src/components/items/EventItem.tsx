import React from "react";
import { IonNote, IonItem, IonLabel } from "@ionic/react";
import * as Event from "../../models/event";
import * as Process from "../../models/process";
import { useEventForm } from "../../hooks/useEventForm";
import { EventModal } from "../modals/EventModal";
import { useSelector } from "../../store";

interface EventItemProps {
  data: Event.Skeleton;
}

const EventItem: React.FC<EventItemProps> = ({ data }) => {
  const form = useEventForm(data);

  const product = useSelector((state) =>
    state.data.products.find((v) => v.id === data.product)
  );
  const process = useSelector((state) =>
    state.data.processes.find((v) => v.id === data.process?.split("/")[0])
  );
  const workshop = useSelector((state) =>
    state.data.workshops.find((v) => v.id === data.workshop)
  );

  return (
    <>
      <IonItem
        onClick={() => form.setShowEventForm(true)}
        button
        detail={false}
      >
        <>
          <IonLabel>
            <h2>
              {workshop?.name}・
              <b>
                {Process.ProcessEnum[data.process?.split("/")[1]!] +
                  process?.name}
              </b>
            </h2>
            <p>
              {product?.name} / {data.size}
            </p>
          </IonLabel>
          <IonNote slot="end" color="success">
            <h4>{data.quantity}</h4>
          </IonNote>
        </>
      </IonItem>

      <EventModal form={form} />
    </>
  );
};

export default React.memo(EventItem);
