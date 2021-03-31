import {
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonLabel,
  IonList,
  IonRow,
  IonSegment,
  IonSegmentButton,
  IonSlide,
  IonSlides,
  IonToolbar,
} from "@ionic/react";
import { add, format, formatISO } from "date-fns";
import { fileTrayOutline } from "ionicons/icons";
import React, { useLayoutEffect, useRef, useState } from "react";
import { useSelector } from "../store";
import { getDates } from "../utils/date";
import EventItem from "./items/EventItem";
import * as Event from "../models/event";

interface Props {}

const EventList: React.FC<{ events: Event.Skeleton[] }> = ({ events }) => {
  return events.length ? (
    <IonList lines="inset">
      {events.map((item, j) => (
        <EventItem data={item} key={j} />
      ))}
    </IonList>
  ) : (
    <div className="empty-item">
      <IonIcon
        icon={fileTrayOutline}
        style={{ fontSize: 128 }}
        color="medium"
      />
    </div>
  );
};

export const EventsViewByDay: React.FC<Props> = () => {
  const events = useSelector((state) => state.data.events);

  const slider = useRef<HTMLIonSlidesElement>(null);

  const dates = getDates("2021/1/1", add(new Date(), { days: 3 }));

  const todayIndex = dates.findIndex(
    (e) => e === formatISO(new Date(), { representation: "date" })
  );
  const [selected, setSelected] = useState<string>("" + todayIndex);

  const handleSegmentChange = (value: string) => {
    document.getElementById(`segment/${value}`)?.scrollIntoView({
      block: "center",
      inline: "center",
      behavior: "smooth",
    });
    setSelected(value);
    slider.current!.slideTo(parseInt(value));
  };

  const handleSlideChange = async (e: any) => {
    let index: number = 0;
    await e.target?.getActiveIndex().then((value: any) => (index = value));
    setSelected("" + index);
  };

  useLayoutEffect(() => {
    setTimeout(() => {
      document.getElementById(`segment/${selected}`)?.scrollIntoView({
        block: "center",
        inline: "center",
      });

      slider.current!.slideTo(parseInt(selected), 0);
    }, 200);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonSegment
            scrollable
            value={selected}
            onIonChange={(e) => handleSegmentChange(e.detail.value!)}
          >
            {dates.map((date, i) => (
              <IonSegmentButton key={i} value={`${i}`} id={`segment/${i}`}>
                <IonLabel>{format(new Date(date), "dd 'Thg' MM")}</IonLabel>
              </IonSegmentButton>
            ))}
          </IonSegment>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonSlides
          onIonSlideDidChange={handleSlideChange}
          ref={slider}
          options={{
            initialSlide: 1,
            speed: 400,
          }}
        >
          {dates.map((date, i) => (
            <IonSlide key={i}>
              <IonGrid style={{ padding: 0 }}>
                <IonRow>
                  <IonCol
                    size="12"
                    size-md="8"
                    offsetMd="2"
                    style={{ padding: 0 }}
                  >
                    <div className="bulkhead"></div>
                    <div className="border-full" key={i}>
                      <IonList lines="inset">
                        <EventList
                          events={events.filter(
                            (e) =>
                              formatISO(new Date(e.date!), {
                                representation: "date",
                              }) ===
                              formatISO(new Date(date), {
                                representation: "date",
                              })
                          )}
                        />
                      </IonList>
                    </div>
                    <div className="last-item"></div>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonSlide>
          ))}
        </IonSlides>
      </IonContent>
    </>
  );
};
