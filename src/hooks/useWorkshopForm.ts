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
import { useSelector } from "../store";
import {
  updateWorkshop,
  addWorkshop,
  removeWorkshop,
} from "../store/data/workshopSlice";
import { toast } from "../utils/toast";

export const useWorkshopForm = (workshop = initialWorkshop) => {
  const router = useIonRouter();
  const [fields, setFields] = useState<Workshop>(workshop);
  const dispatch = useDispatch();
  const uid = useSelector((state) => state.user.uid);
  const submit = async (params = fields, leave = true) => {
    if (isInvalidWorkshop(params)) return;
    try {
      const newWorkshop = (await saveWorkshop(uid, params)) as any;
      setFields(workshop);
      if (leave) router.goBack();
      toast("Lưu thành công.");
      if (params.id) {
        dispatch(updateWorkshop(params));
      } else {
        dispatch(addWorkshop({ ...params, id: newWorkshop.id }));
      }
    } catch (e) {
      console.log(e);

      toast("Có lỗi xảy ra, vui lòng thử lại.");
    }
  };
  const remove = async () => {
    if (!fields.id) {
      toast("Không tìm thấy xưởng này");
      return;
    }
    await destroyWorkshop(uid, fields.id);
    toast("Xóa thành công.");
    router.push("/workshops/");
    dispatch(removeWorkshop(fields.id));
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
