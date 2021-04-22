import { database } from "../config/firebase";
import firebase from "firebase/app";
import _ from "lodash";
import { formatISO } from "date-fns";

const collection = "products";

export const initialProduct: Product = {
  name: "",
  code: "",
  sizes: [],
  note: "",
  processes: [],
  report_cache: {
    from: formatISO(new Date(), { representation: "date" }),
    to: null,
  },
};

interface ReportCache {
  from?: any;
  to?: any;
  for?: any;
  fields?: { name: string; value: number }[];
}
export interface Product {
  id?: string;
  code: string;
  name: string;
  sizes: string[];
  note: string;
  processes: string[];
  report_cache: ReportCache;
  updated?: any;
  createdAt?: any;
}

export const getAllProducts = () => {
  return database
    .collection(collection)
    .get()
    .then((snap) => {
      return snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate().toString(),
        report_cache: {},
      }));
    });
};

export const saveProduct = (param: Partial<Product>) => {
  const permittedParam = {
    ..._.pickBy(param, _.identity),
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  };
  return param.id
    ? database.collection(collection).doc(param.id!).set(permittedParam)
    : database.collection(collection).add(permittedParam);
};

export const destroyProduct = (id: string) => {
  return database.collection(collection).doc(id).delete();
};

export const isInvalidProduct = (fields: Product) =>
  !fields.name.trim() || !fields.code.trim() || !fields.sizes.length;

export const cache = (productId: string, reportCache: ReportCache) => {
  return database.collection(collection).doc(productId).update({
    report_cache: reportCache,
    updated: firebase.firestore.FieldValue.serverTimestamp(),
  });
};
