import { database } from "../config/firebase";
import firebase from "firebase/app";
import _ from "lodash";

const collection = "products";

export const initial: Skeleton = {
  name: "",
  code: "",
  sizes: [],
  note: "",
  processes: [],
};

interface ReportCache {
  from: any;
  to: any;
  fields: { name: string; value: number }[];
}
export interface Skeleton {
  id?: string;
  code: string;
  name: string;
  sizes: string[];
  note: string;
  processes: string[];
  report_cache?: ReportCache;
  updated?: any;
  createdAt?: any;
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
        updated: doc.data().updated?.toDate().toString(),
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
  !fields?.name?.trim() || !fields?.code?.trim() || !fields?.sizes?.length;

export const cache = (productId: string, reportCache: ReportCache) => {
  return database.collection(collection).doc(productId).update({
    report_cache: reportCache,
    updated: firebase.firestore.FieldValue.serverTimestamp(),
  });
};
