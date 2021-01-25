import { useIonRouter } from "@ionic/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { database } from "../config/firebase";
import { getProducts } from "../store/data/data.actions";
import { useToast } from "./useToast";

export const useProductForm = () => {
  const router = useIonRouter();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState<string>();
  const [code, setCode] = useState<string>();
  const [sizes, setSizes] = useState<string[]>();
  const [note, setNote] = useState<string>();

  const dispatch = useDispatch();

  const submit = () => {
    if (!name?.trim() || !code?.trim() || !sizes?.length) return;

    const product = {
      name,
      code,
      sizes,
    };

    database
      .collection("products")
      .add(product)
      .then((doc) => {
        toast("Sản phẩm mới đã được thêm");

        setName(undefined);
        setCode(undefined);
        setSizes(undefined);
        setNote(undefined);

        router.back();
        dispatch(getProducts());
      })
      .catch((err) => {
        console.error(err);
        toast("Sản phẩm mới đã được thêm");
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
