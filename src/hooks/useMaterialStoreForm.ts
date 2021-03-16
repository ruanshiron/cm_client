import { useIonRouter } from "@ionic/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { materialStoreAPI } from "../api";
import { MaterialStore } from "../models";
import { fetchMaterialStores } from "../store/dataSlice";
import { toast } from "../utils/toast";

const initialMaterialStore: MaterialStore = {
  name: "",
  phonenumber: "",
  types: [],
};

export const useMaterialStoreForm = () => {
  const router = useIonRouter();
  const [fields, setFields] = useState<MaterialStore>(initialMaterialStore);

  const dispatch = useDispatch();

  const isInvalid = () =>
    !fields?.name?.trim() || !fields?.phonenumber?.trim();

  const submit = async () => {
    if (isInvalid()) return;

    try {
      await materialStoreAPI.save(fields);
      setFields(initialMaterialStore);
      router.goBack();
      toast("Lưu thành công.");
      // TODO: Do not fetch again
      dispatch(fetchMaterialStores());
    } catch {
      toast("Có lỗi xảy ra, vui lòng thử lại.");
    }
  };

  const setFieldsValue = (e: Partial<MaterialStore>) => {
    setFields((fields) => ({ ...fields, ...e }));
  };

  return {
    fields,
    setFieldsValue,
    submit,
  };
};
