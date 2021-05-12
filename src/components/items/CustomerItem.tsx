import {
  IonAvatar,
  IonCard,
  IonCardContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonNote,
  useIonActionSheet,
  useIonRouter,
} from "@ionic/react";
import {
  close,
  createOutline,
  documentsOutline,
  information,
  shirtOutline,
} from "ionicons/icons";
import React from "react";
import { Customer } from "../../models/customer";
import { formatStringDate } from "../../utils/date";

export const CustomerItem: React.FC<{ data: Customer }> = ({ data }) => {
  const [present] = useIonActionSheet();
  const router = useIonRouter();
  const handleClick = () => {
    present({
      buttons: [
        {
          icon: createOutline,
          text: "Thêm đơn hàng",
          handler: () =>
            router.push("/customers/" + data.id + "/orders/create"),
        },
        {
          icon: documentsOutline,
          text: "Danh sách đơn hàng",
          handler: () => router.push("/customers/" + data.id + "/orders"),
        },
        {
          icon: information,
          text: "Thông tin chi tiết",
          handler: () => router.push("/customers/" + data.id),
        },
        {
          icon: close,
          text: "Thoát",
        },
      ],
    });
  };
  return (
    <IonCard button className="list-card" onClick={() => handleClick()}>
      <IonCardContent>
        <IonList style={{ border: "none" }}>
          <IonItem detail={false}>
            <IonAvatar slot="start">
              <img src="/assets/icon/icon.png" alt="Speaker profile pic" />
            </IonAvatar>
            <IonLabel>
              <h2>{data.name}</h2>
              <p>{data.phonenumber}</p>
            </IonLabel>
          </IonItem>
          {data.mostRecentOrder && (
            <>
              <IonListHeader>
                <b>
                  <small>
                    Đơn hàng gần đây nhất&nbsp;
                    {formatStringDate(data.mostRecentOrder?.date)}
                  </small>
                </b>
              </IonListHeader>
              {data.mostRecentOrder?.lines.map((line, index) => (
                <IonItem detail={false} key={index}>
                  <IonIcon icon={shirtOutline} slot="start" />
                  <IonLabel slot="start">
                    {line.productName}・{line.size}
                  </IonLabel>
                  <IonNote slot="end">
                    <p>{line.quantity}&nbsp;sp</p>
                  </IonNote>
                </IonItem>
              ))}
            </>
          )}
        </IonList>
      </IonCardContent>
    </IonCard>
  );
};
