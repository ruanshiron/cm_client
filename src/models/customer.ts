import { database } from "../config/firebase";
import firebase from "firebase/app";
import _ from "lodash";
import { Order } from "./order";

const collection = "customers";

export const initialCustomer: Customer = { name: "", phonenumber: "" };

const ref = (user: string) =>
  database.collection("users").doc(user).collection(collection);
interface Statistic {
  from?: string;
  to?: string;
}

export interface Customer {
  id?: string;
  name: string;
  phonenumber: string;
  mostRecentOrder?: Order;
  statistic?: Statistic;
  createdAt?: any;
  code?: string;
}

export const getAllCustomers = (user: string) => {
  return ref(user)
    .get()
    .then((snap) => {
      return snap.docs.map((doc) => {
        const data = doc.data();
        delete data?.mostRecentOrder?.createdAt;
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate().toString(),
        };
      });
    });
};

export const findCustomer = (user: string, id: string) => {
  return ref(user)
    .doc(id)
    .get()
    .then((doc) => {
      if (doc.exists) {
        const data = doc.data() as any;
        delete data!.mostRecentOrder.createdAt;
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
