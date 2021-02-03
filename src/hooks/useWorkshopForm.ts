import { useIonRouter } from "@ionic/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Workshop } from "../models";
import { saveWorkshop } from "../store/data/data.actions";
import { toast } from "../utils/toast";

const initialWorkshop = { name: "", phoneNumber: "" };

export const useWorkshopForm = () => {
  const router = useIonRouter();
  const [fields, setFields] = useState<Workshop>(initialWorkshop);

  const dispatch = useDispatch();

  const submit = () => {
    if (!fields?.name?.trim() || !fields?.phoneNumber?.trim()) return;

    dispatch(
      saveWorkshop(
        fields,
        () => {
          setFields(initialWorkshop);
          toast("Lưu thành công");
          router.back();
        },
        () => {
          toast("Có lỗi xảy ra, vui lòng thử lại.");
        }
      )
    );
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
