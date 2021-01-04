import { AppDispatch } from "..";
import { database } from "../../config/firebase";
import { Product } from "../../models/Report";
import { DispatchObject } from "../../utils/types";

export const ReportActionTypes = {
  ADD_PRODUCT: "add_product",
  GET_PRODUCTS_STARTED: "get_products_started",
  GET_PRODUCTS_SUCCESS: "get_products_success",
  GET_PRODUCTS_FAILURE: "get_products_failure",
};

export const addProduct = (product: Product) => ({
  type: ReportActionTypes.ADD_PRODUCT,
  product,
});

export const getProducts = () => {
  return (dispatch: AppDispatch) => {
    dispatch(getProductsStarted());
    database
      .collection("products")
      .get()
      .then((snap) => {
        dispatch(
          getProductsSuccess(
            snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
          )
        );
      })
      .catch((snap) => {
        dispatch(getProductsFailure());
      });
  };
};

const getProductsStarted = () => ({
  type: ReportActionTypes.GET_PRODUCTS_STARTED,
});

const getProductsSuccess = (products: Product[]) => ({
  type: ReportActionTypes.GET_PRODUCTS_SUCCESS,
  payload: [...products],
});

const getProductsFailure = () => ({
  type: ReportActionTypes.GET_PRODUCTS_FAILURE,
});

export type ReportActions = DispatchObject;
