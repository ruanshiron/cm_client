import { useState } from "react";
import { useDispatch } from "react-redux";
import { processAPI } from "../api";
import { Process } from "../models";
import { fetchProcesses } from "../store/dataSlice";
import { toast } from "../utils/toast";

export const initalProcess: Process = { name: "" };

export const useProcessForm = (process = initalProcess) => {
  const [showModal, setShowModal] = useState(false);

  const [fields, setFields] = useState<Process>(process);
  const [defaultName, setDefaultName] = useState(false);

  const dispatch = useDispatch();

  const isInvalid = () => !fields?.name?.trim();

  const submit = async () => {
    if (isInvalid()) return;

    try {
      await processAPI.save(fields);
      setFields(process);
      setShowModal(false);
      toast("Lưu thành công.");
      // TODO: Do not fetch again
      dispatch(fetchProcesses());
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
