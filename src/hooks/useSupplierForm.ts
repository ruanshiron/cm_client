import { useIonRouter } from "@ionic/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import * as Supplier from "../models/supplier";
import { fetchSuppliers } from "../store/dataSlice";
import { toast } from "../utils/toast";

export const useSupplierForm = () => {
  const router = useIonRouter();
  const [fields, setFields] = useState<Supplier.Skeleton>(Supplier.initial);

  const dispatch = useDispatch();

  const submit = async () => {
    if (Supplier.permit(fields)) return;

    try {
      await Supplier.save(fields);
      setFields(Supplier.initial);
      router.goBack();
      toast("Lưu thành công.");
      // TODO: Do not fetch again
      dispatch(fetchSuppliers());
    } catch {
      toast("Có lỗi xảy ra, vui lòng thử lại.");
    }
  };

  const setFieldsValue = (e: Partial<Supplier.Skeleton>) => {
    setFields((fields) => ({ ...fields, ...e }));
  };

  return {
    fields,
    setFieldsValue,
    submit,
  };
};
