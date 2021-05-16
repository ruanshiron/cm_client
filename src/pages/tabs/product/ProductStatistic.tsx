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
  IonItem,
  IonLabel,
  IonLoading,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  useIonAlert,
} from "@ionic/react";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useSelector } from "../../../store";
import { saveOutline } from "ionicons/icons";
import { useDispatch } from "react-redux";
import {
  findProductById,
  statisticHarderSelector,
  updateFromDate,
  updateToDate,
} from "../../../store/data/productSlice";
import { fetchAllProcesses } from "../../../store/data/processSlice";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { useStyles } from "../../../hooks/useStyles";
import { fetchAllStages } from "../../../store/data/stageSlice";
import { useProductForm } from "../../../hooks/useProductForm";
import { Product } from "../../../models/product";
import { toast } from "../../../utils/toast";
import Datetime from "../../../components/statistics/Datetime";
import ProductSummary from "../../../components/statistics/ProductSummary";

interface ProductStatisticProps {}

export const ProductStatistic: React.FC<ProductStatisticProps> = () => {
  const [presentAlert] = useIonAlert();
  const classes = useStyles();
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const form = useProductForm();
  const loading = useSelector((state) => state.loading.isLoading);
  const product = useSelector((state) =>
    state.products.find((item) => item.id === id)
  );
  const processes = useSelector((state) =>
    state.processes.filter((item) => product?.processes?.includes(item.id!))
  );
  const { statistic, stages, processesParam } = useSelector((state) =>
    statisticHarderSelector(
      state,
      id,
      product?.statistic?.from,
      product?.statistic?.to
    )
  );
  useEffect(() => {
    if (!product) dispatch(findProductById(id));
  }, [dispatch, id, product]);
  useEffect(() => {
    if (processes.length <= 0) dispatch(fetchAllProcesses());
    if (stages.length <= 0) dispatch(fetchAllStages());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);
  const handleSaveStatistic = () => {
    if (product) {
      presentAlert({
        header: "Lưu thống kê hiện tại",
        message:
          "Các lựa chọn của bạn sẽ được lưu lại, và các thống kê cũng sẽ thay đổi!",
        buttons: [
          "Hủy",
          {
            text: "OK!",
            handler: () => {
              const fields: Product = {
                ...product,
                statistic: { ...product?.statistic, processes: processesParam },
              };
              form.submit(fields);
            },
          },
        ],
      });
    } else {
      toast("Không tìm thấy sản phẩm này!");
    }
  };
  return (
    <IonPage className="list-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tabs/product" />
          </IonButtons>
          <IonTitle>
            {product?.name}・{product?.code}
          </IonTitle>
          <IonButtons slot="end">
            <IonButton title="Lưu" onClick={() => handleSaveStatistic()}>
              <IonIcon slot="icon-only" icon={saveOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonLoading isOpen={!!(loading && !product)} />
            <IonCol size="12" size-md="8">
              <Datetime
                fromValue={product?.statistic?.from}
                toValue={product?.statistic?.to}
                onChangeFrom={(e) => {
                  dispatch(
                    updateFromDate({
                      id,
                      from: e.detail.value || "",
                    })
                  );
                }}
                onChangeTo={(e) => {
                  dispatch(
                    updateToDate({
                      id,
                      to: e.detail.value || "",
                    })
                  );
                }}
                onCancelFrom={() => {
                  dispatch(
                    updateFromDate({
                      id,
                      from: "",
                    })
                  );
                }}
                onCancelTo={() => {
                  dispatch(
                    updateFromDate({
                      id,
                      to: "",
                    })
                  );
                }}
              />
              <ProductSummary product={product} statistic={statistic} />
              <IonCard className="list-card">
                <IonCardContent>
                  <IonItem lines="none">
                    <IonLabel>
                      <u>
                        <b>Bảng chi tiết</b>
                      </u>
                    </IonLabel>
                  </IonItem>
                  <TableContainer component={Paper}>
                    <Table className={classes.table}>
                      <TableHead>
                        <TableRow>
                          <TableCell>Ngày</TableCell>
                          <TableCell>Xưởng</TableCell>
                          <TableCell>Quy trình</TableCell>
                          <TableCell>Số lượng&nbsp;(sản phẩm)</TableCell>
                          <TableCell>Kích cỡ</TableCell>
                          <TableCell>Ghi chú</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {stages.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell component="th" scope="row">
                              {item.date}
                            </TableCell>
                            <TableCell>{item.workshopName}</TableCell>
                            <TableCell>{item.processLabel}</TableCell>
                            <TableCell>{item.quantity}</TableCell>
                            <TableCell>{item.productSize}</TableCell>
                            <TableCell>{item.note}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};
