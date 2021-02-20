import { useIonRouter } from "@ionic/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { productAPI } from "../api";
import { Product } from "../models";
import { fetchProducts } from "../store/dataSlice";
import { toast } from "../utils/toast";

export const useProductForm = () => {
  const router = useIonRouter();
  const [fields, setFields] = useState<Product>();

  const dispatch = useDispatch();

  const submit = async () => {
    if (
      !fields?.name?.trim() ||
      !fields?.code?.trim() ||
      !fields?.sizes?.length
    )
      return;

    try {
      await productAPI.save(fields);
      setFields(undefined);
      router.back();
      toast("Lưu thành công.");
      // TODO: Do not fetch again
      dispatch(fetchProducts());
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
  };
};
