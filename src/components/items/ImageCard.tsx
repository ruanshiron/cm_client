import { IonCard, IonImg, IonItem } from "@ionic/react";
import React, { useCallback, useEffect, useState } from "react";
import { storage } from "../../config/firebase";
import { useCamera } from "@ionic/react-hooks/camera";
import { CameraResultType } from "@capacitor/core";
import { toast } from "../../utils/toast";

interface Props {
  storageRef: string;
  uploadable?: boolean;
}
const ImageCard: React.FC<Props> = ({ storageRef, uploadable = false }) => {
  const { photo, getPhoto } = useCamera();
  const triggerCamera = useCallback(async () => {
    if (uploadable) {
      getPhoto({
        quality: 100,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
      }).then((photo) => {
        if (photo.dataUrl)
          storage
            .ref()
            .child(storageRef)
            .putString(photo.dataUrl, "data_url")
            .then(() => {
              toast("Đã tải ảnh lênÏ");
            });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getPhoto]);
  const [src, setSrc] = useState("");
  useEffect(() => {
    storage
      .ref()
      .child(storageRef)
      .getDownloadURL()
      .then((url) => {
        setSrc(url);
        console.log(url);
      })
      .catch(() => {
        setSrc("");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (src || uploadable)
    return (
      <IonCard onClick={triggerCamera} button={uploadable} style={{maxHeight: 500}}>
        {uploadable ? (
          photo ? (
            <IonImg src={photo.dataUrl}></IonImg>
          ) : src ? (
            <IonImg src={src}></IonImg>
          ) : (
            <IonItem>Máy ảnh </IonItem>
          )
        ) : (
          <IonImg src={src}></IonImg>
        )}
      </IonCard>
    );
  else return <></>;
};

export default ImageCard;
