import React, { useRef, useState } from "react";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonDatetime,
  IonHeader,
  IonIcon,
  IonImg,
  IonInput,
  IonItem,
  IonItemDivider,
  IonItemGroup,
  IonLabel,
  IonList,
  IonLoading,
  IonModal,
  IonRow,
  IonTextarea,
  IonThumbnail,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import {
  calendarOutline,
  checkmarkOutline,
  close,
  cubeOutline,
  imagesOutline,
  trashOutline,
} from "ionicons/icons";
import { usePendingStageForm } from "../../hooks/usePendingStageForm";
import { monthNames } from "../statistics/Datetime";
import ProcessSelectItem from "../items/ProcessSelectItem";
import ProductSelectItem from "../items/ProductSelectItem";
import SizeSelectItem from "../items/SizeSelectItem";
import WorkshopSelectItem from "../items/WorkshopSelectItem";
import { toast } from "../../utils/toast";

interface Props {
  form: ReturnType<typeof usePendingStageForm>;
  disableMore?: boolean;
  isOpen: boolean;
  onDismiss: () => void;
  onSubmit: () => void;
}

const PendingStageModal: React.FC<Props> = ({
  form: {
    id,
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
    remove,
  },
  disableMore,
  isOpen,
  onDismiss,
  onSubmit,
}) => {
  const imagesInput = useRef<HTMLInputElement>(null);
  const [more, setMore] = useState(false);
  const handleDelete = () => {
    remove()
      .then(() => {
        toast("Đã đề xuất xóa!");
        onDismiss();
      })
      .catch((error) => {
        toast(error.message);
      });
  };
  return (
    <IonModal isOpen={isOpen} onDidDismiss={() => onDismiss()}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => onDismiss()}>
              <IonIcon slot="icon-only" icon={close} />
            </IonButton>
          </IonButtons>
          <IonTitle>{id ? "Sửa" : "Thêm"}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => onSubmit()}>
              <IonIcon slot="icon-only" icon={checkmarkOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
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
          <SizeSelectItem
            options={product?.sizes || []}
            values={sizes}
            onConfirm={(values) => setSizes(values)}
          />
          <WorkshopSelectItem
            value={workshop}
            onChange={(value) => setWorkshop(value)}
          />
          <ProcessSelectItem
            product={product}
            value={process}
            status={status}
            onChange={(value, status) => {
              setProcess(value);
              setStatus(status);
            }}
          />
          <IonItem>
            <IonLabel position="stacked">Ghi chú</IonLabel>
            <IonTextarea
              value={note}
              onIonChange={(e) => setNote(e.detail.value!)}
            ></IonTextarea>
          </IonItem>
          {more ? (
            <IonItemGroup>
              <IonItemDivider />
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
            !disableMore && (
              <IonButton
                expand="full"
                fill="clear"
                onClick={() => setMore(true)}
              >
                Chi tiết hơn
              </IonButton>
            )
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
        <IonButton
          expand="full"
          fill="clear"
          color="danger"
          onClick={() => handleDelete()}
        >
          <IonIcon slot="start" icon={trashOutline} />
          Xóa
        </IonButton>
      </IonContent>
    </IonModal>
  );
};

export default PendingStageModal;
