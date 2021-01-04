import { useIonRouter } from "@ionic/react";
import { useState } from "react";
import { database } from "../config/firebase";

export const useProductForm = () => {
  const router = useIonRouter();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState<string>();
  const [code, setCode] = useState<string>();
  const [sizes, setSizes] = useState<string[]>();
  const [note, setNote] = useState<string>();

  const submit = () => {
    if (name?.trim() === "" || code?.trim() === "" || sizes?.length === 0)
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
        console.log(doc.id);
        setName(undefined);
        setCode(undefined);
        setSizes(undefined);
        setNote(undefined);

        router.back();
      })
      .catch((err) => {
        console.log(err);
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
