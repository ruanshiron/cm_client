import { Event } from "../models";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "../utils/toast";
import { useSelector } from "../store";
import { fetchEvents, fetchProducts } from "../store/dataSlice";
import { eventAPI } from "../api";

const initalEvent: Event = {
  selectedDate: new Date().toISOString().substring(0, 10),
};

export const useEventForm = () => {
  const dispatch = useDispatch();

  const [showEventForm, setShowEventForm] = useState<boolean>(false);

  const [fields, setFields] = useState<Event>(initalEvent);

  const products = useSelector((state) => state.data.products);

  useEffect(() => {
    dispatch(fetchProducts());
    setFields(initalEvent);
  }, [dispatch, showEventForm]);

  const setFieldsValue = (e: Partial<Event>) => {
    setFields((fields) => ({ ...fields, ...e }));
  };

  const isValidated = () =>
    !fields?.quantity ||
    !fields?.productCode?.trim() ||
    !fields?.sizeCode?.trim() ||
    !fields?.typeCode?.trim() ||
    !fields?.selectedDate ||
    !fields?.workshop?.trim();

  const submit = async () => {
    if (isValidated()) return;

    console.log(fields);

    try {
      await eventAPI.save(fields);
      setShowEventForm(false);
      toast("Lưu thành công.");
      // TODO: Do not fetch again
      dispatch(fetchEvents());
    } catch {
      toast("Có lỗi xảy ra, vui lòng thử lại.");
    }
  };

  return {
    setFieldsValue,
    showEventForm,
    setShowEventForm,
    fields,
    products,
    submit,
  };
};
