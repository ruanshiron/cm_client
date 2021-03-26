import { useIonRouter } from "@ionic/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import * as Workshop from "../models/workshop";
import { fetchWorkshops } from "../store/dataSlice";
import { toast } from "../utils/toast";

export const useWorkshopForm = () => {
  const router = useIonRouter();
  const [fields, setFields] = useState<Workshop.Skeleton>(Workshop.initial);

  const dispatch = useDispatch();

  const isInvalid = () => !fields?.name?.trim() || !fields?.phonenumber?.trim();

  const submit = async () => {
    if (isInvalid()) return;

    try {
      await Workshop.save(fields);
      setFields(Workshop.initial);
      router.goBack();
      toast("Lưu thành công.");
      // TODO: Do not fetch again
      dispatch(fetchWorkshops());
    } catch {
      toast("Có lỗi xảy ra, vui lòng thử lại.");
    }
  };

  const setFieldsValue = (e: Partial<Workshop.Skeleton>) => {
    setFields((fields) => ({ ...fields, ...e }));
  };

  return {
    fields,
    setFieldsValue,
    submit,
  };
};
