import { useIonRouter } from "@ionic/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Employee,
  initialEmployee,
  isInvalidEmployee,
  saveEmployee,
} from "../models/employee";
import { useSelector } from "../store";
import { addEmployee, updateEmployee } from "../store/data/employeeSlice";
import { toast } from "../utils/toast";

export const useEmployeeForm = () => {
  const router = useIonRouter();
  const [fields, setFields] = useState<Employee>(initialEmployee);
  const uid = useSelector((state) => state.user.uid);

  const dispatch = useDispatch();

  const submit = async () => {
    if (isInvalidEmployee(fields)) return;

    try {
      const newEmployee = (await saveEmployee(uid, fields)) as any;
      setFields(initialEmployee);
      router.goBack();
      toast("Lưu thành công.");
      if (fields.id) {
        dispatch(updateEmployee(fields));
      } else {
        dispatch(addEmployee({ ...fields, id: newEmployee.id }));
      }
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
