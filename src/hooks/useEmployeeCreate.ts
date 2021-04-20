import { useIonRouter } from "@ionic/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Employee,
  initialEmployee,
  isInvalidEmployee,
  saveEmployee,
} from "../models/employee";
import { fetchAllEmployees } from "../store/data/employeeSlice";
import { toast } from "../utils/toast";

export const useEmployeeCreate = () => {
  const router = useIonRouter();
  const [fields, setFields] = useState<Employee>(initialEmployee);

  const dispatch = useDispatch();

  const submit = async () => {
    if (isInvalidEmployee(fields)) return;

    try {
      await saveEmployee(fields);
      setFields(initialEmployee);
      router.goBack();
      toast("Lưu thành công.");
      // TODO: Do not fetch again
      dispatch(fetchAllEmployees());
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
