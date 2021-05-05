import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  initialProcess,
  isInvalidProcess,
  Process,
  saveProcess,
} from "../models/process";
import { useSelector } from "../store";
import { updateProcess, addProcess } from "../store/data/processSlice";
import { toast } from "../utils/toast";

export const useProcessForm = (process = initialProcess) => {
  const [showModal, setShowModal] = useState(false);
  const uid = useSelector((state) => state.user.uid);

  const [fields, setFields] = useState<Process>(process);

  const dispatch = useDispatch();

  const submit = async () => {
    if (isInvalidProcess(fields)) return;

    if (!fields.pending) fields.pending = "đang " + fields.name;
    if (!fields.fulfilled) fields.fulfilled = "đã " + fields.name;
    if (!fields.rejected) fields.rejected = fields.name + " lỗi";

    try {
      const newProcess = (await saveProcess(uid, fields)) as any;
      setFields(process);
      setShowModal(false);
      toast("Lưu thành công.");
      // TODO: Do not fetch again
      if (fields.id) {
        dispatch(updateProcess(fields));
      } else {
        dispatch(addProcess({ ...fields, id: newProcess.id }));
      }
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
    showModal,
    setShowModal,
  };
};
