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
  IonLabel,
  IonListHeader,
  IonPage,
  IonProgressBar,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { StageForm } from "../../../components/forms/StageForm";
import { storage } from "../../../config/firebase";
import { onUpload } from "../../../helpers/firebaseHelper";
import { useStageForm } from "../../../hooks/useStageForm";
import { useSelector } from "../../../store";
import {
  findStageById,
  removeImage,
  uploadImages,
} from "../../../store/data/stageSlice";
import { setLoading } from "../../../store/loading/loadingSlice";

interface StageUpdateProps {}

const StageUpdate: React.FC<StageUpdateProps> = () => {
  const { id } = useParams<{ id: string }>();
  const stage = useSelector((state) =>
    state.stages.all.find((i) => i.id === id)
  );
  const uid = useSelector((state) => state.user.uid);
  const { isLoading } = useSelector((state) => state.loading);
  const form = useStageForm();
  const dispatch = useDispatch();
  const imagesInput = useRef<HTMLInputElement>(null);
  const handleRemoveImage = (image: string) => {
    dispatch(setLoading(true));
    storage
      .refFromURL(image)
      .delete()
      .then(() => {
        dispatch(removeImage({ id, image }));
        dispatch(setLoading(false));
      });
  };
  const handleUploadImages = (files: FileList | null) => {
    if (files !== null && files.length > 0) {
      dispatch(setLoading(true));
      onUpload(Array.from(files), `users/${uid}/stages/${id}`).then(
        (images) => {
          dispatch(uploadImages({ id, images }));
          dispatch(setLoading(false));
        }
      );
    }
  };

  useEffect(() => {
    if (!stage) dispatch(findStageById(id));
    if (stage) form.setFieldsValue(stage);

    if (stage && !stage?.images) {
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
      <IonProgressBar
        className={isLoading ? "" : "ion-hide"}
        type="indeterminate"
      ></IonProgressBar>
      <IonContent>
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol size="12" size-md="8">
              <StageForm form={form} />

              <IonCard className="list-card">
                <IonCardContent>
                  <IonListHeader>
                    <IonLabel>
                      <b>Ảnh</b>
                    </IonLabel>
                    <IonButton
                      size="small"
                      onClick={() => imagesInput.current?.click()}
                    >
                      Thêm
                    </IonButton>
                  </IonListHeader>
                  <input
                    className="ion-hide"
                    onChange={(e) => handleUploadImages(e.target.files)}
                    ref={imagesInput}
                    type="file"
                    name="images"
                    accept="image/*"
                    multiple
                  ></input>
                  {stage?.images && (
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
                  )}
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default StageUpdate;
