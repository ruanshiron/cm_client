import { useIonRouter } from "@ionic/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import * as Employee from "../models/employee";
import { fetchEmployees } from "../store/dataSlice";
import { toast } from "../utils/toast";

export const useEmployeeCreate = () => {
  const router = useIonRouter();
  const [fields, setFields] = useState<Employee.Skeleton>(Employee.initial);

  const dispatch = useDispatch();

  const submit = async () => {
    if (Employee.permit(fields)) return;

    try {
      await Employee.save(fields);
      setFields(Employee.initial);
      router.goBack();
      toast("Lưu thành công.");
      // TODO: Do not fetch again
      dispatch(fetchEmployees());
    } catch {
      toast("Có lỗi xảy ra, vui lòng thử lại.");
    }
  };

  const setFieldsValue = (e: Partial<Employee.Skeleton>) => {
    setFields((fields) => ({ ...fields, ...e }));
  };

  return {
    fields,
    setFieldsValue,
    submit,
  };
};
