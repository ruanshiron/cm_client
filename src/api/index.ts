import firebase from "firebase/app";
import { database } from "../config/firebase";
import { Base } from "../models";
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

export const eventAPI = useAPI("events");
export const productAPI = useAPI("products");
export const workshopAPI = useAPI("workshops");
export const customerAPI = useAPI("customers");
export const employeeAPI = useAPI("employees");
export const materialStoreAPI = useAPI("materialStores");
export const orderAPI = useAPI("orders");
export const processAPI = useAPI("processes");
