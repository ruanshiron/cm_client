import { database } from "../config/firebase";
import firebase from "firebase/app";
import _ from "lodash";

const collection = "customers";

export const initialCustomer: Customer = { name: "", phonenumber: "" };

const ref = (user: string) =>
  database.collection("users").doc(user).collection(collection);

export interface Customer {
  id?: string;
  name: string;
  phonenumber: string;
  createdAt?: any;
  code?: string;
}

export const getAllCustomers = (user: string) => {
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

export const saveCustomer = (user: string, param: Partial<Customer>) => {
  const permittedParam = {
    ..._.pickBy(param, _.identity),
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  };
  return param.id
    ? ref(user).doc(param.id!).set(permittedParam)
    : ref(user).add(permittedParam);
};

export const destroyCustomer = (user: string, id: string) => {
  return ref(user).doc(id).delete();
};

export const isInvalidCustomer = (fields: Customer) =>
  !fields?.name?.trim() || !fields?.phonenumber?.trim();
