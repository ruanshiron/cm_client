import { useState } from "react";
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
import {
  addStage,
  removeStage,
  updateStage,
  uploadImages,
} from "../store/data/stageSlice";
import { fetchAllProducts } from "../store/data/productSlice";
import { fetchAllProcesses } from "../store/data/processSlice";
import { fetchAllWorkshops } from "../store/data/workshopSlice";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { onUpload } from "../helpers/firebaseHelper";

export const useStageFormModal = (stage = initialStage) => {
  const dispatch = useDispatch();
  const uid = useSelector((state) => state.user.uid);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [fields, setFields] = useState<Stage>(stage);
  const [images, setImages] = useState<File[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const {
    products,
    workshops,
    processes: allProcesses,
  } = useSelector((state) => state);
  const selectedProcduct = useSelector((state) =>
    state.products.find((item) => item.id === fields.productId)
  );
  const processes = useSelector((state) => {
    return state.processes.filter((item) =>
      selectedProcduct?.processes?.includes(item.id!)
    );
  });
  const present = () => {
    if (products.length <= 0) dispatch(fetchAllProducts());
    if (allProcesses.length <= 0) dispatch(fetchAllProcesses());
    if (workshops.length <= 0) dispatch(fetchAllWorkshops());
    setShowForm(true);
    setFieldsValue(stage);
  };

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
      setShowForm(false);
      // TODO: Do not fetch again
      if (fields.id) {
        dispatch(updateStage(fields));
      } else {
        dispatch(addStage({ ...fields, id: newStage.id }));
        const uploadedImages = await upload(newStage.id);
        dispatch(uploadImages({ id: newStage.id, images: uploadedImages }));
      }
    } catch {
      toast("Có lỗi xảy ra, vui lòng thử lại.");
    }
  };

  const upload = async (id: string) => {
    return onUpload(images, `users/${uid}/stages/${id}`);
  };

  const remove = async () => {
    if (fields.id) await destroyStage(uid, fields.id);
    toast("Xóa thành công.");
    setShowForm(false);
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
    ].filter((i) => i);
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
    selectedProcduct,
    showForm,
    setShowForm,
    present,
    images,
    setImages,
  };
};
