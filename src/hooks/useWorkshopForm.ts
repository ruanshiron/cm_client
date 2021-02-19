import { useIonRouter } from "@ionic/react";
import { useState } from "react";
import { workshopAPI } from "../api";
import { Workshop } from "../models";
import { toast } from "../utils/toast";

const initialWorkshop = { name: "", phoneNumber: "" };

export const useWorkshopForm = () => {
  const router = useIonRouter();
  const [fields, setFields] = useState<Workshop>(initialWorkshop);

  const submit = async () => {
    if (!fields?.name?.trim() || !fields?.phoneNumber?.trim()) return;

    try {
      await workshopAPI.save(fields);
      setFields(initialWorkshop);
      router.back();
      toast("Lưu thành công.");
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
