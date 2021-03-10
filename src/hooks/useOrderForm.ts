import { useIonRouter } from "@ionic/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { orderAPI } from "../api";
import { Order } from "../models";
import { useSelector } from "../store";
import { fetchOrders } from "../store/dataSlice";
import { toast } from "../utils/toast";

const initalOrder: Order = {
  customer: "",
  lines: [{ product: "", size: "" }],
};

const initialLine = { product: "", size: "" };

export const useOrderForm = () => {
  const router = useIonRouter();
  const [fields, setFields] = useState<Order>(initalOrder);

  const dispatch = useDispatch();

  const products = useSelector((state) => state.data.products);
  const customers = useSelector((state) => state.data.customers);

  const isValidated = () => !fields?.customer?.trim();

  const submit = async () => {
    if (isValidated()) return;

    try {
      await orderAPI.save(fields);
      setFields(initalOrder);
      router.goBack();
      toast("Lưu thành công.");
      // TODO: Do not fetch again
      dispatch(fetchOrders());
    } catch {
      toast("Có lỗi xảy ra, vui lòng thử lại.");
    }
  };

  const setFieldsValue = (e: Partial<Order>) => {
    setFields((fields) => ({ ...fields, ...e }));
  };

  const addLine = () => {
    setFields((fields) => ({
      ...fields,
      lines: [...fields.lines, initialLine],
    }));
  };

  const removeLine = (index: number) => {
    fields.lines.splice(index, 1);

    setFields((fields) => ({
      ...fields,
      lines: fields.lines,
    }));
  };

  return {
    fields,
    setFieldsValue,
    submit,
    products,
    customers,
    addLine,
    removeLine,
  };
};
