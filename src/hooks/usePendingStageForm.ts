import { useState } from "react";
// import { onUpload } from "../helpers/firebaseHelper";
import { Process } from "../models/process";
import { Product } from "../models/product";
import {
  addPendingStage,
  deletePendingStage,
  PendingStage,
  updatePendingStage,
} from "../models/pendingStage";
import { Workshop } from "../models/workshop";
import { useSelector } from "../store";
import { destroyStage, saveStage, Stage } from "../models/stage";
// import { addStage, updateStage, uploadImages } from "../store/data/stageSlice";

const TODAY = new Date().toISOString();

export const usePendingStageForm = () => {
  const { displayName } = useSelector((state) => state.user);
  const { products, workshops, processes } = useSelector((state) => state);
  const [currentStage, setCurrentStage] = useState<Stage>();
  const [id, setId] = useState<string>();
  const [type, setType] = useState<string>();
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
  const add = async () => {
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

      const item: PendingStage = {
        type: "added",
        modifier: displayName,
        data: {
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
          note: note?.trim() || "",
        },
      };

      try {
        setLoading(true);
        await addPendingStage(uid, item);
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

  const update = async () => {
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

      const item: PendingStage = {
        id,
        type: "modified",
        modifier: displayName,
        data: {
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
          note: note?.trim() || "",
        },
      };

      try {
        setLoading(true);
        await updatePendingStage(uid, item);
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

  const remove = async () => {
    if (currentStage) {
      const item: PendingStage = {
        id: currentStage?.id,
        type: "removed",
        modifier: displayName,
        data: currentStage,
      };
      try {
        setLoading(true);
        await updatePendingStage(uid, item);
        setLoading(false);
        reset();
      } catch {
        setLoading(false);
        throw new Error("Có lỗi xảy ra không thể thao tác");
      }
    } else {
      throw new Error("Thoát ra và thử lại!");
    }
  };

  const resolve = async (pendingStage: PendingStage) => {
    if (pendingStage.type === "removed") {
      try {
        await destroyStage(uid, pendingStage.id!);
        await deletePendingStage(uid, pendingStage.id!);
      } catch (error) {
        throw new Error("Có lỗi xảy ra, không thể thao tác!");
      }
    }

    if (pendingStage.type === "added" || pendingStage.type === "modified") {
      try {
        await saveStage(uid, { id: pendingStage.id!, ...pendingStage.data });
        await deletePendingStage(uid, pendingStage.id!);
      } catch (error) {
        throw new Error("Có lỗi xảy ra, không thể thao tác!");
      }
    }
  };

  const reject = async (pendingStage: PendingStage) => {
    try {
      await deletePendingStage(uid, pendingStage.id!);
    } catch (error) {
      throw new Error("Có lỗi xảy ra, không thể thao tác!");
    }
  };
  // const upload = async (id: string) => {
  //   return onUpload(images, `users/${uid}/stages/${id}`);
  // };

  const reset = (pendingStage?: PendingStage) => {
    const stage = pendingStage?.data;
    setCurrentStage(stage);
    if (!stage) {
      setId(undefined);
      setType(undefined);
      setQuantity(undefined);
      setDate(TODAY);
      setProduct(undefined);
      setWorkshop(undefined);
      setProcess(undefined);
      setSizes([]);
      setStatus(undefined);
      setNote(undefined);
      setImages([]);
    } else {
      setId(pendingStage?.id);
      setType(pendingStage?.type);
      setQuantity(stage.quantity.toString());
      setDate(stage.date);
      setProduct(products.find((item) => item.id === stage.productId));
      setWorkshop(workshops.find((item) => item.id === stage.workshopId));
      setProcess(processes.find((item) => item.id === stage.processId));
      setSizes(stage.productSizes);
      setStatus(stage.processStatus);
      setNote(stage.note);
      setImages([]);
    }
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
    add,
    loading,
    reset,
    remove,
    update,
    id,
    type,
    resolve,
    reject,
  };
};
