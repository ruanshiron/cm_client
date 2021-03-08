import { useIonRouter } from "@ionic/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { employeeAPI } from "../api";
import { Employee } from "../models";
import { fetchEmployees } from "../store/dataSlice";
import { toast } from "../utils/toast";

const initialEmployee: Employee = { name: "", phoneNumber: "" };

export const useEmployeeCreate = () => {
  const router = useIonRouter();
  const [fields, setFields] = useState<Employee>(initialEmployee);

  const dispatch = useDispatch();

  const isValidated = () =>
    !fields?.name?.trim() || !fields?.phoneNumber?.trim();

  const submit = async () => {
    if (isValidated()) return;

    try {
      await employeeAPI.save(fields);
      setFields(initialEmployee);
      router.goBack();
      toast("Lưu thành công.");
      // TODO: Do not fetch again
      dispatch(fetchEmployees());
    } catch {
      toast("Có lỗi xảy ra, vui lòng thử lại.");
    }
  };

  const setFieldsValue = (e: Partial<Employee>) => {
    setFields((fields) => ({ ...fields, ...e }));
  };

  return {
    fields,
    setFieldsValue,
    submit,
  };
};
