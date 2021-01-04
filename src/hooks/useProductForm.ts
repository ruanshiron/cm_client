import { useIonRouter } from "@ionic/react";
import { useState } from "react";
import { database } from "../config/firebase";
import { useToast } from "./useToast";

export const useProductForm = () => {
  const router = useIonRouter();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState<string>();
  const [code, setCode] = useState<string>();
  const [sizes, setSizes] = useState<string[]>();
  const [note, setNote] = useState<string>();

  const submit = () => {
    if (!name?.trim() || !code?.trim() || !sizes?.length)
      return;

    const product = {
      name,
      code,
      sizes,
    };

    database
      .collection("products")
      .add(product)
      .then((doc) => {
        toast("Sản phẩm mới đã được thêm")

        setName(undefined);
        setCode(undefined);
        setSizes(undefined);
        setNote(undefined);

        router.back();
      })
      .catch((err) => {
        console.error(err);
        toast("Sản phẩm mới đã được thêm")
      });
  };

  return {
    loading,
    name,
    code,
    sizes,
    note,
    setLoading,
    setName,
    setCode,
    setSizes,
    setNote,
    submit,
  };
};
