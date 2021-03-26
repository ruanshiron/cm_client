import { useIonRouter } from "@ionic/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import * as Product from "../models/product";
import { useSelector } from "../store";
import { fetchProducts } from "../store/dataSlice";
import { toast } from "../utils/toast";

export const useProductForm = (product = Product.initial) => {
  const router = useIonRouter();
  const [fields, setFields] = useState<Product.Skeleton>(product);

  const dispatch = useDispatch();

  const processes = useSelector((state) => state.data.processes);

  const isInvalid = () =>
    !fields?.name?.trim() || !fields?.code?.trim() || !fields?.sizes?.length;

  const submit = async () => {
    if (isInvalid()) return;

    try {
      await Product.save(fields);
      setFields(product);
      router.goBack();
      toast("Lưu thành công.");
      // TODO: Do not fetch again
      dispatch(fetchProducts());
    } catch {
      toast("Có lỗi xảy ra, vui lòng thử lại.");
    }
  };

  const setFieldsValue = (e: Partial<Product.Skeleton>) => {
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
