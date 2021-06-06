import {
  IonBadge,
  IonButton,
  IonButtons,
  IonHeader,
  IonIcon,
  IonPage,
  IonProgressBar,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToolbar,
  useIonActionSheet,
} from "@ionic/react";
import {
  close,
  filterOutline,
  logOutOutline,
  menuOutline,
} from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { EmployeeStageList } from "../../components/EmployeeStageList";
import PendingStageFab from "../../components/fabs/PendingStageFab";
import StageFilterModal from "../../components/modals/StageFilterModal";
import PendingStageList from "../../components/PendingStageList";
import { useSelector } from "../../store";
import { findEmployeeById } from "../../store/data/employeeSlice";
import { fetchAllProducts } from "../../store/data/productSlice";
import { fetchAllWorkshops } from "../../store/data/workshopSlice";

import { signOut } from "../../store/user/userSlice";

interface Props {}

const AnonymousEmployeePage: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const [presentActionSheet] = useIonActionSheet();
  const { id } = useSelector((state) => state.user);
  const employee = useSelector((state) =>
    state.employees.find((item) => item.id === state.user.id)
  );

  const [showFilterModal, setShowFilterModal] = useState(false);
  const [segemnt, setSegment] = useState<string>("all");
  const hasFilter = useSelector((state) =>
    Object.values(state.diaryPage.stageFilter).reduce(
      (a, b) => !!a || !!b,
      false
    )
  );
  const isLoading = useSelector((state) => state.loading.isLoading);

  useEffect(() => {
    dispatch(findEmployeeById(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(fetchAllProducts());
    dispatch(fetchAllWorkshops());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <IonPage id="diary-page" className="list-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton
              onClick={() =>
                presentActionSheet({
                  header: `Chào ${employee?.name}`,
                  buttons: [
                    {
                      text: "Đăng xuất",
                      icon: logOutOutline,
                      handler: () => {
                        dispatch(signOut());
                      },
                    },
                    {
                      text: "Hủy",
                      icon: close,
                    },
                  ],
                })
              }
            >
              <IonIcon slot="icon-only" icon={menuOutline}></IonIcon>
            </IonButton>
          </IonButtons>
          <IonTitle>{employee?.name}</IonTitle>
          {segemnt === "all" && (
            <IonButtons slot="end">
              <IonButton
                className="notification-button"
                onClick={() => setShowFilterModal(true)}
              >
                <IonIcon slot="icon-only" icon={filterOutline} />
                {hasFilter && (
                  <IonBadge className="notifications-badge" color="danger">
                    {" "}
                  </IonBadge>
                )}
              </IonButton>
            </IonButtons>
          )}
        </IonToolbar>
        <IonToolbar>
          <IonSegment
            value={segemnt}
            onIonChange={(e) => setSegment(e.detail.value!)}
          >
            <IonSegmentButton value="all">Tất cả</IonSegmentButton>
            <IonSegmentButton value="pending">Đang đợi</IonSegmentButton>
          </IonSegment>
        </IonToolbar>
      </IonHeader>
      <IonProgressBar
        className={isLoading ? "" : "ion-hide"}
        type="indeterminate"
        slot="fixed"
      />
      {segemnt === "all" && <EmployeeStageList />}
      {segemnt === "pending" && <PendingStageList />}
      <StageFilterModal
        isOpen={showFilterModal}
        onDidDismiss={() => setShowFilterModal(false)}
      />
      <PendingStageFab />
    </IonPage>
  );
};

export default AnonymousEmployeePage;
