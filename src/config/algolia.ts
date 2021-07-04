import algoliasearch from "algoliasearch";

export const algoliaClient = algoliasearch(
  "QVMGMMUNGS",
  "f72a7cd73d19ce99de72a1fd8e9bfbb5"
);

export const stageIndex = algoliaClient.initIndex("stages");
