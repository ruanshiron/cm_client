import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  initialProcess,
  isInvalidProcess,
  Process,
  saveProcess,
} from "../models/process";
import { useSelector } from "../store";
import { fetchAllProcesses } from "../store/data/processSlice";
import { toast } from "../utils/toast";

export const useProcessForm = (process = initialProcess) => {
  const [showModal, setShowModal] = useState(false);
  const uid = useSelector((state) => state.user.uid);

  const [fields, setFields] = useState<Process>(process);
  const [defaultName, setDefaultName] = useState(false);

  const dispatch = useDispatch();

  const submit = async () => {
    if (isInvalidProcess(fields)) return;

    console.log(fields);
    

    try {
      await saveProcess(uid, fields);
      setFields(process);
      setShowModal(false);
      toast("Lưu thành công.");
      // TODO: Do not fetch again
      dispatch(fetchAllProcesses());
    } catch {
      toast("Có lỗi xảy ra, vui lòng thử lại.");
    }
  };

  const setFieldsValue = (e: Partial<Process>) => {
    setFields((fields) => ({ ...fields, ...e }));
  };

  return {
    fields,
    setFieldsValue,
    submit,
    setFields,
    defaultName,
    setDefaultName,
    showModal,
    setShowModal,
  };
};
