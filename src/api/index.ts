import { database } from "../config/firebase";
import { Event, Product, Workshop } from "../models";
import _ from "lodash";

export const eventAPI = {
  get: () => {
    return new Promise((resolve, reject) => {
      database
        .collection("events")
        .get()
        .then((snap) => {
          resolve(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  save: (param: Partial<Event>) => {
    const permittedParam = _.pickBy(param, _.identity);
    return param.id
      ? database.collection("events").doc(param.id!).set(permittedParam)
      : database.collection("events").add(permittedParam);
  },
};

export const productAPI = {
  get: () => {
    return new Promise((resolve, reject) => {
      database
        .collection("products")
        .get()
        .then((snap) => {
          resolve(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  save: (param: Partial<Product>) => {
    const permittedParam = _.pickBy(param, _.identity);
    return param.id
      ? database.collection("products").doc(param.id!).set(permittedParam)
      : database.collection("products").add(permittedParam);
  },
};

export const workshopAPI = {
  get: () => {
    return new Promise((resolve, reject) => {
      database
        .collection("workshops")
        .get()
        .then((snap) => {
          resolve(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  save: (param: Partial<Workshop>) => {
    const permittedParam = _.pickBy(param, _.identity);
    return param.id
      ? database.collection("workshops").doc(param.id!).set(permittedParam)
      : database.collection("workshops").add(permittedParam);
  },
};
