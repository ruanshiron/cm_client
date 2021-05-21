import { database } from "../config/firebase";
import firebase from "firebase/app";
import _ from "lodash";
import { formatISO } from "date-fns";

const collection = "stages";

const ref = (user: string) =>
  database.collection("users").doc(user).collection(collection);

export const initialStage: Stage = {
  quantity: NaN,
  productId: "",
  productName: "",
  productSize: "",
  workshopId: "",
  workshopName: "",
  processId: "",
  processStatus: "",
  processLabel: "",
  note: "",
  date: formatISO(new Date(), { representation: "date" }),
};

export interface Stage {
  id?: string;
  quantity: number;
  productId: string;
  productName: string;
  productSize: string;
  workshopId: string;
  workshopName: string;
  processId: string;
  processStatus: string;
  processLabel: string;
  date: string;
  note?: string;
  images?: string[];
  timestamp?: string;
}

export interface Group {
  name: string;
  events: Stage[];
}

export interface StageFilterOptions {
  from?: string;
  to?: string;
  workshopId?: string;
  productId?: string;
  productSize?: string;
  processId?: string;
  processStatus?: string;
  lastVisible?: any;
}

export const getStages = (user: string, options?: StageFilterOptions) => {
  let collection: firebase.firestore.Query<firebase.firestore.DocumentData> =
    ref(user).orderBy("date", "desc");
  if (options?.from)
    collection = collection.where("date", ">=", options.from.substring(0, 10));
  if (options?.to)
    collection = collection.where("date", "<=", options.to.substring(0, 10));
  if (options?.workshopId)
    collection = collection.where("workshopId", "==", options.workshopId);
  if (options?.productId)
    collection = collection.where("productId", "==", options.productId);
  if (options?.productSize)
    collection = collection.where("productSize", "==", options.productSize);
  if (options?.processId)
    collection = collection.where("processId", "==", options.processId);
  if (options?.processStatus)
    collection = collection.where("processStatus", "==", options.processStatus);
  if (options?.lastVisible)
    collection = collection.startAfter(options.lastVisible);

  console.log(options);

  return collection.limit(25).get();
};

export const getAllStages = (user: string, options?: StageFilterOptions) => {
  let collection: firebase.firestore.Query<firebase.firestore.DocumentData> =
    ref(user).orderBy("date", "desc");
  if (options?.from)
    collection = collection.where("date", ">=", options.from.substring(0, 10));
  if (options?.to)
    collection = collection.where("date", "<=", options.to.substring(0, 10));
  if (options?.workshopId)
    collection = collection.where("workshopId", "==", options.workshopId);
  if (options?.productId)
    collection = collection.where("productId", "==", options.productId);
  if (options?.productSize)
    collection = collection.where("productSize", "==", options.productSize);
  if (options?.processId)
    collection = collection.where("processId", "==", options.processId);
  if (options?.processStatus)
    collection = collection.where("processStatus", "==", options.processStatus);
  if (options?.lastVisible)
    collection = collection.startAfter(options.lastVisible);

  console.log(options);

  return collection.get();
};

export const findStage = (user: string, id: string) => {
  return ref(user)
    .doc(id)
    .get()
    .then((doc) => {
      if (doc.exists) {
        const data = doc.data() as any;
        return {
          id: doc.id,
          ...data,
          timestamp: data.timestamp?.toDate().toString(),
        };
      } else {
        return null;
      }
    });
};

export const saveStage = (user: string, param: Partial<Stage>) => {
  const permittedParam = {
    ..._.pickBy(param, _.identity),
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  };
  return param.id
    ? ref(user).doc(param.id!).set(permittedParam)
    : ref(user).add(permittedParam);
};

export const destroyStage = (user: string, id: string) => {
  return ref(user).doc(id).delete();
};

export const isInvalidStage = (fields: Stage) =>
  !fields.quantity ||
  !(fields.quantity > 0) ||
  !fields.productId.trim() ||
  !fields.productSize.trim() ||
  !fields.processId.trim() ||
  !fields.date ||
  !fields.workshopId.trim();

export const parseStage = (
  doc: firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>
) => {
  const data = doc.data() as any;
  return {
    id: doc.id,
    ...data,
    timestamp: data.timestamp?.toDate().toString(),
  } as Stage;
};
