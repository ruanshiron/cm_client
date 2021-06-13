import { database } from "../config/firebase";

export interface SizePackage {
  id?: string;
  name: string;
  data: string[];
}

const collection = "size_packages";

const ref = (user: string) =>
  database.collection("users").doc(user).collection(collection);

export const getAllSizePackages = (uid: string) => {
  return ref(uid);
};

export const updateSizePackage = (uid: string, sizePackage: SizePackage) => {
  return ref(uid).doc(sizePackage.id).set(sizePackage);
};

export const addSizePackage = (uid: string, sizePackage: SizePackage) => {
  return ref(uid).add(sizePackage);
};

export const deleteSizePackage = (uid: string, id: string) => {
  return ref(uid).doc(id).delete();
};
