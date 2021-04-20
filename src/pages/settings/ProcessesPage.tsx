import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonFab,
  IonFabButton,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonPage,
  IonRow,
  IonTitle,
  IonToggle,
  IonToolbar,
} from "@ionic/react";
import { add, closeOutline } from "ionicons/icons";
import React from "react";
import { useProcessForm } from "../../hooks/useProcessForm";
import { initialProcess } from "../../models/process";
import { useSelector } from "../../store";

interface ProcessesPageProps {}

const ProcessesPage: React.FC<ProcessesPageProps> = () => {
  const form = useProcessForm();

  const processes = useSelector((state) => state.processes);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/settings" />
          </IonButtons>
          <IonTitle>Quy trình</IonTitle>
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
                    <IonLabel>{process.name}</IonLabel>
                  </IonItem>
                ))}
              </IonList>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>

      <IonFab vertical="bottom" horizontal="end" slot="fixed">
        <IonFabButton
          onClick={() => {
            form.setFields(initialProcess);
            form.setShowModal(true);
          }}
        >
          <IonIcon icon={add}></IonIcon>
        </IonFabButton>
      </IonFab>

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
          <IonList lines="full">
            <IonItem>
              <IonLabel position="floating">Tên quy trình</IonLabel>
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
            <IonItem>
              <IonToggle
                checked={form.defaultName}
                slot="end"
                onIonChange={(e) => {
                  form.setDefaultName(e.detail.checked);
                }}
              ></IonToggle>
              <IonLabel>Chỉnh sửa tên gọi</IonLabel>
            </IonItem>
            {form.defaultName && (
              <>
                <IonItem>
                  <IonLabel position="floating">
                    {"đang " + form.fields.name}
                  </IonLabel>
                  <IonInput
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
                  <IonLabel position="floating">
                    {"đã " + form.fields.name}
                  </IonLabel>
                  <IonInput
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
                  <IonLabel position="floating">
                    {form.fields.name + " lỗi"}
                  </IonLabel>
                  <IonInput
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
              </>
            )}
          </IonList>
        </IonContent>
      </IonModal>
    </IonPage>
  );
};

export default ProcessesPage;
