import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonImg,
  IonListHeader,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { StageForm } from "../../../components/forms/StageForm";
import { storage } from "../../../config/firebase";
import { useStageForm } from "../../../hooks/useStageForm";
import { useSelector } from "../../../store";
import {
  findStageById,
  removeImage,
  uploadImages,
} from "../../../store/data/stageSlice";

interface StageUpdateProps {}

const StageUpdate: React.FC<StageUpdateProps> = () => {
  const { id } = useParams<{ id: string }>();
  const stage = useSelector((state) =>
    state.stages.all.find((i) => i.id === id)
  );
  const uid = useSelector((state) => state.user.uid);
  const form = useStageForm();
  const dispatch = useDispatch();
  const handleRemoveImage = (image: string) => {
    storage
      .refFromURL(image)
      .delete()
      .then(() => {
        dispatch(removeImage({ id, image }));
      });
  };

  useEffect(() => {
    if (!stage) dispatch(findStageById(id));
    if (stage) form.setFieldsValue(stage);

    if (!stage?.images) {
      storage
        .ref(`users/${uid}/stages/${id}`)
        .listAll()
        .then((snaps) => {
          Promise.all(snaps.items.map((pre) => pre.getDownloadURL())).then(
            (images) => {
              if (images.length > 0) dispatch(uploadImages({ id, images }));
            }
          );
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage]);

  return (
    <IonPage className="list-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tabs/diary"></IonBackButton>
          </IonButtons>
          <IonTitle>Sửa</IonTitle>
          <IonButtons slot="end">
            <IonButton type="submit" onClick={() => form.submit()}>
              Lưu
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol size="12" size-md="8">
              <StageForm form={form} />

              {stage?.images && (
                <IonCard className="list-card">
                  <IonCardContent>
                    <IonListHeader>
                      <b>Ảnh</b>
                    </IonListHeader>
                    <IonRow class="ion-justify-content-center">
                      {stage.images.map((image, index) => (
                        <IonCol sizeLg="6" size="12" key={index}>
                          <div className="image__container">
                            <IonImg className="cover" src={image} />
                            <div className="image__middle">
                              <IonButton
                                color="danger"
                                onClick={() => handleRemoveImage(image)}
                              >
                                Xóa
                              </IonButton>
                            </div>
                          </div>
                        </IonCol>
                      ))}
                    </IonRow>
                  </IonCardContent>
                </IonCard>
              )}
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default StageUpdate;
