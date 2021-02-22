import { useIonRouter } from "@ionic/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { customerAPI } from "../api";
import { Customer } from "../models";
import { fetchCustomers } from "../store/dataSlice";
import { toast } from "../utils/toast";

const initialCustomer: Customer = { name: "", phoneNumber: "" };

export const useCustomerForm = () => {
  const router = useIonRouter();
  const [fields, setFields] = useState<Customer>(initialCustomer);

  const dispatch = useDispatch();

  const isValidated = () =>
    !fields?.name?.trim() || !fields?.phoneNumber?.trim();

  const submit = async () => {
    if (isValidated()) return;

    try {
      await customerAPI.save(fields);
      setFields(initialCustomer);
      router.back();
      toast("Lưu thành công.");
      // TODO: Do not fetch again
      dispatch(fetchCustomers());
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
