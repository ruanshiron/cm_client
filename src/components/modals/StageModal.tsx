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
} from "@ionic/react";
import {
  arrowBack,
  checkmark,
  closeOutline,
} from "ionicons/icons";
import { useEventForm } from "../../hooks/useEventForm";
import Calendar from "react-calendar";
import { formatISO } from "date-fns";
import { isArray } from "lodash";
import { Process } from "../../models/process";
import { processParser } from "../../utils/data";

const DateSelecter: React.FC<{ onChange: ReturnType<any>; value: Date }> = ({
  onChange,
  value,
}) => {
  return (
    <Calendar
      onChange={(e) => {
        onChange(isArray(e) ? e[0] : e);
      }}
      value={value}
    />
  );
};

const CustomSelecter: React.FC<{
  onChange: ReturnType<any>;
  items: { id?: string; name: string }[];
  value: string;
}> = ({ onChange, value, items }) => {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <IonList>
        {items.map((item, index) => (
          <IonItem key={index} button onClick={() => onChange(item.id)}>
            {item.name}
            {value === item.id && (
              <IonIcon icon={checkmark} slot="end" color="success"></IonIcon>
            )}
          </IonItem>
        ))}
      </IonList>
    </div>
  );
};

const SizeSelecter: React.FC<{
  onChange: ReturnType<any>;
  items: string[];
  value: string;
}> = ({ onChange, value, items }) => {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <IonList>
        {items.map((item, index) => (
          <IonItem key={index} button onClick={() => onChange(item)}>
            {item}
            {value === item && (
              <IonIcon icon={checkmark} slot="end" color="success"></IonIcon>
            )}
          </IonItem>
        ))}
      </IonList>
    </div>
  );
};

const ProcessSelecter: React.FC<{
  onChange: ReturnType<any>;
  items: Process[];
  value: string;
}> = ({ onChange, value, items }) => {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <IonList>
        {items.map((item, index) => (
          <>
            <IonItem
              key={index}
              button
              onClick={() => onChange(item.id + "/pending")}
            >
              {processParser(item.id + "/pending", items)}
              {value === item.id + "/pending" && (
                <IonIcon icon={checkmark} slot="end" color="success"></IonIcon>
              )}
            </IonItem>
            <IonItem
              key={index}
              button
              onClick={() => onChange(item.id + "/fulfilled")}
            >
              {processParser(item.id + "/fulfilled", items)}
              {value === item.id + "/fulfilled" && (
                <IonIcon icon={checkmark} slot="end" color="success"></IonIcon>
              )}
            </IonItem>
            <IonItem
              key={index}
              button
              onClick={() => onChange(item.id + "/rejected")}
            >
              {processParser(item.id + "/rejected", items)}
              {value === item.id + "/rejected" && (
                <IonIcon icon={checkmark} slot="end" color="success"></IonIcon>
              )}
            </IonItem>
          </>
        ))}
      </IonList>
    </div>
  );
};

const QuantityInput: React.FC<{ onChange: ReturnType<any>; value: number }> = ({
  onChange,
  value,
}) => {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <IonList>
        <IonItem>
          <IonLabel position="stacked">Số lượng</IonLabel>
          <IonInput
            type="number"
            style={{ fontSize: 36 }}
            value={value}
            onIonChange={(e) => onChange(parseInt(e.detail.value!, 0))}
          ></IonInput>
        </IonItem>
      </IonList>
    </div>
  );
};

interface StageModalProps {
  form: ReturnType<typeof useEventForm>;
}

export const StageModal: React.FC<StageModalProps> = ({ form }) => {
  const slider = useRef<HTMLIonSlidesElement>(null);

  const [state, setState] = useState<"started" | "finished" | "initiated">(
    "initiated"
  );

  const handleChangeDate = (date: Date) => {
    slider.current?.slideNext();
    form.setFieldsValue({ date: formatISO(date, { representation: "date" }) });
    setState("started");
  };
  const handleChangeWorkshop = (workshop: string) => {
    slider.current?.slideNext();
    form.setFieldsValue({ workshop });
  };
  const handleChangeProcess = (process: string) => {
    slider.current?.slideNext();
    form.setFieldsValue({ process });
  };
  const handleChangeProduct = (product: string) => {
    slider.current?.slideNext();
    form.setFieldsValue({ product });
  };
  const handleChangeSize = (size: string) => {
    slider.current?.slideNext();
    form.setFieldsValue({ size });
  };
  const handleChangeQuantity = (quantity: number) => {
    form.setFieldsValue({ quantity });
    if (quantity) setState("finished");
    else setState("started")
  };
  const handleSlideBack = async () => {
    slider.current?.slidePrev();
    if (await slider.current?.isBeginning()) setState("initiated");
    else setState("started");
  };

  return (
    <IonModal
      isOpen={form.showEventForm}
      swipeToClose={true}
      onDidDismiss={() => form.setShowEventForm(false)}
      onDidPresent={() => {
        slider.current?.update();
      }}
    >
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => form.setShowEventForm(false)}>
              <IonIcon slot="icon-only" icon={closeOutline} />
            </IonButton>
          </IonButtons>
          <IonTitle>{form.fields.id ? "Cập nhật" : "Thêm mới"}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent color="light">
        <IonListHeader>{form.detail()}</IonListHeader>
        <IonSlides ref={slider} options={{ allowTouchMove: false }}>
          <IonSlide>
            <DateSelecter
              value={new Date(form.fields.date)}
              onChange={handleChangeDate}
            />
          </IonSlide>
          <IonSlide>
            <CustomSelecter
              items={form.workshops}
              value={form.fields.workshop}
              onChange={handleChangeWorkshop}
            />
          </IonSlide>
          <IonSlide>
            <ProcessSelecter
              items={form.processes}
              value={form.fields.process}
              onChange={handleChangeProcess}
            />
          </IonSlide>
          <IonSlide>
            <CustomSelecter
              items={form.products}
              value={form.fields.product}
              onChange={handleChangeProduct}
            />
          </IonSlide>
          <IonSlide>
            <SizeSelecter
              items={
                form.products?.find((v) => v.id === form.fields?.product)
                  ?.sizes || []
              }
              value={form.fields.size}
              onChange={handleChangeSize}
            />
          </IonSlide>
          <IonSlide>
            <QuantityInput
              value={form.fields.quantity}
              onChange={handleChangeQuantity}
            />
          </IonSlide>
        </IonSlides>
      </IonContent>
      <IonFooter className="ion-no-border" color="light">
        <IonToolbar color="light">
          {state !== "initiated" && (
            <IonButtons slot="start">
              <IonButton onClick={handleSlideBack}>
                <IonIcon slot="icon-only" icon={arrowBack} />
              </IonButton>
            </IonButtons>
          )}
          {state === "finished" && (
            <IonButtons slot="end">
              <IonButton color="primary" style={{marginRight: 12}} onClick={form.submit}> <IonIcon icon={checkmark} slot="start"></IonIcon> Hoàn thành</IonButton>
            </IonButtons>
          )}
        </IonToolbar>
      </IonFooter>
    </IonModal>
  );
};
