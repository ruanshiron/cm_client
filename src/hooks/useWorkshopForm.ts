import { useIonRouter } from "@ionic/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  initialWorkshop,
  Workshop,
  saveWorkshop,
  isInvalidWorkshop,
} from "../models/workshop";
import { fetchAllWorkshops } from "../store/data/workshopSlice";
import { toast } from "../utils/toast";

export const useWorkshopForm = () => {
  const router = useIonRouter();
  const [fields, setFields] = useState<Workshop>(initialWorkshop);

  const dispatch = useDispatch();

  const submit = async () => {
    if (isInvalidWorkshop(fields)) return;

    try {
      await saveWorkshop(fields);
      setFields(initialWorkshop);
      router.goBack();
      toast("Lưu thành công.");
      // TODO: Do not fetch again
      dispatch(fetchAllWorkshops());
    } catch {
      toast("Có lỗi xảy ra, vui lòng thử lại.");
    }
  };

  const setFieldsValue = (e: Partial<Workshop>) => {
    setFields((fields) => ({ ...fields, ...e }));
  };

  return {
    fields,
    setFieldsValue,
    submit,
  };
};
