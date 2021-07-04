import algoliasearch from "algoliasearch";

export const algoliaClient = algoliasearch(
  process.env.REACT_APP_ALGOLIA_APP_ID!,
  process.env.REACT_APP_ALGOLIA_API_KEY!
);

export const stageIndex = algoliaClient.initIndex("stages");
