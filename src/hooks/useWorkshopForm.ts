import { useIonRouter } from "@ionic/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  initialWorkshop,
  Workshop,
  saveWorkshop,
  isInvalidWorkshop,
  destroyWorkshop,
} from "../models/workshop";
import { fetchAllWorkshops } from "../store/data/workshopSlice";
import { toast } from "../utils/toast";

export const useWorkshopForm = (workshop = initialWorkshop) => {
  const router = useIonRouter();
  const [fields, setFields] = useState<Workshop>(workshop);
  const dispatch = useDispatch();
  const submit = async () => {
    if (isInvalidWorkshop(fields)) return;
    try {
      await saveWorkshop(fields);
      setFields(workshop);
      router.goBack();
      toast("Lưu thành công.");
      // TODO: Do not fetch again
      dispatch(fetchAllWorkshops());
    } catch {
      toast("Có lỗi xảy ra, vui lòng thử lại.");
    }
  };
  const remove = async () => {
    if (!fields.id) {
      toast("Không tìm thấy xưởng này");
      return;
    }
    await destroyWorkshop(fields.id);
    toast("Xóa thành công.");
    router.push("/workshops/")
    // TODO: Do not fetch again
    dispatch(fetchAllWorkshops());
  };
  const setFieldsValue = (e: Partial<Workshop>) => {
    setFields((fields) => ({ ...fields, ...e }));
  };
  return {
    fields,
    setFieldsValue,
    submit,
    remove,
  };
};
