import { database } from "../config/firebase";
import firebase from "firebase/app";
import _ from "lodash";

const collection = "employees";

const ref = (user: string) =>
  database.collection("users").doc(user).collection(collection);

export const initialEmployee: Employee = { name: "", phonenumber: "" };
export interface Employee {
  id?: string;
  name: string;
  phonenumber: string;
  createdAt?: any;
  code?: string;
}

export const getAllEmployees = (user: string) => {
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

export const saveEmployee = (user: string, param: Partial<Employee>) => {
  const permittedParam = {
    ..._.pickBy(param, _.identity),
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  };
  return param.id
    ? ref(user).doc(param.id!).set(permittedParam)
    : ref(user).add(permittedParam);
};

export const destroyEmployee = (user: string, id: string) => {
  return ref(user).doc(id).delete();
};

export const isInvalidEmployee = (fields: Employee) =>
  !fields.name.trim() || !fields.phonenumber.trim();
