import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const createToken = functions.https.onCall(async (data, context) => {
  const code = data;
  const workshop = await admin
    .firestore()
    .collectionGroup("workshops")
    .where("code", "==", code)
    .limit(1)
    .get()
    .then((snaps) => {
      if (snaps.empty) {
        return undefined;
      } else {
        const { id, ref } = snaps.docs[0];
        const data = snaps.docs[0].data();
        const uid = ref.parent.parent?.id;
        return { ...data, uid, id };
      }
    });
  if (workshop) {
    const token = await admin
      .auth()
      .createCustomToken(workshop.id, { role: "workshop", ...workshop });
    return { token };
  } else return { error: "Không tìm thấy mã!" };
});
