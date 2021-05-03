import { useIonRouter } from "@ionic/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  initialOrder,
  Order,
  isInvalidOrder,
  saveOrder,
  initialLine,
} from "../models/order";
import { useSelector } from "../store";
import { fetchAllOrders } from "../store/data/orderSlice";
import { toast } from "../utils/toast";

export const useOrderForm = () => {
  const router = useIonRouter();
  const [fields, setFields] = useState<Order>(initialOrder);
  const uid = useSelector((state) => state.user.uid);

  const dispatch = useDispatch();

  const products = useSelector((state) => state.products);
  const customers = useSelector((state) => state.customers);

  const submit = async () => {
    if (isInvalidOrder(fields)) return;

    try {
      await saveOrder(uid, fields);
      setFields(initialOrder);
      router.goBack();
      toast("Lưu thành công.");
      // TODO: Do not fetch again
      dispatch(fetchAllOrders());
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
