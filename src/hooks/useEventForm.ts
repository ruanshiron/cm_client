import * as Event from "../models/event";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "../utils/toast";
import { useSelector } from "../store";
import { fetchEvents } from "../store/dataSlice";

export const useEventForm = (event = Event.initial) => {
  const dispatch = useDispatch();

  const [showEventForm, setShowEventForm] = useState<boolean>(false);

  const [fields, setFields] = useState<Event.Skeleton>(event);

  const products = useSelector((state) => state.data.products);
  const processes = useSelector((state) => state.data.processes);
  const workshops = useSelector((state) => state.data.workshops);

  useEffect(() => {
    // dispatch(fetchProducts());
    setFields(event);
  }, [showEventForm, event]);

  const setFieldsValue = (e: Partial<Event.Skeleton>) => {
    setFields((fields) => ({ ...fields, ...e }));
  };

  const submit = async () => {
    if (Event.permit(fields)) return;

    try {
      await Event.save(fields);
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
    processes,
    workshops,
  };
};
