import { database } from "../config/firebase";
import firebase from "firebase/app";
import _ from "lodash";

const collection = "suppliers";

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

export const getAllSuppliers = () => {
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

export const saveSupplier = (param: Partial<Supplier>) => {
  const permittedParam = {
    ..._.pickBy(param, _.identity),
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  };
  return param.id
    ? database.collection(collection).doc(param.id!).set(permittedParam)
    : database.collection(collection).add(permittedParam);
};

export const destroySupplier = (id: string) => {
  return database.collection(collection).doc(id).delete();
};

export const isInvalidSupplier = (fields: Supplier) =>
  !fields.name.trim() || !fields.phonenumber.trim();
