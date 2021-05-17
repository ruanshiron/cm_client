import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import { v4 } from "uuid";
import { storage } from "../config/firebase";
// import { toast } from "../utils/toast";
// import { database, storage } from "../config/firebase";

export function onAuthStateChanged() {
  return new Promise((resolve) => {
    const unsubcribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        user.getIdTokenResult().then((idTokenResult) => {
          if (idTokenResult.claims.uid) {
            if (idTokenResult.claims.role) {
              firebase
                .firestore()
                .collection("users")
                .doc(idTokenResult.claims.uid)
                .collection(idTokenResult.claims.role)
                .doc(user.uid)
                .get()
                .then((doc) => {
                  if (doc.exists) {
                    const data = doc.data();
                    resolve({
                      displayName: data?.name,
                      id: user.uid,
                      uid: idTokenResult.claims.uid,
                      email: user.email,
                      emailVerified: user.emailVerified,
                      creationTime: user.metadata.creationTime,
                      role: idTokenResult.claims.role,
                      permissions: data?.permissions,
                    });
                  } else {
                    resolve(undefined);
                  }
                });
            } else {
              const userState = {
                displayName: user.displayName,
                id: user.uid,
                uid: idTokenResult.claims.uid,
                email: user.email,
                emailVerified: user.emailVerified,
                creationTime: user.metadata.creationTime,
                role: idTokenResult.claims.role,
                permissions: idTokenResult.claims.permissions,
              };
              resolve(userState);
            }
          } else {
            const userState = {
              displayName: user.displayName,
              id: user.uid,
              uid: user.uid,
              email: user.email,
              role: "owner",
              emailVerified: user.emailVerified,
              creationTime: user.metadata.creationTime,
            };
            resolve(userState);
          }
        });
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

export async function loginWithToken(token: string) {
  try {
    await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    await firebase.auth().signInWithCustomToken(token);
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
  window.location.replace("/");
}

export async function onUpload(files: File[], path: string = "tmp") {
  const promises = files.map(async (file) => {
    const snap = await firebase
      .storage()
      .ref()
      .child(`${path}/${file.name}`)
      .put(file);
    return await snap.ref.getDownloadURL();
  });
  return Promise.all(promises);
}
