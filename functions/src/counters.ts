import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

export const resetProductCounters = functions.https.onCall((data, context) => {
  const uid = context.auth?.uid;
  if (uid) {
    admin
      .firestore()
      .collection("users")
      .doc(uid)
      .collection("products")
      .get()
      .then((snap) => {
        const products_count = snap.docs.length;
        admin
          .firestore()
          .collection("users")
          .doc(uid)
          .set({ products_count }, { merge: true });
      });
  }
});

export const resetWorkshopCounters = functions.https.onCall((data, context) => {
  const uid = context.auth?.uid;
  if (uid) {
    admin
      .firestore()
      .collection("users")
      .doc(uid)
      .collection("workshops")
      .get()
      .then((snap) => {
        const workshops_count = snap.docs.length;
        admin
          .firestore()
          .collection("users")
          .doc(uid)
          .set({ workshops_count }, { merge: true });
      });
  }
});

export const resetEmployeeCounters = functions.https.onCall((data, context) => {
  const uid = context.auth?.uid;
  if (uid) {
    admin
      .firestore()
      .collection("users")
      .doc(uid)
      .collection("employees")
      .get()
      .then((snap) => {
        const employees_count = snap.docs.length;
        admin
          .firestore()
          .collection("users")
          .doc(uid)
          .set({ employees_count }, { merge: true });
      });
  }
});

export const resetCustomerCounters = functions.https.onCall((data, context) => {
  const uid = context.auth?.uid;
  if (uid) {
    admin
      .firestore()
      .collection("users")
      .doc(uid)
      .collection("customers")
      .get()
      .then((snap) => {
        const customers_count = snap.docs.length;
        admin
          .firestore()
          .collection("users")
          .doc(uid)
          .set({ customers_count }, { merge: true });
      });
  }
});

export const productCounters = functions.firestore
  .document("users/{userId}/products/{productId}")
  .onWrite((change, context) => {
    const userId = context.params.userId;

    if (!change.before.exists) {
      return admin
        .firestore()
        .collection("users")
        .doc(userId)
        .set(
          { products_count: admin.firestore.FieldValue.increment(1) },
          { merge: true }
        );
    }
    if (!change.after.exists) {
      return admin
        .firestore()
        .collection("users")
        .doc(userId)
        .set(
          { products_count: admin.firestore.FieldValue.increment(-1) },
          { merge: true }
        );
    }
    return null;
  });

export const workshopCounters = functions.firestore
  .document("users/{userId}/workshops/{workshopId}")
  .onWrite((change, context) => {
    const userId = context.params.userId;

    if (!change.before.exists) {
      return admin
        .firestore()
        .collection("users")
        .doc(userId)
        .set(
          { workshops_count: admin.firestore.FieldValue.increment(1) },
          { merge: true }
        );
    }
    if (!change.after.exists) {
      return admin
        .firestore()
        .collection("users")
        .doc(userId)
        .set(
          { workshops_count: admin.firestore.FieldValue.increment(-1) },
          { merge: true }
        );
    }
    return null;
  });

export const employeeCounters = functions.firestore
  .document("users/{userId}/employees/{employeeId}")
  .onWrite((change, context) => {
    const userId = context.params.userId;

    if (!change.before.exists) {
      return admin
        .firestore()
        .collection("users")
        .doc(userId)
        .set(
          { employees_count: admin.firestore.FieldValue.increment(1) },
          { merge: true }
        );
    }
    if (!change.after.exists) {
      return admin
        .firestore()
        .collection("users")
        .doc(userId)
        .set(
          { employees_count: admin.firestore.FieldValue.increment(-1) },
          { merge: true }
        );
    }
    return null;
  });

export const customerCounters = functions.firestore
  .document("users/{userId}/customers/{customerId}")
  .onWrite((change, context) => {
    const userId = context.params.userId;

    if (!change.before.exists) {
      return admin
        .firestore()
        .collection("users")
        .doc(userId)
        .set(
          { customers_count: admin.firestore.FieldValue.increment(1) },
          { merge: true }
        );
    }
    if (!change.after.exists) {
      return admin
        .firestore()
        .collection("users")
        .doc(userId)
        .set(
          { customers_count: admin.firestore.FieldValue.increment(-1) },
          { merge: true }
        );
    }
    return null;
  });
