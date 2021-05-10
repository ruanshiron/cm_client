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
  IonIcon,
  IonInput,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
  useIonModal,
} from "@ionic/react";
import copy from "copy-to-clipboard";
import {
  cashOutline,
  copyOutline,
  qrCodeOutline,
  refresh,
} from "ionicons/icons";
import QRCode from "qrcode.react";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { v4 } from "uuid";
import WorkshopForm from "../../../components/forms/WorkshopForm";
import AmountModal from "../../../components/modals/AmountModal";
import { useWorkshopForm } from "../../../hooks/useWorkshopForm";
import {
  addAmountToWorkshop,
  removeAmountFromWorkshop,
  Amount,
  saveWorkshop,
} from "../../../models/workshop";
import { useSelector } from "../../../store";
import { fetchAllProcesses } from "../../../store/data/processSlice";
import { fetchAllProducts } from "../../../store/data/productSlice";
import {
  addAmount,
  findWorkshopById,
  removeAmount,
  updateWorkshopCode,
} from "../../../store/data/workshopSlice";
import { toast } from "../../../utils/toast";

interface WorkshopUpdateProps {}

const WorkshopUpdate: React.FC<WorkshopUpdateProps> = () => {
  const { id } = useParams<{ id: string }>();
  const uid = useSelector((state) => state.user.uid);
  const dispatch = useDispatch();
  const workshop = useSelector((state) =>
    state.workshops.find((i) => i.id === id)
  );
  const products = useSelector((state) => state.products);
  const processes = useSelector((state) => state.processes);
  const form = useWorkshopForm(workshop);
  const handleSubmitAmount = (amount: Amount) => {
    if (workshop?.id)
      addAmountToWorkshop(uid, workshop.id, amount)
        .then((doc) => {
          dispatch(addAmount({ id: workshop.id!, amount }));
          dismiss();
        })
        .catch((e) => {
          toast("Có lỗi xảy ra, vui lòng thử lại!");
        });
  };
  const handleDeleteAmount = (amount: Amount, index: number) => {
    document.querySelector("ion-item-sliding")?.closeOpened();

    if (workshop?.id)
      removeAmountFromWorkshop(uid, workshop?.id, amount)
        .then((doc) => {
          dispatch(removeAmount({ id: workshop.id!, index }));
          dismiss();
        })
        .catch((e) => {
          toast("Có lỗi xảy ra, vui lòng thử lại!");
        });
  };
  const [present, dismiss] = useIonModal(AmountModal, {
    onDismiss: () => dismiss(),
    onSubmit: (amount: Amount) => handleSubmitAmount(amount),
    workshopName: workshop?.name,
    products: products,
    processes: processes,
  });
  const stringFromToDate = (from?: string, to?: string) => {
    return (
      (from?.substring(0, 10) || "trước") +
      " ~ " +
      (to?.substring(0, 10) || "nay")
    );
  };
  const handleUpdateCode = async () => {
    const code = v4();
    try {
      await saveWorkshop(uid, {
        ...workshop,
        code,
      });
      toast("Lưu thành công.");
      dispatch(updateWorkshopCode({ id, code }));
    } catch {
      toast("Có lỗi xảy ra, vui lòng thử lại.");
    }
  };
  const handleCopy = () => {
    copy(workshop?.code || "Hãy tạo mã trước!");
    toast(workshop?.code ? "Sao chép thành công!" : "Hãy tạo mã trước!");
  };

  useEffect(() => {
    if (workshop) form.setFieldsValue(workshop);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workshop]);

  useEffect(() => {
    if (products.length <= 0) dispatch(fetchAllProducts());
    if (processes.length <= 0) dispatch(fetchAllProcesses());
    if (!workshop) dispatch(findWorkshopById(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <IonPage className="list-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/workshops"></IonBackButton>
          </IonButtons>
          <IonTitle>Sửa thông tin</IonTitle>
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
              <WorkshopForm form={form} />
              <IonCard className="list-card">
                <IonItem>
                  <IonIcon icon={qrCodeOutline} slot="start"></IonIcon>
                  <IonInput
                    value={workshop?.code || "Hãy tạo code mới"}
                    readonly
                  />
                  <IonButtons slot="end">
                    <IonButton onClick={handleUpdateCode}>
                      <IonIcon slot="icon-only" icon={refresh}></IonIcon>
                    </IonButton>
                    <IonButton onClick={handleCopy}>
                      <IonIcon slot="icon-only" icon={copyOutline}></IonIcon>
                    </IonButton>
                  </IonButtons>
                </IonItem>
                {workshop?.code && (
                  <IonItem>
                    <QRCode
                      style={{ margin: "auto" }}
                      id="qrcode"
                      value={workshop?.code}
                      size={290}
                      level={"H"}
                      includeMargin={true}
                    />
                  </IonItem>
                )}
              </IonCard>
              <IonCard className="list-card">
                <IonCardContent>
                  <IonList style={{ borderTop: "none" }}>
                    <IonListHeader>
                      <IonLabel>Giá công</IonLabel>
                      <IonButton
                        className="ion-margin-end"
                        size="small"
                        onClick={() => present()}
                      >
                        Thêm
                      </IonButton>
                    </IonListHeader>

                    {workshop?.amounts.map((item, index) => (
                      <IonItemSliding key={index}>
                        <IonItem>
                          <IonIcon slot="start" icon={cashOutline} />
                          <IonLabel>
                            <b>{item.productName}</b>
                            <p>
                              {stringFromToDate(item.fromDate, item.toDate)}
                            </p>
                          </IonLabel>
                          <IonText color="dark">
                            {new Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(item.amount)}
                          </IonText>
                        </IonItem>
                        <IonItemOptions side="end">
                          <IonItemOption
                            color="danger"
                            expandable
                            onClick={() => handleDeleteAmount(item, index)}
                          >
                            Xóa
                          </IonItemOption>
                        </IonItemOptions>
                      </IonItemSliding>
                    ))}
                  </IonList>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default WorkshopUpdate;
