import { database } from "../config/firebase";
import firebase from "firebase/app";
import _ from "lodash";

const collection = "employees";

export const initial: Skeleton = { name: "", phonenumber: "" };

export interface Skeleton {
  id?: string;
  name?: string;
  phonenumber?: string;
  createdAt?: any;
}

export const get = () => {
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

export const save = (param: Partial<Skeleton>) => {
  const permittedParam = {
    ..._.pickBy(param, _.identity),
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  };
  return param.id
    ? database.collection(collection).doc(param.id!).set(permittedParam)
    : database.collection(collection).add(permittedParam);
};

export const destroy = (id: string) => {
  return database.collection(collection).doc(id).delete();
};

export const permit = (fields: Skeleton) =>
  !fields?.name?.trim() || !fields?.phonenumber?.trim();
