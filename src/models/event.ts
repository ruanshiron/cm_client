import { database } from "../config/firebase";
import firebase from "firebase/app";
import _ from "lodash";

const collection = "events";

export const initial: Skeleton = {
  date: new Date().toISOString().substring(0, 10),
};


export interface Skeleton {
  id?: string;
  createdAt?: any;
  quantity?: number;
  product?: string;
  size?: string;
  process?: string;
  workshop?: string;
  date?: string;
  note?: string;
}


export interface Group {
  name: string;
  events: Skeleton[];
}

export const get = () => {
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

export const save = (param: Partial<Skeleton>) => {
  const permittedParam = {
    ..._.pickBy(param, _.identity),
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  };
  return param.id
    ? database.collection(collection).doc(param.id!).set(permittedParam)
    : database.collection(collection).add(permittedParam);
};

export const destroy = (id: string) => {
  return database.collection(collection).doc(id).delete();
};

export const permit = (fields: Skeleton) =>
  !fields?.quantity ||
  !(fields?.quantity > 0) ||
  !fields?.product?.trim() ||
  !fields?.size?.trim() ||
  !fields?.process?.trim() ||
  !fields?.date ||
  !fields?.workshop?.trim();
