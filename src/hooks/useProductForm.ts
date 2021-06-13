import { useIonRouter } from "@ionic/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  Product,
  initialProduct,
  isInvalidProduct,
  saveProduct,
} from "../models/product";
import { useSelector } from "../store";
import { fetchAllProcesses } from "../store/data/processSlice";
import { addProduct, updateProduct } from "../store/data/productSlice";
import { toast } from "../utils/toast";

export const useProductForm = (product = initialProduct) => {
  const router = useIonRouter();
  const [fields, setFields] = useState<Product>(product);
  const uid = useSelector((state) => state.user.uid);

  const dispatch = useDispatch();

  const [submitted, setSubmitted] = useState(false);

  const processes = useSelector((state) => state.processes);

  const submit = async (params = fields, leave = true) => {
    if (submitted) return;
    if (isInvalidProduct(params)) return;
    setSubmitted(true);
    try {
      const newProduct = (await saveProduct(uid, params)) as any;
      setFields(product);
      if (leave) router.goBack();
      toast("Lưu thành công.");
      setSubmitted(false);
      // TODO: Do not fetch again
      if (params.id) {
        dispatch(updateProduct(params));
      } else {
        dispatch(addProduct({ ...params, id: newProduct.id }));
      }
    } catch {
      toast("Có lỗi xảy ra, vui lòng thử lại.");
    }
  };

  const setFieldsValue = (e: Partial<Product>) => {
    setFields((fields) => ({ ...fields, ...e }));
  };

  useEffect(() => {
    if (!product.id) {
      setFieldsValue({ sizes: ["XS", "S", "M", "L", "XL", "XXL", "XXXL"] });
      if (processes.length > 0 && processes[0].id)
        setFieldsValue({ processes: [processes[0].id] });
    }
  }, [product, processes]);

  useEffect(() => {
    if (processes.length <= 0) dispatch(fetchAllProcesses());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    fields,
    setFieldsValue,
    submit,
    setFields,
    processes,
  };
};
