import { useIonRouter } from "@ionic/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  initialSupplier,
  isInvalidSupplier,
  saveSupplier,
  Supplier,
} from "../models/supplier";
import { fetchAllSuppliers } from "../store/data/supplierSlice";
import { toast } from "../utils/toast";

export const useSupplierForm = () => {
  const router = useIonRouter();
  const [fields, setFields] = useState<Supplier>(initialSupplier);

  const dispatch = useDispatch();

  const submit = async () => {
    if (isInvalidSupplier(fields)) return;

    try {
      await saveSupplier(fields);
      setFields(initialSupplier);
      router.goBack();
      toast("Lưu thành công.");
      // TODO: Do not fetch again
      dispatch(fetchAllSuppliers());
    } catch {
      toast("Có lỗi xảy ra, vui lòng thử lại.");
    }
  };

  const setFieldsValue = (e: Partial<Supplier>) => {
    setFields((fields) => ({ ...fields, ...e }));
  };

  return {
    fields,
    setFieldsValue,
    submit,
  };
};
