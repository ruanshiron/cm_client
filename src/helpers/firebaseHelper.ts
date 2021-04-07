import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
// import { toast } from "../utils/toast";
// import { database, storage } from "../config/firebase";

export function onAuthStateChanged() {
  return new Promise((resolve) => {
    const unsubcribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        resolve(user);
      } else {
        resolve(null);
      }
      unsubcribe();
    });
  });
}

export async function loginWithGoogle() {
  try {
    await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithRedirect(provider)
      .then(async (data: any) => {
        console.log(data.user);
      });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function loginWithEmail(email: string, password: string) {
  try {
    await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    await firebase.auth().signInWithEmailAndPassword(email, password);
    window.location.replace("/");
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function createUserWithEmail(email: string, password: string) {
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    window.location.replace("/");
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function signOut() {
  await firebase.auth().signOut();
}
