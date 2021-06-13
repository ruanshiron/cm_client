import {
  IonBadge,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonModal,
  IonNote,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { add, close, resizeOutline } from "ionicons/icons";
import React, { useState } from "react";
import { useSizePackageForm } from "../../hooks/useSizePackageForm";
import { getAllSizePackages, SizePackage } from "../../models/sizePackage";
import { useSelector } from "../../store";
import SizePackageModal from "../modals/SizePackageModal";

const PACKAGES: SizePackage[] = [
  { name: "Số", data: ["1", "2", "3", "4", "5"] },
  { name: "Chữ", data: ["XS", "S", "M", "L", "XL", "XXL", "XXXL"] },
];

interface Props {
  values: string[];
  onConfirm: (values: string[]) => void;
}

const SizePackageSelectItem: React.FC<Props> = ({ values, onConfirm }) => {
  const { uid } = useSelector((state) => state.user);
  const [packages, setPackages] = useState<SizePackage[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const form = useSizePackageForm();
  const handleClickItem = (sizes: string[]) => {
    onConfirm(sizes);
    setShowModal(false);
  };
  const handleCancel = () => {
    setShowModal(false);
  };

  const handleAddSize = () => {
    form.reset();
    setShowFormModal(true);
  };

  const loadSizePackage = () => {
    getAllSizePackages(uid)
      .get()
      .then((snap) => {
        const pkg = snap.docs.map(
          (doc) => ({ id: doc.id, ...doc.data() } as SizePackage)
        );
        setPackages(pkg);
      });
  };

  const handleShowModal = () => {
    loadSizePackage();
    setShowModal(true);
  };
  return (
    <>
      <IonItem button onClick={handleShowModal}>
        <IonIcon slot="start" icon={resizeOutline} />
        <IonLabel color="medium">
          {values.length === 0
            ? "Chọn size"
            : values.map((item) => (
                <IonBadge style={{ marginRight: 4 }} key={item} color="darker">
                  {item}
                </IonBadge>
              ))}
        </IonLabel>
      </IonItem>
      <IonModal isOpen={showModal} onDidDismiss={handleCancel}>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton onClick={handleCancel}>
                <IonIcon slot="icon-only" icon={close} />
              </IonButton>
            </IonButtons>
            <IonTitle>Chọn size</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => setShowEditModal(true)}>
                Tùy chỉnh
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            {[...PACKAGES, ...packages].map((item, index) => (
              <IonItem
                key={index}
                button
                onClick={() => handleClickItem(item.data)}
              >
                <IonLabel>{item.name}</IonLabel>
                <IonNote>
                  <p>
                    {item.data.map((size) => (
                      <IonBadge key={size} style={{ marginRight: 4 }}>
                        {size}
                      </IonBadge>
                    ))}
                  </p>
                </IonNote>
              </IonItem>
            ))}
          </IonList>
        </IonContent>
      </IonModal>
      <IonModal
        isOpen={showEditModal}
        onDidDismiss={() => setShowEditModal(false)}
      >
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton onClick={() => setShowEditModal(false)}>
                <IonIcon slot="icon-only" icon={close} />
              </IonButton>
            </IonButtons>
            <IonTitle>Tùy chỉnh kích cỡ</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={handleAddSize}>
                <IonIcon slot="icon-only" icon={add} />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList lines="inset">
            <IonListHeader>
              <b>Mặc địch</b>
            </IonListHeader>
            {PACKAGES.map((item, index) => (
              <IonItem key={index}>
                <IonLabel>{item.name}</IonLabel>
                <IonNote>
                  <p>
                    {item.data.map((size) => (
                      <IonBadge key={size} style={{ marginRight: 4 }}>
                        {size}
                      </IonBadge>
                    ))}
                  </p>
                </IonNote>
              </IonItem>
            ))}
          </IonList>
          <IonList lines="inset">
            <IonListHeader>
              <b>Size bạn đã thêm</b>
            </IonListHeader>
            {packages.map((item, index) => (
              <IonItem
                key={index}
                button
                onClick={() => {
                  form.reset(item);
                  setShowFormModal(true);
                }}
              >
                <IonLabel>{item.name}</IonLabel>
                <IonNote>
                  <p>
                    {item.data.map((size) => (
                      <IonBadge key={size} style={{ marginRight: 4 }}>
                        {size}
                      </IonBadge>
                    ))}
                  </p>
                </IonNote>
              </IonItem>
            ))}
          </IonList>
        </IonContent>
      </IonModal>
      <SizePackageModal
        isOpen={showFormModal}
        onDidDismiss={() => {
          setShowFormModal(false);
          loadSizePackage();
        }}
        form={form}
      />
    </>
  );
};

export default SizePackageSelectItem;
