import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "../utils/toast";
import { useSelector } from "../store";
import {
  initialStage,
  isInvalidStage,
  Stage,
  saveStage,
  destroyStage,
} from "../models/stage";
import { addStage, removeStage, updateStage } from "../store/data/stageSlice";
import { useIonRouter } from "@ionic/react";
import { fetchAllProducts } from "../store/data/productSlice";
import { fetchAllProcesses } from "../store/data/processSlice";
import { fetchAllWorkshops } from "../store/data/workshopSlice";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

export const useStageForm = (event = initialStage) => {
  const dispatch = useDispatch();
  const uid = useSelector((state) => state.user.uid);
  const router = useIonRouter();
  const [fields, setFields] = useState<Stage>(event);
  const [images, setImages] = useState<File[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const products = useSelector((state) => state.products);
  const selectedProcduct = useSelector((state) =>
    state.products.find((item) => item.id === fields.productId)
  );
  const processes = useSelector((state) => {
    return state.processes.filter((item) =>
      selectedProcduct?.processes.includes(item.id!)
    );
  });
  const workshops = useSelector((state) => state.workshops);

  useEffect(() => {
    if (products.length <= 0) dispatch(fetchAllProducts());
    if (processes.length <= 0) dispatch(fetchAllProcesses());
    if (workshops.length <= 0) dispatch(fetchAllWorkshops());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setFieldsValue = (e: Partial<Stage>) => {
    setFields((fields) => ({ ...fields, ...e }));
  };

  const submit = async () => {
    if (submitted) return;
    if (isInvalidStage(fields)) return;

    setSubmitted(true);
    try {
      const newStage = (await saveStage(uid, fields)) as any;
      setSubmitted(false);
      toast("Lưu thành công.");
      router.goBack();
      // TODO: Do not fetch again
      if (fields.id) {
        dispatch(updateStage(fields));
      } else {
        dispatch(addStage({ ...fields, id: newStage.id }));
      }
    } catch {
      toast("Có lỗi xảy ra, vui lòng thử lại.");
    }
  };

  const remove = async () => {
    if (fields.id) await destroyStage(uid, fields.id);
    toast("Xóa thành công.");
    router.goBack();
    // TODO: Do not fetch again
    dispatch(removeStage(fields.id));
  };

  const detail = () => {
    return [
      format(new Date(fields.date), "EEEE, dd MMMM, yyyy", { locale: vi }),
      fields.workshopName,
      fields.processLabel,
      fields.quantity,
      fields.productName,
      fields.productSize,
    ];
  };

  const present = (stage = initialStage) => {
    setFieldsValue(stage);
  };

  return {
    setFieldsValue,
    fields,
    products,
    submit,
    processes,
    workshops,
    detail,
    remove,
    present,
    selectedProcduct,
    images,
    setImages,
  };
};
