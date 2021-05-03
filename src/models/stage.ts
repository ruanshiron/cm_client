import { database } from "../config/firebase";
import firebase from "firebase/app";
import _ from "lodash";
import { formatISO } from "date-fns";

const collection = "stages2";

const ref = (user: string) =>
  database.collection("users").doc(user).collection(collection);

export const initialStage: Stage = {
  quantity: NaN,
  productId: "",
  productName: "",
  productSize: "",
  workshopId: "",
  workshopName: "",
  processId: "",
  processStatus: "",
  processLabel: "",
  date: formatISO(new Date(), { representation: "date" }),
};

export interface Stage {
  id?: string;
  quantity: number;
  productId: string;
  productName: string;
  productSize: string;
  workshopId: string;
  workshopName: string;
  processId: string;
  processStatus: string;
  processLabel: string;
  date: string;
  note?: string;
  timestamp?: string;
}
export interface Stage2 {
  id?: string;
  quantity: number;
  product: string;
  size: string;
  process: string;
  workshop: string;
  date: string;
  note?: string;
  created?: string;
  updated?: string;
}

export interface Group {
  name: string;
  events: Stage[];
}

export const getAllStages = (user: string) => {
  return ref(user)
    .get()
    .then((snap) => {
      return snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp?.toDate().toString(),
      }));
    });
};

export const saveStage = (user: string, param: Partial<Stage>) => {
  const permittedParam = {
    ..._.pickBy(param, _.identity),
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  };
  return param.id
    ? ref(user).doc(param.id!).set(permittedParam)
    : ref(user).add(permittedParam);
};

export const destroyStage = (user: string, id: string) => {
  return ref(user).doc(id).delete();
};

export const isInvalidStage = (fields: Stage) =>
  !fields.quantity ||
  !(fields.quantity > 0) ||
  !fields.productId.trim() ||
  !fields.productSize.trim() ||
  !fields.processId.trim() ||
  !fields.date ||
  !fields.workshopId.trim();
