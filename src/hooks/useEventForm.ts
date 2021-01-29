import { Event } from "../models";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getProducts, saveEvent } from "../store/data/data.actions";
import { toast } from "../utils/toast";
import { useSelector } from "../store";

export const useEventForm = () => {
  const dispatch = useDispatch();

  const [showEventForm, setShowEventForm] = useState<boolean>(false);

  const [fields, setFields] = useState<Event>();

  const products = useSelector((state) => state.data.products);

  useEffect(() => {
    dispatch(getProducts());
    setFields({ selectedDate: new Date().toISOString().substring(0, 10) });
  }, [dispatch, showEventForm]);

  const setFieldsValue = (e: Partial<Event>) => {
    setFields((fields) => ({ ...fields, ...e }));
  };

  const submit = () => {
    if (
      !fields?.quantity ||
      !fields?.productCode?.trim() ||
      !fields?.sizeCode?.trim() ||
      !fields?.typeCode?.trim() ||
      !fields?.selectedDate ||
      !fields?.workshop?.trim()
    )
      return;

    console.log(fields);

    dispatch(
      saveEvent(
        fields,
        () => {
          toast("Thêm thành công.");
          setShowEventForm(false);
        },
        () => {
          toast("Có lỗi xảy ra, vui lòng thử lại.");
        }
      )
    );
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
