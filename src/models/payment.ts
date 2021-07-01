import { database } from "../config/firebase";
import firebase from "firebase/app";

const ref = (user: string, workshopId: string) =>
  database
    .collection("users")
    .doc(user)
    .collection("workshops")
    .doc(workshopId)
    .collection("payments");

export interface Payment {
  uid?: string;
  id?: string;
  note: string;
  amount: number;
  date: string;
}

export const getAllPayments = (
  uid: string,
  workshopId: string,
  from?: string,
  to?: string
) => {
  let collection: firebase.firestore.Query<firebase.firestore.DocumentData> =
    ref(uid, workshopId).orderBy("date", "desc");
  if (from) collection = collection.where("date", ">=", from.substring(0, 10));
  if (to) collection = collection.where("date", "<=", to.substring(0, 10));
  return collection.get().then((snaps) => {
    return snaps.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Payment));
  });
};

export const addPayment = (
  uid: string,
  workshopId: string,
  payment: Payment
) => {
  return ref(uid, workshopId).add(payment);
};

export const updatePayment = (
  uid: string,
  workshopId: string,
  paymentId: string,
  payment: Payment
) => {
  return ref(uid, workshopId).doc(paymentId).update(payment);
};

export const destroyPayment = (
  uid: string,
  workshopId: string,
  paymentId: string
) => {
  return ref(uid, workshopId).doc(paymentId).delete();
};
