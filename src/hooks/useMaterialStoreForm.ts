import { useIonRouter } from "@ionic/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { materialStoreAPI } from "../api";
import { MaterialStore } from "../models";
import { fetchMaterialStores } from "../store/dataSlice";
import { toast } from "../utils/toast";

const initialMaterialStore: MaterialStore = {
  name: "",
  phoneNumber: "",
  types: [],
};

export const useMaterialStoreForm = () => {
  const router = useIonRouter();
  const [fields, setFields] = useState<MaterialStore>(initialMaterialStore);

  const dispatch = useDispatch();

  const isValidated = () =>
    !fields?.name?.trim() || !fields?.phoneNumber?.trim();

  const submit = async () => {
    if (isValidated()) return;

    try {
      await materialStoreAPI.save(fields);
      setFields(initialMaterialStore);
      router.back();
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
