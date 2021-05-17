import React, { useRef, useState } from "react";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonModal,
  IonTitle,
  IonToolbar,
  IonSlides,
  IonSlide,
  IonFooter,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonListHeader,
  IonBadge,
  isPlatform,
  IonRow,
  IonImg,
  IonThumbnail,
  IonTextarea,
  IonItemDivider,
  IonItemGroup,
} from "@ionic/react";
import {
  arrowBack,
  checkmark,
  closeOutline,
  imageOutline,
} from "ionicons/icons";
import { useStageFormModal } from "../../hooks/useStageFormModal";
import { formatISO } from "date-fns";
import { Process } from "../../models/process";
import { processParser } from "../../utils/data";
import { Workshop } from "../../models/workshop";
import { Product } from "../../models/product";
import { DatePicker } from "@material-ui/pickers";

const DateSelecter: React.FC<{ onChange: ReturnType<any>; value: Date }> = ({
  onChange,
  value,
}) => {
  return (
    <div className="calendar-swapper">
      <DatePicker
        autoOk
        orientation={isPlatform("mobile") ? "portrait" : "landscape"}
        variant="static"
        openTo="date"
        value={value}
        onChange={(e) => onChange(e)}
      />
    </div>
  );
};

const CustomSelecter: React.FC<{
  onChange: ReturnType<any>;
  items: { [key: string]: any }[];
  value: string;
  title?: string;
}> = ({ onChange, value, items, title }) => {
  return (
    <IonContent>
      <IonList className="ion-no-padding" lines="full">
        <IonListHeader>
          <b>{title}</b>
        </IonListHeader>
        {items.map((item, index) => (
          <IonItem key={index} button onClick={() => onChange(item)}>
            {item.name}
            {value === item.id && (
              <IonIcon icon={checkmark} slot="end" color="success"></IonIcon>
            )}
          </IonItem>
        ))}
      </IonList>{" "}
    </IonContent>
  );
};

const SizeSelecter: React.FC<{
  onChange: ReturnType<any>;
  items: string[];
  value: string;
}> = ({ onChange, value, items }) => {
  return (
    <IonContent>
      <IonList className="ion-no-padding">
        <IonListHeader>
          <b>Chọn kích cỡ sản phẩm</b>
        </IonListHeader>
        {items.map((item, index) => (
          <IonItem key={index} button onClick={() => onChange(item)}>
            {item}
            {value === item && (
              <IonIcon icon={checkmark} slot="end" color="success"></IonIcon>
            )}
          </IonItem>
        ))}
      </IonList>
    </IonContent>
  );
};

const ProcessSelecter: React.FC<{
  onChange: ReturnType<any>;
  items: Process[];
  value: { processId: string; processStatus: string };
}> = ({ onChange, value, items }) => {
  return (
    <IonContent>
      <IonList className="ion-no-padding" lines="full">
        <IonListHeader>
          <b>Chọn quy trình</b>
        </IonListHeader>
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <IonItem
              button
              onClick={() =>
                onChange({
                  processId: item.id,
                  processStatus: "pending",
                  processLabel: item.pending,
                })
              }
            >
              {processParser(item.id + "/pending", items)}
              {value.processId === item.id &&
                value.processStatus === "pending" && (
                  <IonIcon
                    icon={checkmark}
                    slot="end"
                    color="success"
                  ></IonIcon>
                )}
            </IonItem>
            <IonItem
              button
              onClick={() =>
                onChange({
                  processId: item.id,
                  processStatus: "fulfilled",
                  processLabel: item.fulfilled,
                })
              }
            >
              {processParser(item.id + "/fulfilled", items)}
              {value.processId === item.id &&
                value.processStatus === "fulfilled" && (
                  <IonIcon
                    icon={checkmark}
                    slot="end"
                    color="success"
                  ></IonIcon>
                )}
            </IonItem>
            <IonItem
              button
              onClick={() =>
                onChange({
                  processId: item.id,
                  processStatus: "rejected",
                  processLabel: item.rejected,
                })
              }
            >
              {processParser(item.id + "/rejected", items)}
              {value.processId === item.id &&
                value.processStatus === "rejected" && (
                  <IonIcon
                    icon={checkmark}
                    slot="end"
                    color="success"
                  ></IonIcon>
                )}
            </IonItem>
          </React.Fragment>
        ))}
      </IonList>
    </IonContent>
  );
};

const QuantityInput: React.FC<{
  onChangeQuantity: ReturnType<any>;
  quantity: number;
  note?: string;
  onChangeNote: ReturnType<any>;
  images: File[];
  setImages: React.Dispatch<React.SetStateAction<File[]>>;
}> = ({
  onChangeQuantity,
  quantity,
  images,
  setImages,
  note,
  onChangeNote,
}) => {
  const imagesInput = useRef<HTMLInputElement>(null);
  const [more, setMore] = useState(false);
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <IonContent>
        <IonList className="ion-no-padding">
          <IonItem>
            <IonLabel position="stacked">Số lượng</IonLabel>
            <IonInput
              style={{ fontSize: 36 }}
              value={quantity || undefined}
              pattern="[0-9]"
              onIonChange={(e) =>
                onChangeQuantity(parseInt(e.detail.value!, 0))
              }
            ></IonInput>
          </IonItem>
        </IonList>
        {more ? (
          <IonItemGroup>
            <IonItemDivider />
            <IonItem>
              <IonLabel position="stacked">Ghi chú</IonLabel>
              <IonTextarea
                value={note || undefined}
                onIonChange={(e) => onChangeNote(e.detail.value!)}
              ></IonTextarea>
            </IonItem>
            <IonItem
              button
              onClick={() => {
                imagesInput.current?.click();
              }}
              lines="none"
            >
              <IonIcon slot="start" icon={imageOutline}></IonIcon>
              <IonLabel>Camera</IonLabel>
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
            if (e.target.files !== null && e.target.files.length > 0) {
              setImages(Array.from(e.target.files));
            }
            // console.log(e.target.files?.length);
          }}
          ref={imagesInput}
          type="file"
          name="images"
          accept="image/*"
          multiple
        ></input>
      </IonContent>
    </div>
  );
};

interface StageModalProps {
  form: ReturnType<typeof useStageFormModal>;
}

export const StageModal: React.FC<StageModalProps> = ({ form }) => {
  const slider = useRef<HTMLIonSlidesElement>(null);

  const [state, setState] =
    useState<"started" | "finished" | "initiated">("initiated");

  const handleChangeDate = (date: Date) => {
    slider.current?.slideNext();
    form.setFieldsValue({ date: formatISO(date, { representation: "date" }) });
    setState("started");
  };
  const handleChangeWorkshop = (workshop: Workshop) => {
    slider.current?.slideNext();
    form.setFieldsValue({
      workshopId: workshop.id,
      workshopName: workshop.name,
    });
  };
  const handleChangeProcess = (params: {
    processId: string;
    processStatus: string;
    processLabel: string;
  }) => {
    slider.current?.slideNext();
    form.setFieldsValue({
      processId: params.processId,
      processStatus: params.processStatus,
      processLabel: params.processLabel,
    });
  };
  const handleChangeProduct = (product: Product) => {
    slider.current?.slideNext();
    form.setFieldsValue({ productId: product.id, productName: product.name });
  };
  const handleChangeSize = (size: string) => {
    slider.current?.slideNext();
    form.setFieldsValue({ productSize: size });
  };
  const handleChangeQuantity = (quantity: any) => {
    form.setFieldsValue({ quantity });

    if (quantity) {
      setState("finished");
    } else setState("started");
  };
  const handleChangeNote = (note: string) => {
    form.setFieldsValue({ note });
  };
  const handleSlideBack = async () => {
    slider.current?.slidePrev();
    if (await slider.current?.isBeginning()) setState("initiated");
  };

  return (
    <IonModal
      isOpen={form.showForm}
      swipeToClose={true}
      onDidDismiss={() => form.setShowForm(false)}
      onDidPresent={() => {
        slider.current?.update();
      }}
    >
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => form.setShowForm(false)}>
              <IonIcon slot="icon-only" icon={closeOutline} />
            </IonButton>
          </IonButtons>
          <IonTitle>{form.fields.id ? "Cập nhật" : "Thêm mới"}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonListHeader>
          {form.detail().map((item, index) => (
            <IonBadge
              className="fadin"
              style={{ marginRight: 4 }}
              key={index}
              color="dark"
            >
              {item}
            </IonBadge>
          ))}
        </IonListHeader>
        <IonSlides ref={slider} options={{ allowTouchMove: false }}>
          <IonSlide>
            <DateSelecter
              value={new Date(form.fields.date)}
              onChange={handleChangeDate}
            />
          </IonSlide>
          <IonSlide>
            <CustomSelecter
              title="Chọn sản phẩm"
              items={form.products}
              value={form.fields.productId}
              onChange={handleChangeProduct}
            />
          </IonSlide>
          <IonSlide>
            <SizeSelecter
              items={form.selectedProcduct?.sizes || []}
              value={form.fields.productSize}
              onChange={handleChangeSize}
            />
          </IonSlide>
          <IonSlide>
            <CustomSelecter
              title="Chọn xưởng"
              items={form.workshops}
              value={form.fields.workshopId}
              onChange={handleChangeWorkshop}
            />
          </IonSlide>
          <IonSlide>
            <ProcessSelecter
              items={form.processes}
              value={{
                processId: form.fields.processId,
                processStatus: form.fields.processStatus,
              }}
              onChange={handleChangeProcess}
            />
          </IonSlide>
          <IonSlide>
            <QuantityInput
              quantity={form.fields.quantity}
              onChangeQuantity={handleChangeQuantity}
              note={form.fields.note}
              onChangeNote={handleChangeNote}
              images={form.images}
              setImages={form.setImages}
            />
          </IonSlide>
        </IonSlides>
      </IonContent>
      <IonFooter className="ion-no-border">
        <IonToolbar>
          {state !== "initiated" && (
            <IonButtons slot="start">
              <IonButton onClick={handleSlideBack}>
                <IonIcon slot="icon-only" icon={arrowBack} />
              </IonButton>
            </IonButtons>
          )}
          {state === "finished" && (
            <IonButtons slot="end">
              <IonButton
                color="primary"
                style={{ marginRight: 12 }}
                onClick={() => form.submit()}
              >
                <IonIcon icon={checkmark} slot="start"></IonIcon> Hoàn thành
              </IonButton>
            </IonButtons>
          )}
        </IonToolbar>
      </IonFooter>
    </IonModal>
  );
};
