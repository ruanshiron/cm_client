import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import algoliasearch from "algoliasearch";

const algoliaClient = algoliasearch(
  functions.config().algolia.appid,
  functions.config().algolia.apikey
);

export const syncAllStages = functions.https.onRequest((_req, res) => {
  const arr: any[] = [];

  return admin
    .firestore()
    .collectionGroup("stages")
    .get()
    .then((docs) => {
      docs.forEach((doc) => {
        const data = doc.data();
        const dataSearch = {
          ...data,
          quantity: data?.quantity + "",
          uid: doc.ref.parent.parent?.id,
          objectID: doc.id,
        };
        arr.push(dataSearch);
      });

      const index = algoliaClient.initIndex("stages");
      index
        .saveObjects(arr)
        .then((data) => {
          res.status(200).send(data);
        })
        .catch(() => {
          res.status(500);
        });
    });
});

export const onStageCreated = functions.firestore
  .document("users/{userId}/stages/{stageId}")
  .onWrite((change, context) => {
    const userId = context.params.userId;

    if (!change.after.exists) {
      const index = algoliaClient.initIndex("stages");
      return index.deleteObject(change.before.id);
    } else {
      const data = change.after.data();
      const dataSearch = {
        ...data,
        quantity: data?.quantity + "",
        uid: userId,
        objectID: change.after.id,
      };
      const index = algoliaClient.initIndex("stages");
      return index.saveObject(dataSearch!);
    }
  });
