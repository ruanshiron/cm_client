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
import { addProduct, updateProduct } from "../store/data/productSlice";
import { toast } from "../utils/toast";

export const useProductForm = (product = initialProduct) => {
  const router = useIonRouter();
  const [fields, setFields] = useState<Product>(product);
  const uid = useSelector((state) => state.user.uid);

  const dispatch = useDispatch();

  const [submitted, setSubmitted] = useState(false);

  const processes = useSelector((state) => state.processes);

  const submit = async () => {
    if (submitted) return;
    if (isInvalidProduct(fields)) return;
    setSubmitted(true);
    try {
      const newProduct = (await saveProduct(uid, fields)) as any;
      setFields(product);
      router.goBack();
      toast("Lưu thành công.");
      setSubmitted(false);
      // TODO: Do not fetch again
      if (fields.id) {
        dispatch(updateProduct(fields));
      } else {
        dispatch(addProduct({ ...fields, id: newProduct.id }));
      }
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
