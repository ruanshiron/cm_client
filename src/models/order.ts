import { database } from "../config/firebase";
import firebase from "firebase/app";
import _ from "lodash";
import { formatISO } from "date-fns";

const collection = "orders";

const ref = (user: string) =>
  database.collection("users").doc(user).collection(collection);

export const initialOrder: Order = {
  date: formatISO(new Date(), { representation: "date" }),
  lines: [{ productId: "", productName: "", size: "", quantity: NaN }],
};

export const initialLine: Line = {
  productId: "",
  productName: "",
  size: "",
  quantity: NaN,
};

export interface Line {
  productId: string;
  productName: string;
  size: string;
  quantity: number;
}

export interface Order {
  id?: string;
  customerId?: string;
  lines: Line[];
  date: string;
  note?: string;
  createdAt?: any;
}

export const getAllOrders = (user: string, customerId: string) => {
  return ref(user)
    .doc(customerId)
    .collection("orders")
    .get()
    .then((snap) => {
      return snap.docs.map((doc) => ({
        id: doc.id,
        customerId,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate().toString(),
      }));
    });
};

export const saveOrder = (
  user: string,
  customerId: string,
  param: Partial<Order>
) => {
  const permittedParam = {
    ..._.pickBy(param, _.identity),
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  };
  return param.id
    ? ref(user)
        .doc(customerId)
        .collection("orders")
        .doc(param.id!)
        .set(permittedParam)
    : ref(user).doc(customerId).collection("orders").add(permittedParam);
};

export const destroyOrder = (user: string, customerId: string, id: string) => {
  return ref(user).doc(customerId).collection("orders").doc(id).delete();
};

export const isInvalidOrder = (fields: Order) => {
  const isInvalidLine = (line: Line) =>
    !line.productId.trim() ||
    !line.size.trim() ||
    !line.quantity ||
    !(line.quantity > 0);

  const isInvalidLines = (lines: Line[]) => {
    return lines.map((line) => isInvalidLine(line)).reduce((p, c) => p || c);
  };

  return !(fields.lines.length > 0) || isInvalidLines(fields.lines);
};
