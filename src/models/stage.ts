import { database } from "../config/firebase";
import firebase from "firebase/app";
import _ from "lodash";
import { formatISO } from "date-fns";

const collection = "events";

export const initialStage: Stage = {
  quantity: NaN,
  product: "",
  size: "",
  process: "",
  workshop: "",
  date: formatISO(new Date(), { representation: "date" }),
};

export interface Stage {
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

export const getAllStages = () => {
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

export const saveStage = (param: Partial<Stage>) => {
  const permittedParam = {
    ..._.pickBy(param, _.identity),
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  };
  return param.id
    ? database.collection(collection).doc(param.id!).set(permittedParam)
    : database.collection(collection).add(permittedParam);
};

export const destroyStage = (id: string) => {
  return database.collection(collection).doc(id).delete();
};

export const isInvalidStage = (fields: Stage) =>
  !fields.quantity ||
  !(fields.quantity > 0) ||
  !fields.product.trim() ||
  !fields.size.trim() ||
  !fields.process.trim() ||
  !fields.date ||
  !fields.workshop.trim();
