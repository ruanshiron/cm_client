import {
  IonBackButton,
  IonBadge,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonModal,
  IonNote,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import {
  add,
  alertOutline,
  caretForward,
  checkboxOutline,
  closeOutline,
  textOutline,
} from "ionicons/icons";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useProcessForm } from "../../hooks/useProcessForm";
import { initialProcess } from "../../models/process";
import { useSelector } from "../../store";
import { fetchAllProcesses } from "../../store/data/processSlice";

interface ProcessesPageProps {}

const ProcessesPage: React.FC<ProcessesPageProps> = () => {
  const form = useProcessForm();
  const processes = useSelector((state) => state.processes);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllProcesses());
  }, [dispatch]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/settings" />
          </IonButtons>
          <IonTitle>Quy trình</IonTitle>
          <IonButtons slot="end">
            <IonButton
              onClick={() => {
                form.setFields(initialProcess);
                form.setShowModal(true);
              }}
            >
              <IonIcon slot="icon-only" icon={add}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid style={{ padding: 0 }}>
          <IonRow>
            <IonCol size="12" size-md="8" offsetMd="2" style={{ padding: 0 }}>
              <IonList inset lines="full" className="flat-list">
                {processes.map((process, i) => (
                  <IonItem
                    key={i}
                    onClick={() => {
                      form.setShowModal(true);
                      form.setFieldsValue({ ...process });
                    }}
                    button
                  >
                    <IonLabel slot="start">
                      <b>{process.name}</b>
                    </IonLabel>
                    <IonNote slot="end">
                      <p>
                        <IonBadge style={{ marginRight: 4 }} color="warning">
                          {process.pending}
                        </IonBadge>
                        <IonBadge style={{ marginRight: 4 }} color="success">
                          {process.fulfilled}
                        </IonBadge>
                        <IonBadge style={{ marginRight: 4 }} color="danger">
                          {process.rejected}
                        </IonBadge>
                      </p>
                    </IonNote>
                  </IonItem>
                ))}
              </IonList>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
      <IonModal
        isOpen={form.showModal}
        onDidDismiss={() => form.setShowModal(false)}
      >
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton onClick={() => form.setShowModal(false)}>
                <IonIcon slot="icon-only" icon={closeOutline} />
              </IonButton>
            </IonButtons>
            <IonTitle>{form.fields.id ? "Sửa" : "Thêm"}</IonTitle>
            <IonButtons slot="end">
              <IonButton type="submit" onClick={form.submit}>
                Lưu
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList lines="full" className="ion-no-padding">
            <IonItem>
              <IonIcon slot="start" icon={textOutline} />
              <IonLabel position="fixed">
                <b>Tên quy trình</b>
              </IonLabel>
              <IonInput
                value={form.fields.name}
                onIonChange={(e) =>
                  form.setFieldsValue({ name: e.detail.value! })
                }
                onIonBlur={(e) =>
                  form.setFieldsValue({
                    name: form.fields.name?.toLocaleLowerCase(),
                  })
                }
              ></IonInput>
            </IonItem>
            <IonListHeader>Bao gồm các trạng thái</IonListHeader>
            <IonItem>
              <IonIcon slot="start" icon={caretForward} />
              <IonLabel position="fixed">
                <b>{"đang " + form.fields.name}</b>
              </IonLabel>
              <IonInput
                placeholder="Nhập tên bạn muốn gọi hoặc để trống"
                value={form.fields.pending}
                onIonChange={(e) =>
                  form.setFieldsValue({ pending: e.detail.value! })
                }
                onIonBlur={(e) =>
                  form.setFieldsValue({
                    pending: form.fields.pending?.toLocaleLowerCase(),
                  })
                }
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonIcon slot="start" icon={checkboxOutline} />
              <IonLabel position="fixed">
                <b>{"đã " + form.fields.name}</b>
              </IonLabel>
              <IonInput
                placeholder="Nhập tên bạn muốn gọi hoặc để trống"
                value={form.fields.fulfilled}
                onIonChange={(e) =>
                  form.setFieldsValue({ fulfilled: e.detail.value! })
                }
                onIonBlur={(e) =>
                  form.setFieldsValue({
                    fulfilled: form.fields.fulfilled?.toLocaleLowerCase(),
                  })
                }
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonIcon slot="start" icon={alertOutline} />
              <IonLabel position="fixed">
                <b>{form.fields.name + " lỗi"}</b>
              </IonLabel>
              <IonInput
                placeholder="Nhập tên bạn muốn gọi hoặc để trống"
                value={form.fields.rejected}
                onIonChange={(e) =>
                  form.setFieldsValue({ rejected: e.detail.value! })
                }
                onIonBlur={(e) =>
                  form.setFieldsValue({
                    rejected: form.fields.rejected?.toLocaleLowerCase(),
                  })
                }
              ></IonInput>
            </IonItem>
          </IonList>
        </IonContent>
      </IonModal>
    </IonPage>
  );
};

export default ProcessesPage;
