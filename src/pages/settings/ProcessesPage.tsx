import {
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
  IonItemDivider,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenuButton,
  IonModal,
  IonNote,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  useIonAlert,
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
import { destroyProcess, initialProcess } from "../../models/process";
import { useSelector } from "../../store";
import {
  fetchAllProcesses,
  removeProcess,
} from "../../store/data/processSlice";
import { toast } from "../../utils/toast";

interface ProcessesPageProps {}

const ProcessesPage: React.FC<ProcessesPageProps> = () => {
  const form = useProcessForm();
  const { uid, role } = useSelector((state) => state.user);
  const [presentDeleteAlert] = useIonAlert();
  const processes = useSelector((state) => state.processes);
  const handleDeleteProcess = async (id: string) => {
    try {
      if (id) await destroyProcess(uid, id);

      toast("Xóa thành công!");

      form.setShowModal(false);
      dispatch(removeProcess(id));
    } catch (error) {
      toast("Có lỗi xảy ra, vui lòng thử lại!");
    }
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllProcesses());
  }, [dispatch]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
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
          <IonRow className="ion-justify-content-center">
            <IonCol size="12" size-md="8">
              <div className="ion-margin-top ion-text-center">
                Vui lòng chỉ tạo nhiều nhất <b>10</b> công đoạn
              </div>
            </IonCol>
            <IonCol size="12" size-md="8" style={{ padding: 0 }}>
              {processes.length > 0 && (
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
                      <IonLabel>
                        <b>{process.name}</b>
                      </IonLabel>
                      <IonNote slot="end">
                        <IonBadge style={{ marginLeft: 4 }} color="warning">
                          {process.pending}
                        </IonBadge>
                        <IonBadge style={{ marginLeft: 4 }} color="success">
                          {process.fulfilled}
                        </IonBadge>
                        <IonBadge style={{ marginLeft: 4 }} color="danger">
                          {process.rejected}
                        </IonBadge>
                      </IonNote>
                    </IonItem>
                  ))}
                </IonList>
              )}
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
              <IonButton type="submit" onClick={() => form.submit()}>
                Lưu
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList lines="full" className="ion-no-padding">
            <IonItem>
              <IonIcon slot="start" icon={textOutline} />
              <IonLabel position="floating">
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
              <IonLabel position="floating">
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
              <IonLabel position="floating">
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
              <IonLabel position="floating">
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
            {form.fields.id && (
              <>
                <IonItemDivider />
                <IonItem
                  button
                  lines="full"
                  onClick={() => {
                    if (role !== "owner") {
                      presentDeleteAlert({
                        header: "Bạn không thể xóa",
                        message:
                          "Bạn không có quyền xóa khi không phải chủ sở hữu",
                        buttons: ["OK!"],
                      });
                      return;
                    }
                    presentDeleteAlert({
                      header: "Xóa quy trình",
                      message: "Bạn có chắc muốn xóa?",
                      buttons: [
                        "Hủy",
                        {
                          text: "OK!",
                          handler: () => handleDeleteProcess(form.fields.id!),
                        },
                      ],
                      onDidDismiss: (e) => console.log("did dismiss"),
                    });
                  }}
                >
                  <IonLabel color="danger" className="ion-text-center">
                    Xóa
                  </IonLabel>
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
