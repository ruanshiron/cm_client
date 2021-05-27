import { IonCard, IonCardContent, IonItem, IonLabel } from "@ionic/react";
import {
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
} from "@material-ui/core";
import { format } from "date-fns";
import React from "react";
import { useStyles } from "../../hooks/useStyles";
import { Stage } from "../../models/stage";

interface Props {
  stages: Stage[];
}

const StageTable: React.FC<Props> = ({ stages }) => {
  const classes = useStyles();
  return (
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
                <TableCell>Sản phẩm</TableCell>
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
                    {format(new Date(item.date), "dd/MM/yyyy")}
                  </TableCell>
                  <TableCell>{item.workshopName}</TableCell>
                  <TableCell>{item.productName}</TableCell>
                  <TableCell>{item.processLabel}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>
                    {item.productSize || item.productSizes?.join(", ")}
                  </TableCell>
                  <TableCell>{item.note}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </IonCardContent>
    </IonCard>
  );
};

export default StageTable;
