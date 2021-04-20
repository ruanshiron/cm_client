import { database } from "../config/firebase";
import firebase from "firebase/app";
import _ from "lodash";

const collection = "orders";

export const initialOrder: Order = {
  customer: "",
  lines: [{ product: "", size: "", quantity: NaN }],
};

export const initialLine: Line = { product: "", size: "", quantity: NaN };

export interface Line {
  product: string;
  size: string;
  quantity: number;
}

export interface Order {
  id?: string;
  customer: string;
  lines: Line[];
  note?: string;
  createdAt?: any;
}

export const getAllOrders = () => {
  return database
    .collection(collection)
    .get()
    .then((snap) => {
      return snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate().toString(),
      }));
    });
};

export const saveOrder = (param: Partial<Order>) => {
  const permittedParam = {
    ..._.pickBy(param, _.identity),
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  };
  return param.id
    ? database.collection(collection).doc(param.id!).set(permittedParam)
    : database.collection(collection).add(permittedParam);
};

export const destroyOrder = (id: string) => {
  return database.collection(collection).doc(id).delete();
};

export const isInvalidOrder = (fields: Order) => {
  const isInvalidLine = (line: Line) =>
    !line.product.trim() ||
    !line.size.trim() ||
    !line.quantity ||
    !(line.quantity > 0);

  const isInvalidLines = (lines: Line[]) => {
    return lines.map((line) => isInvalidLine(line)).reduce((p, c) => p || c);
  };

  return (
    !fields.customer.trim() ||
    !(fields.lines.length > 0) ||
    isInvalidLines(fields.lines)
  );
};
