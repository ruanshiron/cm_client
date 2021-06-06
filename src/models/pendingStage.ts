import { database } from "../config/firebase";
import { Stage } from "./stage";

export interface PendingStage {
  id?: string;
  type: string;
  modifier?: string;
  data: Stage;
}

const collection = "pending_stages";

const ref = (user: string) =>
  database.collection("users").doc(user).collection(collection);

export const getAllPendingStages = (uid: string) => {
  return ref(uid);
};

export const updatePendingStage = (uid: string, pendingStage: PendingStage) => {
  return ref(uid).doc(pendingStage.id).set(pendingStage);
};

export const addPendingStage = (uid: string, pendingStage: PendingStage) => {
  return ref(uid).add(pendingStage);
};

export const deletePendingStage = (uid: string, id: string) => {
  return ref(uid).doc(id).delete();
};
