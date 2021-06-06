import React, { useState } from "react";
import { IonFab, IonFabButton, IonIcon } from "@ionic/react";
import { add } from "ionicons/icons";
import { usePendingStageForm } from "../../hooks/usePendingStageForm";
import PendingStageModal from "../modals/PendingStageModal";
import { toast } from "../../utils/toast";
const PendingStageFab = () => {
  const [showModal, setShowModal] = useState(false);
  const form = usePendingStageForm();
  const handleSubmit = () => {
    form
      .add()
      .then(() => {
        toast("Lưu thành công");
        setShowModal(false);
      })
      .catch((error) => {
        toast(error.message);
      });
  };
  return (
    <>
      <IonFab vertical="bottom" horizontal="end" slot="fixed">
        <IonFabButton
          onClick={() => {
            setShowModal(true);
          }}
        >
          <IonIcon icon={add}></IonIcon>
        </IonFabButton>
      </IonFab>
      <PendingStageModal
        disableMore
        isOpen={showModal}
        onDismiss={() => setShowModal(false)}
        onSubmit={handleSubmit}
        form={form}
      />
    </>
  );
};

export default PendingStageFab;
