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
  IonRow,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import { add } from "ionicons/icons";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ProductItem } from "../../../components/items/ProductItem";
import NoDataView from "../../../components/NoDataView";
import { useSelector } from "../../../store";
import { fetchAllProcesses } from "../../../store/data/processSlice";
import { fetchAllProducts } from "../../../store/data/productSlice";

interface ProductPageProps {}

const ProductPage: React.FC<ProductPageProps> = () => {
  const router = useIonRouter();
  const products = useSelector((state) => state.products);
  const { isLoading } = useSelector((state) => state.loading);
  const dispatch = useDispatch();
  useEffect(() => {
    if (products.length <= 0) {
      dispatch(fetchAllProducts());
      dispatch(fetchAllProcesses());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <IonPage className="list-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Sản phẩm</IonTitle>
          <IonButtons slot="end">
            <IonButton routerLink={router.routeInfo.pathname + "/create"}>
              <IonIcon slot="icon-only" icon={add}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen={true}>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Sản phẩm</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonGrid fixed>
          <IonRow className="ion-justify-content-center">
            {!isLoading && products.length === 0 && (
              <NoDataView addRouterLink={router.routeInfo.pathname + "/create"} />
            )}
            {products.map((product) => (
              <IonCol size="12" size-md="8" key={product.id}>
                <ProductItem product={product} />
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default ProductPage;
