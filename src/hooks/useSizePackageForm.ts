import { useEffect, useState } from "react";
import {
  addSizePackage,
  SizePackage,
  updateSizePackage,
} from "../models/sizePackage";
import { useSelector } from "../store";

export const useSizePackageForm = () => {
  const { uid } = useSelector((state) => state.user);
  const [id, setId] = useState<string>();
  const [name, setName] = useState("");
  const [sizes, setSizes] = useState<string[]>([""]);

  const setSizeAtIndex = (index: number, value: string) => {
    setSizes((sizes) => sizes.map((item, i) => (i === index ? value : item)));
  };

  const removeSizeAtItem = (index: number) => {
    setSizes((sizes) => sizes.filter((_, i) => i !== index));
  };

  const submit = async () => {
    const data = sizes.filter((item) => item);
    if (!name || !data) {
      throw new Error("Hãy điền đầy đủ thông tin!");
    }

    if (id) {
      return updateSizePackage(uid, { id, name, data });
    } else {
      return addSizePackage(uid, { name, data });
    }
  };

  const reset = (item?: SizePackage) => {
    if (item) {
      setId(item.id);
      setName(item.name);
      setSizes(item.data);
    } else {
      setId(undefined);
      setName("");
      setSizes([""]);
    }
  };

  useEffect(() => {
    if (sizes[sizes.length - 1]) {
      setSizes([...sizes, ""]);
    }
  }, [sizes]);

  return {
    name,
    sizes,
    setSizeAtIndex,
    removeSizeAtItem,
    setName,
    submit,
    reset,
    id,
  };
};
