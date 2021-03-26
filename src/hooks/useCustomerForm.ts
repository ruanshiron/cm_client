import { useIonRouter } from "@ionic/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import * as Customer from "../models/customer";
import { fetchCustomers } from "../store/dataSlice";
import { toast } from "../utils/toast";

export const useCustomerForm = () => {
  const router = useIonRouter();
  const [fields, setFields] = useState<Customer.Skeleton>(Customer.initial);

  const dispatch = useDispatch();

  const submit = async () => {
    if (Customer.permit(fields)) return;

    try {
      await Customer.save(fields);
      setFields(Customer.initial);
      router.goBack();
      toast("Lưu thành công.");
      // TODO: Do not fetch again
      dispatch(fetchCustomers());
    } catch {
      toast("Có lỗi xảy ra, vui lòng thử lại.");
    }
  };

  const setFieldsValue = (e: Partial<Customer.Skeleton>) => {
    setFields((fields) => ({ ...fields, ...e }));
  };

  return {
    fields,
    setFieldsValue,
    submit,
  };
};
