import {
  IonButton,
  IonButtons,
  IonContent,
  IonDatetime,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonModal,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import {
  bodyOutline,
  calendarClearOutline,
  calendarNumberOutline,
  helpCircleOutline,
  peopleCircleOutline,
  shirtOutline,
} from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { StageFilterOptions } from "../../models/stage";
import { useSelector } from "../../store";
import { fetchAllProcesses } from "../../store/data/processSlice";
import { fetchAllProducts } from "../../store/data/productSlice";
import { fetchAllWorkshops } from "../../store/data/workshopSlice";
import { setFilter } from "../../store/page/diaryPageSlice";
import { monthNames } from "../statistics/Datetime";

interface Props {
  isOpen: boolean;
  onDidDismiss: ReturnType<any>;
}
const StageFilterModal: React.FC<Props> = ({ isOpen, onDidDismiss }) => {
  const dispatch = useDispatch();
  const { stageFilter } = useSelector((state) => state.diaryPage);
  const [from, setFrom] = useState<string>(stageFilter.from || "");
  const [to, setTo] = useState<string>(stageFilter.to || "");
  const [workshopId, setWorkshopId] = useState<string>(
    stageFilter.workshopId || ""
  );
  const [productId, setProductId] = useState<string>(
    stageFilter.productId || ""
  );
  const [productSize, setProductSize] = useState<string>(
    stageFilter.productSize || ""
  );
  const [process, setProcess] = useState<string>(
    (stageFilter.processId || "") + "/" + (stageFilter.processStatus || "")
  );
  const { products, workshops, processes } = useSelector((state) => state);
  const selectedProduct = useSelector((state) =>
    state.products.find((item) => item.id === productId)
  );
  const handleSubmit = () => {
    const [processId, processStatus] = process.split("/");
    const filter: StageFilterOptions = {
      from,
      to,
      workshopId,
      productId,
      productSize,
      processId,
      processStatus,
    };
    dispatch(setFilter(filter));
    onDidDismiss();
  };
  const handleReset = () => {
    setFrom("");
    setTo("");
    setWorkshopId("");
    setProductId("");
    setProductSize("");
    setProcess("");
  };
  const handlePresent = () => {
    if (isOpen) {
      setFrom(stageFilter.from || "");
      setTo(stageFilter.to || "");
      setWorkshopId(stageFilter.workshopId || "");
      setProductId(stageFilter.productId || "");
      setProductSize(stageFilter.productSize || "");
      setProcess(
        (stageFilter.processId || "") + "/" + (stageFilter.processStatus || "")
      );
    }
  };
  useEffect(() => {
    if (workshops.length <= 0) dispatch(fetchAllWorkshops());
    if (processes.length <= 0) dispatch(fetchAllProcesses());
    if (products.length <= 0) dispatch(fetchAllProducts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <IonModal
      onWillPresent={handlePresent}
      isOpen={isOpen}
      onDidDismiss={onDidDismiss}
    >
      <IonHeader>
        <IonToolbar>
          <IonTitle>Bộ lọc</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={handleSubmit}>OK!</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonListHeader>Thời gian</IonListHeader>
          <IonItem>
            <IonIcon icon={calendarClearOutline} slot="start" />
            <IonLabel>Từ ngày</IonLabel>
            <IonDatetime
              monthNames={monthNames}
              displayFormat="DD MMMM, YYYY"
              doneText="OK!"
              cancelText="Xóa"
              value={from}
              onIonChange={(e) => setFrom(e.detail.value || "")}
              onIonCancel={() => setFrom("")}
            ></IonDatetime>
          </IonItem>
          <IonItem>
            <IonIcon icon={calendarNumberOutline} slot="start" />
            <IonLabel>Đến ngày</IonLabel>
            <IonDatetime
              monthNames={monthNames}
              displayFormat="DD MMMM, YYYY"
              doneText="OK!"
              cancelText="Xóa"
              value={to}
              onIonChange={(e) => setTo(e.detail.value || "")}
              onIonCancel={() => setTo("")}
            ></IonDatetime>
          </IonItem>

          <IonListHeader>Thông tin</IonListHeader>
          <IonItem>
            <IonIcon icon={peopleCircleOutline} slot="start" />
            <IonLabel>Xưởng</IonLabel>
            <IonSelect
              okText="Chọn"
              interface="action-sheet"
              cancelText="Hủy"
              value={workshopId}
              onIonChange={(e) => setWorkshopId(e.detail.value)}
            >
              {workshops.map((item, index) => (
                <IonSelectOption key={index} value={item.id}>
                  {item.name}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonIcon icon={shirtOutline} slot="start" />
            <IonLabel>Sản phẩm</IonLabel>
            <IonSelect
              okText="Chọn"
              interface="action-sheet"
              cancelText="Hủy"
              value={productId}
              onIonChange={(e) => setProductId(e.detail.value)}
            >
              {products.map((item, index) => (
                <IonSelectOption key={index} value={item.id}>
                  {item.name}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonIcon icon={bodyOutline} slot="start" />
            <IonLabel>Kích cỡ</IonLabel>
            <IonSelect
              okText="Chọn"
              interface="action-sheet"
              cancelText="Hủy"
              value={productSize}
              onIonChange={(e) => setProductSize(e.detail.value)}
            >
              {selectedProduct?.sizes.map((item, index) => (
                <IonSelectOption key={index} value={item}>
                  {item}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonIcon icon={helpCircleOutline} slot="start" />
            <IonLabel>Quy trình</IonLabel>
            <IonSelect
              okText="Chọn"
              interface="action-sheet"
              cancelText="Hủy"
              value={process}
              onIonChange={(e) => setProcess(e.detail.value)}
            >
              {processes.map((item, index) => (
                <React.Fragment key={index}>
                  {["pending", "fulfilled", "rejected"].map((status) => (
                    <IonSelectOption value={`${item}/${status}`}>
                      {(item as any)[status]}
                    </IonSelectOption>
                  ))}
                </React.Fragment>
              ))}
            </IonSelect>
          </IonItem>
          <IonItem onClick={handleReset} button lines="full">
            <IonLabel color="danger" className="ion-text-center">
              Đặt lại
            </IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonModal>
  );
};

export default StageFilterModal;
