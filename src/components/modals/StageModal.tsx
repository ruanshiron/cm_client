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
} from "@ionic/react";
import { arrowBack, checkmark, closeOutline } from "ionicons/icons";
import { useEventForm } from "../../hooks/useEventForm";
import Calendar from "react-calendar";
import { formatISO } from "date-fns";
import { isArray } from "lodash";
import { Process } from "../../models/process";
import { processParser } from "../../utils/data";
import { Workshop } from "../../models/workshop";
import { Product } from "../../models/product";

const DateSelecter: React.FC<{ onChange: ReturnType<any>; value: Date }> = ({
  onChange,
  value,
}) => {
  return (
    <div className="calendar-swapper">
      <Calendar
        onChange={(e) => {
          onChange(isArray(e) ? e[0] : e);
        }}
        value={value}
      />
    </div>
  );
};

const CustomSelecter: React.FC<{
  onChange: ReturnType<any>;
  items: { [key: string]: any }[];
  value: string;
}> = ({ onChange, value, items }) => {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <IonList>
        {items.map((item, index) => (
          <IonItem key={index} button onClick={() => onChange(item)}>
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
  value: { processId: string; processStatus: string };
}> = ({ onChange, value, items }) => {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <IonList>
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
            style={{ fontSize: 36 }}
            value={value || undefined}
            pattern="[0-9]"
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
  const handleSlideBack = async () => {
    slider.current?.slidePrev();
    if (await slider.current?.isBeginning()) setState("initiated");
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
        <IonListHeader>
          {form
            .detail()
            .filter((i) => i)
            .map((item, index) => (
              <IonBadge style={{ marginRight: 4 }} key={index}>
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
            <CustomSelecter
              items={form.products}
              value={form.fields.productId}
              onChange={handleChangeProduct}
            />
          </IonSlide>
          <IonSlide>
            <SizeSelecter
              items={
                form.products?.find((v) => v.id === form.fields?.productId)
                  ?.sizes || []
              }
              value={form.fields.productSize}
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
              <IonButton
                color="primary"
                style={{ marginRight: 12 }}
                onClick={form.submit}
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
