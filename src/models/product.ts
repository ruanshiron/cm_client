import { database } from "../config/firebase";
import firebase from "firebase/app";
import _ from "lodash";

const collection = "products";

const ref = (user: string) =>
  database.collection("users").doc(user).collection(collection);

export const initialProduct: Product = {
  name: "",
  code: "",
  sizes: [],
  note: "",
  processes: [],
  statistic: {
    from: "",
    to: "",
  },
};

interface Statistic {
  from?: any;
  to?: any;
  for?: any;
  processes?: any;
}
export interface Product {
  id?: string;
  code: string;
  name: string;
  sizes: string[];
  note: string;
  processes: string[];
  statistic: Statistic;
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

export const findProduct = (user: string, id: string) => {
  return ref(user)
    .doc(id)
    .get()
    .then((doc) => {
      if (doc.exists) {
        const data = doc.data() as any;
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate().toString(),
        };
      } else {
        return null;
      }
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

export const cache = (
  user: string,
  productId: string,
  statistic: Statistic
) => {
  return ref(user).doc(productId).update({
    statistic: statistic,
    updated: firebase.firestore.FieldValue.serverTimestamp(),
  });
};
