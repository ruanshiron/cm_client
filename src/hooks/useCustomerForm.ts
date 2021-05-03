import { useIonRouter } from "@ionic/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Customer,
  initialCustomer,
  isInvalidCustomer,
  saveCustomer,
} from "../models/customer";
import { useSelector } from "../store";
import { fetchAllCustomers } from "../store/data/customerSlice";
import { toast } from "../utils/toast";

export const useCustomerForm = () => {
  const router = useIonRouter();
  const [fields, setFields] = useState<Customer>(initialCustomer);
  const uid = useSelector((state) => state.user.uid);

  const dispatch = useDispatch();

  const submit = async () => {
    if (isInvalidCustomer(fields)) return;

    try {
      await saveCustomer(uid, fields);
      setFields(initialCustomer);
      router.goBack();
      toast("Lưu thành công.");
      // TODO: Do not fetch again
      dispatch(fetchAllCustomers());
    } catch {
      toast("Có lỗi xảy ra, vui lòng thử lại.");
    }
  };

  const setFieldsValue = (e: Partial<Customer>) => {
    setFields((fields) => ({ ...fields, ...e }));
  };

  return {
    fields,
    setFieldsValue,
    submit,
  };
};
