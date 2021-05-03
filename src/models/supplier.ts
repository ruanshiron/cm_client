import { database } from "../config/firebase";
import firebase from "firebase/app";
import _ from "lodash";

const collection = "suppliers";

const ref = (user: string) =>
  database.collection("users").doc(user).collection(collection);

export const initialSupplier: Supplier = {
  name: "",
  phonenumber: "",
  types: [],
};

export interface Supplier {
  id?: string;
  name: string;
  phonenumber: string;
  types: string[];
  createdAt?: any;
}

export const getAllSuppliers = (user: string) => {
  return ref(user)
    .get()
    .then((snap) => {
      return snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate().toString(),
      }));
    });
};

export const saveSupplier = (user: string, param: Partial<Supplier>) => {
  const permittedParam = {
    ..._.pickBy(param, _.identity),
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  };
  return param.id
    ? ref(user).doc(param.id!).set(permittedParam)
    : ref(user).add(permittedParam);
};

export const destroySupplier = (user: string, id: string) => {
  return ref(user).doc(id).delete();
};

export const isInvalidSupplier = (fields: Supplier) =>
  !fields.name.trim() || !fields.phonenumber.trim();
