import { database } from "../config/firebase";
import firebase from "firebase/app";
import _ from "lodash";
import { formatISO } from "date-fns";

const collection = "products";

const ref = (user: string) =>
  database.collection("users").doc(user).collection(collection);

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

export const getAllProducts = (user: string) => {
  return ref(user)
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

export const saveProduct = (user: string, param: Partial<Product>) => {
  const permittedParam = {
    ..._.pickBy(param, _.identity),
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  };
  return param.id
    ? ref(user).doc(param.id!).set(permittedParam)
    : ref(user).add(permittedParam);
};

export const destroyProduct = (user: string, id: string) => {
  return ref(user).doc(id).delete();
};

export const isInvalidProduct = (fields: Product) =>
  !fields.name.trim() || !fields.code.trim() || !fields.sizes.length;

export const cache = (user: string, productId: string, reportCache: ReportCache) => {
  return ref(user).doc(productId).update({
    report_cache: reportCache,
    updated: firebase.firestore.FieldValue.serverTimestamp(),
  });
};
