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
      .createCustomToken(workshop.id, { role: "workshops", ...workshop });
    return { token };
  } else if (customer) {
    const token = await admin
      .auth()
      .createCustomToken(customer.id, { role: "customers", ...customer });
    return { token };
  } else if (employee) {
    const token = await admin
      .auth()
      .createCustomToken(employee.id, { role: "employees", ...employee });
    return { token };
  } else {
    return { error: "Không tìm thấy mã!" };
  }
});

export const statisticProductOnChangeStage = functions.firestore
  .document("users/{userId}/stages/{stageId}")
  .onWrite((change, context) => {
    const before = change.before.data();
    const after = change.after.data();

    const beforeProductRef = before
      ? admin
          .firestore()
          .doc(
            "users/" + context.params.userId + "/products/" + before.productId
          )
      : undefined;

    const afterProductRef = after
      ? admin
          .firestore()
          .doc(
            "users/" + context.params.userId + "/products/" + after.productId
          )
      : undefined;

    return admin.firestore().runTransaction((transaction) => {
      return transaction
        .get((afterProductRef || beforeProductRef)!)
        .then((productDoc) => {
          if (!productDoc.exists) {
            throw Error("Product Document does not exist!");
          }
          const productData = productDoc.data()!;

          if (
            before &&
            beforeProductRef &&
            isAbleToStatistic(
              before.date,
              productData.statistic?.from,
              productData.statistic?.to
            )
          ) {
            transaction.set(
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
            );
          }
          if (
            after &&
            afterProductRef &&
            isAbleToStatistic(
              after.date,
              productData.statistic?.from,
              productData.statistic?.to
            )
          ) {
            transaction.set(
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

export const statisticWorkshopOnChangeStage = functions.firestore
  .document("users/{userId}/stages/{stageId}")
  .onWrite((change, context) => {
    const before = change.before.data();
    const after = change.after.data();

    const beforeWorkshopRef = before
      ? admin
          .firestore()
          .doc(
            "users/" + context.params.userId + "/workshops/" + before.workshopId
          )
      : undefined;

    const afterWorkshopRef = after
      ? admin
          .firestore()
          .doc(
            "users/" + context.params.userId + "/workshops/" + after.workshopId
          )
      : undefined;

    return admin.firestore().runTransaction((transaction) => {
      return transaction
        .get((beforeWorkshopRef || afterWorkshopRef)!)
        .then((doc) => {
          if (!doc.exists) {
            throw Error("Product Document does not exist!");
          }
          const productData = doc.data()!;

          if (
            before &&
            beforeWorkshopRef &&
            isAbleToStatistic(
              before.date,
              productData.statistic?.from,
              productData.statistic?.to
            )
          ) {
            transaction.set(
              beforeWorkshopRef,
              {
                statistic: {
                  products: {
                    [before.productId]: {
                      name: before.productName,
                      processes: {
                        [before.processId]: {
                          [before.processStatus]: admin.firestore.FieldValue.increment(
                            -before.quantity
                          ),
                        },
                      },
                    },
                  },
                },
              },
              { merge: true }
            );
          }
          if (
            after &&
            afterWorkshopRef &&
            isAbleToStatistic(
              after.date,
              productData.statistic?.from,
              productData.statistic?.to
            )
          ) {
            transaction.set(
              afterWorkshopRef,
              {
                statistic: {
                  products: {
                    [after.productId]: {
                      name: after.productName,
                      processes: {
                        [after.processId]: {
                          [after.processStatus]: admin.firestore.FieldValue.increment(
                            after.quantity
                          ),
                        },
                      },
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

export const updateMostRecentOrder = functions.firestore
  .document("users/{userId}/customers/{customerId}/orders/{orderId}")
  .onWrite((_change, context) => {
    const { customerId, userId } = context.params;
    const customerRef = admin
      .firestore()
      .collection("users")
      .doc(userId)
      .collection("customers")
      .doc(customerId);
    return customerRef
      .collection("orders")
      .orderBy("date", "desc")
      .limit(1)
      .get()
      .then((snaps) => {
        if (snaps.empty) return;
        const mostRecentOrder = snaps.docs[0].data();
        customerRef.set({ mostRecentOrder }, { merge: true });
      });
  });
