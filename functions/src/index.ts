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

const isAbleToStatistic = (date: string, from?: string, to?: string) => {
  if (!from) {
    if (!to) {
      return true;
    } else {
      return new Date(to) >= new Date(date);
    }
  } else {
    if (!to) {
      return new Date(date) >= new Date(from);
    } else {
      return new Date(to) >= new Date(date) && new Date(date) >= new Date(from);
    }
  }
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

export const createStage = functions.firestore
  .document("users/{userId}/stages/{stageId}")
  .onCreate((snap, context) => {
    const data = snap.data();
    const productRef = admin
      .firestore()
      .doc("users/" + context.params.userId + "/products/" + data.productId);

    return admin.firestore().runTransaction((transaction) => {
      return transaction.get(productRef).then((productDoc) => {
        if (!productDoc.exists) {
          throw Error("Product Document does not exist!");
        }

        const productData = productDoc.data();
        if (productData)
          if (
            isAbleToStatistic(
              data.date,
              productData.statistic.from,
              productData.statistic.to
            )
          ) {
            transaction.set(
              productRef,
              {
                statistic: {
                  processes: {
                    [data.processId]: {
                      [data.processStatus]: admin.firestore.FieldValue.increment(
                        data.quantity
                      ),
                    },
                  },
                },
              },
              { merge: true }
            );
          }
      });
    });
  });

export const deleteStage = functions.firestore
  .document("users/{userId}/stages/{stageId}")
  .onDelete((snap, context) => {
    const data = snap.data();
    const productRef = admin
      .firestore()
      .doc("users/" + context.params.userId + "/products/" + data.productId);

    admin.firestore().runTransaction((transaction) => {
      return transaction.get(productRef).then((productDoc) => {
        if (!productDoc.exists) {
          throw Error("Product Document does not exist!");
        }

        const productData = productDoc.data();
        if (productData)
          if (
            isAbleToStatistic(
              data.date,
              productData.statistic.from,
              productData.statistic.to
            )
          ) {
            transaction.set(
              productRef,
              {
                statistic: {
                  processes: {
                    [data.processId]: {
                      [data.processStatus]: admin.firestore.FieldValue.increment(
                        -data.quantity
                      ),
                    },
                  },
                },
              },
              { merge: true }
            );
          }
      });
    });
  });

export const updateStage = functions.firestore
  .document("users/{userId}/stages/{stageId}")
  .onUpdate((snap, context) => {
    const before = snap.before.data();
    const after = snap.after.data();

    const beforeProductRef = admin
      .firestore()
      .doc("users/" + context.params.userId + "/products/" + before.productId);
    const afterProductRef = admin
      .firestore()
      .doc("users/" + context.params.userId + "/products/" + after.productId);

    admin.firestore().runTransaction((transaction) => {
      return transaction.get(afterProductRef).then((productDoc) => {
        if (!productDoc.exists) {
          throw Error("Product Document does not exist!");
        }

        const productData = productDoc.data();
        if (productData)
          if (
            isAbleToStatistic(
              after.date,
              productData.statistic.from,
              productData.statistic.to
            )
          ) {
            transaction
              .set(
                beforeProductRef,
                {
                  statistic: {
                    processes: {
                      [before.processId]: {
                        [before.processStatus]: admin.firestore.FieldValue.increment(
                          -before.quantity
                        ),
                      },
                    },
                  },
                },
                { merge: true }
              )
              .set(
                afterProductRef,
                {
                  statistic: {
                    processes: {
                      [after.processId]: {
                        [after.processStatus]: admin.firestore.FieldValue.increment(
                          after.quantity
                        ),
                      },
                    },
                  },
                },
                { merge: true }
              );
          }
      });
    });
  });
