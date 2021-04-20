import { database } from "../config/firebase";
import firebase from "firebase/app";
import _ from "lodash";

const collection = "processes";

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

export const getAllProcesses = () => {
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

export const saveProcess = (param: Partial<Process>) => {
  const permittedParam = {
    ..._.pickBy(param, _.identity),
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  };
  return param.id
    ? database.collection(collection).doc(param.id!).set(permittedParam)
    : database.collection(collection).add(permittedParam);
};

export const destroyProcess = (id: string) => {
  return database.collection(collection).doc(id).delete();
};

export const isInvalidProcess = (fields: Process) => !fields.name.trim();
