import { useIonRouter } from "@ionic/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Product } from "../models";
import { saveProduct } from "../store/data/data.actions";

export const useProductForm = () => {
  const router = useIonRouter();
  const [fields, setFields] = useState<Product>();

  const dispatch = useDispatch();

  const submit = () => {
    if (
      !fields?.name?.trim() ||
      !fields?.code?.trim() ||
      !fields?.sizes?.length
    )
      return;

    dispatch(
      saveProduct(fields, () => {
        setFields(undefined);
        router.back();
      })
    );
  };

  const setFieldsValue = (e: Partial<Product>) => {
    setFields((fields) => ({ ...fields, ...e }));
  };

  return {
    fields,
    setFieldsValue,
    submit,
  };
};
