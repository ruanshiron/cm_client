import firebase from "firebase/app";
import { database } from "../config/firebase";
import { Base, Event, Product, Workshop } from "../models";
import _ from "lodash";

export const useAPI = (collection: string) => {
  const get = () => {
    return database
      .collection(collection)
      .get()
      .then((snap) =>
        snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate().toString(),
        }))
      );
  };

  const save = (param: Partial<Base>) => {
    const permittedParam = {
      ..._.pickBy(param, _.identity),
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    };
    console.log(permittedParam);
    return param.id
      ? database.collection(collection).doc(param.id!).set(permittedParam)
      : database.collection(collection).add(permittedParam);
  };

  return {
    get,
    save,
  };
};

export const eventAPI = {
  get: () => {
    return database
      .collection("events")
      .get()
      .then((snap) =>
        snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate().toString(),
        }))
      );
  },

  save: (param: Partial<Event>) => {
    const permittedParam = {
      ..._.pickBy(param, _.identity),
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    };
    console.log(permittedParam);
    return param.id
      ? database.collection("events").doc(param.id!).set(permittedParam)
      : database.collection("events").add(permittedParam);
  },
};

export const productAPI = {
  get: () => {
    return database
      .collection("products")
      .get()
      .then((snap) =>
        snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate().toString(),
        }))
      );
  },

  save: (param: Partial<Product>) => {
    const permittedParam = {
      ..._.pickBy(param, _.identity),
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    };
    return param.id
      ? database.collection("products").doc(param.id!).set(permittedParam)
      : database.collection("products").add(permittedParam);
  },
};

export const workshopAPI = {
  get: () => {
    return database
      .collection("workshops")
      .get()
      .then((snap) =>
        snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate().toString(),
        }))
      );
  },

  save: (param: Partial<Workshop>) => {
    const permittedParam = {
      ..._.pickBy(param, _.identity),
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    };
    return param.id
      ? database.collection("workshops").doc(param.id!).set(permittedParam)
      : database.collection("workshops").add(permittedParam);
  },
};

export const customerAPI = {
  get: () => {
    return database
      .collection("customers")
      .get()
      .then((snap) =>
        snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate().toString(),
        }))
      );
  },

  save: (param: Partial<Workshop>) => {
    const permittedParam = {
      ..._.pickBy(param, _.identity),
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    };
    return param.id
      ? database.collection("customers").doc(param.id!).set(permittedParam)
      : database.collection("customers").add(permittedParam);
  },
};
