import { database } from "../config/firebase";
import firebase from "firebase/app";
import _ from "lodash";

const collection = "customers";

export const initialCustomer: Customer = { name: "", phonenumber: "" };

export interface Customer {
  id?: string;
  name: string;
  phonenumber: string;
  createdAt?: any;
}

export const getAllCustomers = () => {
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

export const saveCustomer = (param: Partial<Customer>) => {
  const permittedParam = {
    ..._.pickBy(param, _.identity),
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  };
  return param.id
    ? database.collection(collection).doc(param.id!).set(permittedParam)
    : database.collection(collection).add(permittedParam);
};

export const destroyCustomer = (id: string) => {
  return database.collection(collection).doc(id).delete();
};

export const isInvalidCustomer = (fields: Customer) =>
  !fields?.name?.trim() || !fields?.phonenumber?.trim();
