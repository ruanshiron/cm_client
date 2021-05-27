import { useState } from "react";
import { useDispatch } from "react-redux";
import { onUpload } from "../helpers/firebaseHelper";
import { Process } from "../models/process";
import { Product } from "../models/product";
import { saveStage, Stage } from "../models/stage";
import { Workshop } from "../models/workshop";
import { useSelector } from "../store";
import { addStage, updateStage, uploadImages } from "../store/data/stageSlice";

const TODAY = new Date().toISOString();

export const useStageFullModalForm = () => {
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState<string>();
  const [date, setDate] = useState<string>(TODAY);
  const [product, setProduct] = useState<Product>();
  const [workshop, setWorkshop] = useState<Workshop>();
  const [process, setProcess] = useState<Process>();
  const [status, setStatus] = useState<string>();
  const [sizes, setSizes] = useState<string[]>([]);
  const [note, setNote] = useState<string>();
  const [images, setImages] = useState<File[]>([]);
  const { uid } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const submit = async () => {
    if (loading) {
      throw new Error("Đang tải...");
    }
    if (
      quantity &&
      date &&
      product &&
      workshop &&
      process &&
      status &&
      sizes.length > 0
    ) {
      if (parseInt(quantity, 0) < 0) {
        throw new Error("Vui lòng nhập số lượng lớn hơn 0");
      }

      const stage: Stage = {
        quantity: parseInt(quantity, 0),
        date: date.substring(0, 10),
        productId: product.id!,
        productName: product.name,
        workshopId: workshop.id!,
        workshopName: workshop.name,
        processId: process.id!,
        processStatus: status,
        processLabel: (process as any)[status],
        productSizes: sizes,
        note: note?.trim(),
      };

      try {
        setLoading(true);
        const doc: any = await saveStage(uid, stage);
        if (stage.id) {
          dispatch(updateStage(stage));
        } else {
          dispatch(addStage({ ...stage, id: doc.id }));
          const uploadedImages = await upload(doc.id);
          dispatch(uploadImages({ id: doc.id, images: uploadedImages }));
        }
        setLoading(false);
        reset();
      } catch {
        setLoading(false);
        throw new Error("Vui lòng nhập đầy đủ các trường");
      }
    } else {
      setLoading(false);
      throw new Error("Vui lòng nhập đầy đủ các trường");
    }
  };

  const upload = async (id: string) => {
    return onUpload(images, `users/${uid}/stages/${id}`);
  };

  const reset = () => {
    setQuantity(undefined);
    setDate(TODAY);
    setProduct(undefined);
    setWorkshop(undefined);
    setProcess(undefined);
    setSizes([]);
    setStatus(undefined);
    setNote(undefined);
    setImages([]);
  };

  return {
    quantity,
    setQuantity,
    date,
    setDate,
    product,
    setProduct,
    workshop,
    setWorkshop,
    process,
    setProcess,
    status,
    setStatus,
    sizes,
    setSizes,
    images,
    setImages,
    note,
    setNote,
    submit,
    loading,
  };
};
