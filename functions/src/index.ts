import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//

exports.counters = require("./counters");
exports.metrics = require("./metrics");
exports.search = require("./search");

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
                      [before.processStatus]:
                        admin.firestore.FieldValue.increment(-before.quantity),
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
                      [after.processStatus]:
                        admin.firestore.FieldValue.increment(after.quantity),
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
                          [before.processStatus]:
                            admin.firestore.FieldValue.increment(
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
                          [after.processStatus]:
                            admin.firestore.FieldValue.increment(
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

export const updateStagesOnChangeProduct = functions.firestore
  .document("users/{userId}/products/{productId}")
  .onUpdate((change, context) => {
    const before = change.before.data();
    const after = change.after.data();

    if (after.name !== before.name) {
      return admin
        .firestore()
        .collection("users")
        .doc(context.params.userId)
        .collection("stages")
        .where("productId", "==", change.before.id)
        .get()
        .then((snap) => {
          snap.docs.forEach((doc) => {
            doc.ref.update({ productName: after.name });
          });
        });
    } else {
      return true;
    }
  });

export const updateStagesOnChangeWorkshop = functions.firestore
  .document("users/{userId}/workshops/{workshopId}")
  .onUpdate((change, context) => {
    const before = change.before.data();
    const after = change.after.data();

    if (after.name !== before.name) {
      return admin
        .firestore()
        .collection("users")
        .doc(context.params.userId)
        .collection("stages")
        .where("workshopId", "==", change.before.id)
        .get()
        .then((snap) => {
          snap.docs.forEach((doc) => {
            doc.ref.update({ workshopName: after.name });
          });
        });
    } else {
      return true;
    }
  });

export const updateStagesOnChangeProcess = functions.firestore
  .document("users/{userId}/processes/{processId}")
  .onUpdate((change, context) => {
    const before = change.before.data();
    const after = change.after.data();

    if (
      after.pending !== before.pending ||
      after.fulfilled !== before.fulfilled ||
      after.rejected !== before.rejected
    ) {
      return admin
        .firestore()
        .collection("users")
        .doc(context.params.userId)
        .collection("stages")
        .where("processId", "==", change.before.id)
        .get()
        .then((snap) => {
          snap.docs.forEach((doc) => {
            doc.ref.update({ processLabel: after[doc.data().processStatus] });
          });
        });
    } else {
      return true;
    }
  });

export const createFirstProcessOnCreateAccount = functions.auth
  .user()
  .onCreate((user) => {
    if (user.email) {
      return admin
        .firestore()
        .collection("users")
        .doc(user.uid)
        .collection("processes")
        .add({
          name: "hoàn thiện",
          pending: "nhận",
          fulfilled: "trả",
          rejected: "sửa",
        });
    } else {
      return "Not a user!";
    }
  });

export const createRequest = functions.firestore
  .document("users/{userId}/pending_stages/{pendingStageId}")
  .onCreate((snap, context) => {
    const TYPE: { [key: string]: string } = {
      added: "➕thêm",
      removed: "🗑xóa",
      modified: "📝sửa",
    };
    const { data, modifier, type } = snap.data();
    const notification = {
      title: `${modifier} đã tạo một yêu cầu`,
      body: `${modifier} đã ${TYPE[type]} [${data.date}, ${data.workshopName} ${data.processLabel} ${data.quantity} ${data.productName} ]`,
    };
    return admin
      .messaging()
      .sendToTopic(context.params.userId, { notification })
      .then((response) => {
        console.log("Successfully sent message:", response);
      })
      .catch((error) => {
        console.log("Error sending message:", error);
      });
  });

export const listUsers = functions.https.onCall(async (data, context) => {
  const uid = context.auth?.uid;
  const nextPageToken = data || undefined;

  if (!uid) {
    throw new Error("Yêu cầu đăng nhập!");
  } else {
    const listUsersResult = await admin.auth().listUsers(1000, nextPageToken);
    return listUsersResult;
  }
});

export const updateUser = functions.https.onCall(async (data, context) => {
  const { uid, disabled, email } = data || undefined;

  if (!context.auth?.uid) {
    throw new Error("Yêu cầu đăng nhập!");
  } else {
    const data: any = {};
    if (disabled) {
      data["disabled"] = true;
    }
    if (email) {
      data["email"] = email;
    }
    return admin.auth().updateUser(uid, data);
  }
});
