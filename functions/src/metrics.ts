import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

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

export const processes = functions.firestore
  .document("users/{userId}/stages/{stageId}")
  .onWrite((change, context) => {
    const before = change.before.data();
    const after = change.after.data();

    const beforeRef = before
      ? admin.firestore().doc("users/" + context.params.userId)
      : undefined;

    const afterRef = after
      ? admin.firestore().doc("users/" + context.params.userId)
      : undefined;

    return admin.firestore().runTransaction((transaction) => {
      return transaction.get((afterRef || beforeRef)!).then((doc) => {
        if (!doc.exists) {
          throw Error("Product Document does not exist!");
        }
        const data = doc.data()!;

        if (
          before &&
          beforeRef &&
          isAbleToStatistic(before.date, data.mertrics_from)
        ) {
          transaction.set(
            beforeRef,
            {
              metrics: {
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
          afterRef &&
          isAbleToStatistic(after.date, data.mertrics_from)
        ) {
          transaction.set(
            afterRef,
            {
              metrics: {
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

export const sellings = functions.firestore
  .document("users/{userId}/customers/{customerId}/orders/{orderId}")
  .onWrite((change, context) => {
    const before = change.before.data();
    const after = change.after.data();

    const beforeRef = before
      ? admin.firestore().doc("users/" + context.params.userId)
      : undefined;

    const afterRef = after
      ? admin.firestore().doc("users/" + context.params.userId)
      : undefined;

    return admin.firestore().runTransaction((transaction) => {
      return transaction.get((afterRef || beforeRef)!).then((doc) => {
        if (!doc.exists) {
          throw Error("Document does not exist!");
        }
        const data = doc.data()!;

        if (
          before &&
          beforeRef &&
          isAbleToStatistic(before.date, data.mertrics_from)
        ) {
          before.lines.forEach((item: any) => {
            transaction.set(
              beforeRef,
              {
                metrics: {
                  sellings: {
                    [item.productId]: {
                      name: item.productName || "",
                      value: admin.firestore.FieldValue.increment(
                        -item.quantity
                      ),
                    },
                  },
                },
              },
              { merge: true }
            );
          });
        }
        if (
          after &&
          afterRef &&
          isAbleToStatistic(after.date, data.mertrics_from)
        ) {
          after.lines.forEach((item: any) => {
            transaction.set(
              afterRef,
              {
                metrics: {
                  sellings: {
                    [item.productId]: {
                      name: item.productName || "",
                      value: admin.firestore.FieldValue.increment(
                        item.quantity
                      ),
                    },
                  },
                },
              },
              { merge: true }
            );
          });
        }
      });
    });
  });
