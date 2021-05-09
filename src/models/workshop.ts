import { database } from "../config/firebase";
import firebase from "firebase/app";
import _ from "lodash";

const collection = "workshops";

const ref = (user: string) =>
  database.collection("users").doc(user).collection(collection);

export const initialWorkshop: Workshop = {
  name: "",
  phonenumber: "",
  amounts: [],
  code: "",
  statistic: {},
};

export interface Amount {
  productId: string;
  productName: string;
  processId: string;
  processName: string;
  amount: number;
  fromDate?: string;
  toDate?: string;
}

export interface Statistic {
  from?: string;
  to?: string;
  products?: {
    [key: string]: {
      name: string;
      code?: string;
      processes: {
        [key: string]: {
          pending: any;
          fulfilled: any;
          rejected: any;
        };
      };
    };
  };
}

export interface Workshop {
  id?: string;
  name: string;
  phonenumber: string;
  amounts: Amount[];
  code: string;
  statistic: Statistic;
  createdAt?: any;
}

export const getAllWorkshops = (user: string) => {
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

export const saveWorkshop = (user: string, param: Partial<Workshop>) => {
  const permittedParam = {
    ..._.pickBy(param, _.identity),
    amounts: param.amounts?.map((i) => _.pickBy(i, _.identity)) || [],
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  };

  return param.id
    ? ref(user).doc(param.id!).set(permittedParam)
    : ref(user).add(permittedParam);
};

export const findWorkshop = (user: string, id: string) => {
  return ref(user)
    .doc(id)
    .get()
    .then((doc) => {
      if (doc.exists) {
        const data = doc.data() as any;
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

export const destroyWorkshop = (user: string, id: string) => {
  return ref(user).doc(id).delete();
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

export const addAmountToWorkshop = (
  user: string,
  workshopId: string,
  amount: Amount
) => {
  const permitted = _.pickBy(amount, _.identity);
  return ref(user)
    .doc(workshopId)
    .update({
      amounts: firebase.firestore.FieldValue.arrayUnion(permitted),
    });
};

export const removeAmountFromWorkshop = (
  user: string,
  workshopId: string,
  amount: Amount
) => {
  const permitted = _.pickBy(amount, _.identity);
  return ref(user)
    .doc(workshopId)
    .update({
      amounts: firebase.firestore.FieldValue.arrayRemove(permitted),
    });
};
