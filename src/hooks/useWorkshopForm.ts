import { useIonRouter } from "@ionic/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { workshopAPI } from "../api";
import { Workshop } from "../models";
import { fetchWorkshops } from "../store/dataSlice";
import { toast } from "../utils/toast";

const initialWorkshop: Workshop = { name: "", phonenumber: "" };

export const useWorkshopForm = () => {
  const router = useIonRouter();
  const [fields, setFields] = useState<Workshop>(initialWorkshop);

  const dispatch = useDispatch();

  const isInvalid = () =>
    !fields?.name?.trim() || !fields?.phonenumber?.trim();

  const submit = async () => {
    if (isInvalid()) return;

    try {
      await workshopAPI.save(fields);
      setFields(initialWorkshop);
      router.goBack();
      toast("Lưu thành công.");
      // TODO: Do not fetch again
      dispatch(fetchWorkshops());
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
