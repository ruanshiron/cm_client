import { database } from "../config/firebase";
import firebase from "firebase/app";
import _ from "lodash";

const collection = "processes";

const ref = (user: string) =>
  database.collection("users").doc(user).collection(collection);

export const ProcessEnum: { [key: string]: string } = {
  pending: "đang ",
  fulfilled: "đã ",
  rejected: "lỗi ",
};

export const initialProcess: Process = { name: "" };

export interface Process {
  id?: string;
  createdAt?: any;
  name: string;
  rejected?: string;
  fulfilled?: string;
  pending?: string;
}

export const getAllProcesses = (user: string) => {
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

export const saveProcess = (user: string, param: Partial<Process>) => {
  const permittedParam = {
    ..._.pickBy(param, _.identity),
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  };
  return param.id
    ? ref(user).doc(param.id!).set(permittedParam)
    : ref(user).add(permittedParam);
};

export const destroyProcess = (user: string, id: string) => {
  return ref(user).doc(id).delete();
};

export const isInvalidProcess = (fields: Process) => !fields.name.trim();
