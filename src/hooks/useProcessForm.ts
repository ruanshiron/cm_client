import { useState } from "react";
import { useDispatch } from "react-redux";
import * as Process from "../models/process";
import { fetchProcesses } from "../store/dataSlice";
import { toast } from "../utils/toast";

export const useProcessForm = (process = Process.initial) => {
  const [showModal, setShowModal] = useState(false);

  const [fields, setFields] = useState<Process.Skeleton>(process);
  const [defaultName, setDefaultName] = useState(false);

  const dispatch = useDispatch();

  const isInvalid = () => !fields?.name?.trim();

  const submit = async () => {
    if (isInvalid()) return;

    try {
      await Process.save(fields);
      setFields(process);
      setShowModal(false);
      toast("Lưu thành công.");
      // TODO: Do not fetch again
      dispatch(fetchProcesses());
    } catch {
      toast("Có lỗi xảy ra, vui lòng thử lại.");
    }
  };

  const setFieldsValue = (e: Partial<Process.Skeleton>) => {
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
