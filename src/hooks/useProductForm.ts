import { useIonRouter } from "@ionic/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Product,
  initialProduct,
  isInvalidProduct,
  saveProduct,
} from "../models/product";
import { useSelector } from "../store";
import { fetchAllProducts } from "../store/data/productSlice";
import { toast } from "../utils/toast";

export const useProductForm = (product = initialProduct) => {
  const router = useIonRouter();
  const [fields, setFields] = useState<Product>(product);

  const dispatch = useDispatch();

  const processes = useSelector((state) => state.processes);

  const submit = async () => {
    if (isInvalidProduct(fields)) return;

    try {
      await saveProduct(fields);
      setFields(product);
      router.goBack();
      toast("Lưu thành công.");
      // TODO: Do not fetch again
      dispatch(fetchAllProducts());
    } catch {
      toast("Có lỗi xảy ra, vui lòng thử lại.");
    }
  };

  const setFieldsValue = (e: Partial<Product>) => {
    setFields((fields) => ({ ...fields, ...e }));
  };

  return {
    fields,
    setFieldsValue,
    submit,
    setFields,
    processes,
  };
};
