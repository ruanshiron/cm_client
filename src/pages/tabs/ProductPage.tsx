import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonPage,
  IonPopover,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { ellipsisHorizontal, ellipsisVertical } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ProductItem } from "../../components/items/ProductItem";
import { ProductPagePopover } from "../../components/popovers/ProductPagePopover";
import { useSelector } from "../../store";
import { fetchProducts } from "../../store/dataSlice";
import "./ProductPage.scss";

interface ProductPageProps {}

const ProductPage: React.FC<ProductPageProps> = () => {
  const [showPopover, setShowPopover] = useState(false);
  const [popoverEvent, setPopoverEvent] = useState<any>();

  const presentPopover = (e: React.MouseEvent) => {
    setPopoverEvent(e.nativeEvent);
    setShowPopover(true);
  };

  const products = useSelector((state) => state.data.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <IonPage id="product-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Sản phẩm</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={presentPopover}>
              <IonIcon
                slot="icon-only"
                ios={ellipsisHorizontal}
                md={ellipsisVertical}
              ></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen={true}>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Speakers</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonGrid fixed>
          <IonRow>
            {products.map((product) => (
              <IonCol size="12" size-md="6" key={product.id}>
                <ProductItem data={product} />
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      </IonContent>
      <IonPopover
        isOpen={showPopover}
        event={popoverEvent}
        onDidDismiss={() => setShowPopover(false)}
      >
        <ProductPagePopover dismiss={() => setShowPopover(false)} />
      </IonPopover>
    </IonPage>
  );
};

export default ProductPage;
