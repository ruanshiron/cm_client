import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//

const findCodeInCollection = async (collection: string, code: string) => {
  return await admin
    .firestore()
    .collectionGroup(collection)
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
};

export const createToken = functions.https.onCall(async (data, context) => {
  const code = data;

  const workshop = await findCodeInCollection("workshops", code);
  const customer = await findCodeInCollection("customers", code);
  const employee = await findCodeInCollection("employees", code);

  if (workshop) {
    const token = await admin
      .auth()
      .createCustomToken(workshop.id, { role: "workshop", ...workshop });
    return { token };
  } else if (customer) {
    const token = await admin
      .auth()
      .createCustomToken(customer.id, { role: "customer", ...customer });
    return { token };
  } else if (employee) {
    const token = await admin
      .auth()
      .createCustomToken(employee.id, { role: "employee", ...employee });
    return { token };
  } else {
    return { error: "Không tìm thấy mã!" };
  }
});
