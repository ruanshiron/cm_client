import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "../utils/toast";
import { useSelector } from "../store";
import {
  initialStage,
  isInvalidStage,
  Stage,
  saveStage,
  destroyStage,
} from "../models/stage";
import { fetchAllStages } from "../store/data/stageSlice";

export const useEventForm = (event = initialStage) => {
  const dispatch = useDispatch();

  const uid = useSelector((state) => state.user.uid);
  const [showEventForm, setShowEventForm] = useState<boolean>(false);

  const [fields, setFields] = useState<Stage>(event);

  const [submitted, setSubmitted] = useState(false);

  const products = useSelector((state) => state.products);
  const processes = useSelector((state) => state.processes);
  const workshops = useSelector((state) => state.workshops);

  useEffect(() => {
    // dispatch(fetchProducts());
    setFields(event);
  }, [showEventForm, event]);

  const setFieldsValue = (e: Partial<Stage>) => {
    setFields((fields) => ({ ...fields, ...e }));
  };

  const submit = async () => {
    if (submitted) return;
    if (isInvalidStage(fields)) return;

    setSubmitted(true);
    try {
      await saveStage(uid, fields);
      setShowEventForm(false);
      setSubmitted(false);
      toast("Lưu thành công.");
      // TODO: Do not fetch again
      dispatch(fetchAllStages());
    } catch {
      toast("Có lỗi xảy ra, vui lòng thử lại.");
    }
  };

  const remove = async () => {
    if (fields.id) await destroyStage(uid, fields.id);

    setShowEventForm(false);
    toast("Xóa thành công.");
    // TODO: Do not fetch again
    dispatch(fetchAllStages());
  };

  const detail = () => {
    return [
      fields.date,
      fields.workshopName,
      fields.processLabel,
      fields.productName,
      fields.productSize,
      fields.quantity,
    ];
  };

  return {
    setFieldsValue,
    showEventForm,
    setShowEventForm,
    fields,
    products,
    submit,
    processes,
    workshops,
    detail,
    remove
  };
};
