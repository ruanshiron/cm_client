import React, { useRef, useState } from "react";
import {
  IonButton,
  IonDatetime,
  IonIcon,
  IonImg,
  IonInput,
  IonItem,
  IonItemDivider,
  IonItemGroup,
  IonLabel,
  IonList,
  IonLoading,
  IonRow,
  IonTextarea,
  IonThumbnail,
} from "@ionic/react";
import { calendarOutline, cubeOutline, imagesOutline } from "ionicons/icons";
import { useStageFullModalForm } from "../../hooks/useStageFullModalForm";
import { monthNames } from "../statistics/Datetime";
import ProcessSelectItem from "../items/ProcessSelectItem";
import ProductSelectItem from "../items/ProductSelectItem";
import SizeSelectItem from "../items/SizeSelectItem";
import WorkshopSelectItem from "../items/WorkshopSelectItem";

interface Props {
  form: ReturnType<typeof useStageFullModalForm>;
}

const StageFullModalForm: React.FC<Props> = ({
  form: {
    quantity,
    setQuantity,
    date,
    setDate,
    product,
    setProduct,
    workshop,
    setWorkshop,
    process,
    setProcess,
    status,
    setStatus,
    sizes,
    setSizes,
    note,
    setNote,
    images,
    setImages,
    loading,
  },
}) => {
  const imagesInput = useRef<HTMLInputElement>(null);
  const [more, setMore] = useState(false);
  return (
    <IonList lines="full">
      <IonLoading isOpen={loading} />
      <IonItem>
        <IonIcon icon={calendarOutline} slot="start" />
        <IonDatetime
          monthNames={monthNames}
          displayFormat="DD MMMM, YYYY"
          doneText="OK!"
          cancelText="Hủy"
          placeholder="Chọn ngày"
          value={date}
          onIonChange={(e) => setDate(e.detail.value!)}
        ></IonDatetime>
      </IonItem>
      <IonItem>
        <IonIcon icon={cubeOutline} slot="start" />
        <IonInput
          placeholder="Nhập số lượng"
          type="number"
          value={quantity}
          onIonChange={(e) => setQuantity(e.detail.value!)}
        ></IonInput>
      </IonItem>
      <ProductSelectItem
        value={product}
        onChange={(value) => setProduct(value)}
      />
      <SizeSelectItem values={sizes} onConfirm={(values) => setSizes(values)} />
      <WorkshopSelectItem
        value={workshop}
        onChange={(value) => setWorkshop(value)}
      />
      <ProcessSelectItem
        value={process}
        status={status}
        onChange={(value, status) => {
          setProcess(value);
          setStatus(status);
        }}
      />
      {more ? (
        <IonItemGroup>
          <IonItemDivider />
          <IonItem>
            <IonLabel position="stacked">Ghi chú</IonLabel>
            <IonTextarea
              value={note}
              onIonChange={(e) => setNote(e.detail.value!)}
            ></IonTextarea>
          </IonItem>
          <IonItem
            button
            onClick={() => {
              imagesInput.current?.click();
            }}
            lines="none"
          >
            <IonIcon slot="start" icon={imagesOutline}></IonIcon>
            <IonLabel>Ảnh</IonLabel>
          </IonItem>
          <IonRow className="ion-justify-content-between">
            {images.map((image, index) => (
              <IonThumbnail key={index} className="preview">
                <IonImg src={URL.createObjectURL(image)} />
              </IonThumbnail>
            ))}
          </IonRow>
        </IonItemGroup>
      ) : (
        <IonButton expand="full" fill="clear" onClick={() => setMore(true)}>
          Chi tiết hơn
        </IonButton>
      )}
      <input
        className="ion-hide"
        onChange={(e) => {
          setImages(Array.from(e.target.files || []));
        }}
        ref={imagesInput}
        type="file"
        name="images"
        accept="image/*"
        multiple
      ></input>
    </IonList>
  );
};

export default StageFullModalForm;
