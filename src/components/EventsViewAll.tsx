import {
  IonCol,
  IonContent,
  IonGrid,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonItemDivider,
  IonLabel,
  IonList,
  IonRefresher,
  IonRefresherContent,
  IonRow,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "../store";
import {
  addStage,
  filteredStages,
  resetAllStages,
} from "../store/data/stageSlice";
import StageItem from "./items/StageItem";
import { RefresherEventDetail } from "@ionic/core";
import { useDispatch } from "react-redux";
import { getStages, Group } from "../models/stage";
import { formatStringDate } from "../utils/date";
import { toast } from "../utils/toast";
import { setLoading } from "../store/loading/loadingSlice";

interface Props {}

export const EventsViewAll: React.FC<Props> = () => {
  const groups: Group[] = useSelector(filteredStages);
  const { stageFilter } = useSelector((state) => state.diaryPage);
  const uid = useSelector((state) => state.user.uid);
  const [lastVisible, setLastVisible] = useState<any>();
  const [isNoMoreStage, setIsNoMoreStage] = useState(false);
  const dispatch = useDispatch();
  const handleRefesh = (event: CustomEvent<RefresherEventDetail>) => {
    dispatch(resetAllStages());
    setIsNoMoreStage(false);
    getStages(uid, stageFilter)
      .then((snap) => {
        setLastVisible(snap.docs[snap.docs.length - 1]);
        event.detail.complete();
        snap.docs.forEach((doc) => {
          const data = doc.data() as any;
          dispatch(
            addStage({
              id: doc.id,
              ...data,
              timestamp: data.timestamp?.toDate().toString(),
            })
          );
        });
      })
      .catch(() => {
        event.detail.complete();
        toast("Có lỗi xảy ra!");
      });
  };
  const handleLoadMore = (event: CustomEvent<void>) => {
    getStages(uid, { ...stageFilter, lastVisible })
      .then((snap) => {
        setLastVisible(snap.docs[snap.docs.length - 1]);
        if (snap.docs.length <= 0) setIsNoMoreStage(true);
        (event.target as HTMLIonInfiniteScrollElement).complete();
        snap.docs.forEach((doc) => {
          const data = doc.data() as any;
          dispatch(
            addStage({
              id: doc.id,
              ...data,
              timestamp: data.timestamp?.toDate().toString(),
            })
          );
        });
      })
      .catch(() => {
        (event.target as HTMLIonInfiniteScrollElement).complete();
        toast("Có lỗi xảy ra!");
      });
  };
  useEffect(() => {
    dispatch(setLoading(true));
    dispatch(resetAllStages());
    getStages(uid, stageFilter)
      .then((snap) => {
        dispatch(setLoading(false));
        setLastVisible(snap.docs[snap.docs.length - 1]);
        snap.docs.forEach((doc) => {
          const data = doc.data() as any;
          dispatch(
            addStage({
              id: doc.id,
              ...data,
              timestamp: data.timestamp?.toDate().toString(),
            })
          );
        });
      })
      .catch(() => {
        dispatch(setLoading(false));
        toast("Có lỗi xảy ra!");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stageFilter]);
  return (
    <IonContent>
      <IonRefresher slot="fixed" onIonRefresh={handleRefesh}>
        <IonRefresherContent></IonRefresherContent>
      </IonRefresher>
      <IonGrid>
        <IonRow className="ion-justify-content-center">
          <IonCol size="12" size-md="8">
            {groups.map((group, i) => (
              <IonList className="fadin border-full-2 ion-margin-top" key={i}>
                <IonItemDivider className="top-divider" color="white">
                  <IonLabel>{formatStringDate(group.name)}</IonLabel>
                </IonItemDivider>
                {group.events.map((item, j) => (
                  <StageItem stage={item} key={j} />
                ))}
              </IonList>
            ))}
            <IonInfiniteScroll
              disabled={isNoMoreStage}
              threshold="100px"
              onIonInfinite={handleLoadMore}
            >
              <IonInfiniteScrollContent></IonInfiniteScrollContent>
            </IonInfiniteScroll>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>
  );
};
