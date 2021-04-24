import { database } from "../config/firebase";
import firebase from "firebase/app";
import _ from "lodash";

const collection = "workshops";

export const initialWorkshop: Workshop = { name: "", phonenumber: "" };

export interface Workshop {
  id?: string;
  name: string;
  phonenumber: string;
  code?: string;
  createdAt?: any;
}

export const getAllWorkshops = () => {
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

export const saveWorkshop = (param: Partial<Workshop>) => {
  const permittedParam = {
    ..._.pickBy(param, _.identity),
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  };
  return param.id
    ? database.collection(collection).doc(param.id!).set(permittedParam)
    : database.collection(collection).add(permittedParam);
};

export const destroyWorkshop = (id: string) => {
  return database.collection(collection).doc(id).delete();
};

export const isInvalidWorkshop = (fields: Workshop) =>
  !fields?.name?.trim() || !fields?.phonenumber?.trim();

export const findWorkshopByCode = async (code: string) => {
  try {
    const snaps = await database
      .collectionGroup(collection)
      .where("code", "==", code)
      .limit(1)
      .get();

    if (snaps.empty) {
      return undefined;
    } else {
      return { ...snaps.docs[0].data(), id: snaps.docs[0].id };
    }
  } catch (error) {
    return undefined;
  }
};
