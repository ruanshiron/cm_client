import { useIonRouter } from "@ionic/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import * as Order from "../models/order";
import { useSelector } from "../store";
import { fetchOrders } from "../store/dataSlice";
import { toast } from "../utils/toast";

export const useOrderForm = () => {
  const router = useIonRouter();
  const [fields, setFields] = useState<Order.Skeleton>(Order.initial);

  const dispatch = useDispatch();

  const products = useSelector((state) => state.data.products);
  const customers = useSelector((state) => state.data.customers);

  const isInvalid = () => {
    const isInvalidLine = (line: Order.Line) =>
      !line.product?.trim() ||
      !line.size?.trim() ||
      !line.quantity ||
      !(line.quantity > 0);

    const isInvalidLines = (lines: Order.Line[]) => {
      return lines.map((line) => isInvalidLine(line)).reduce((p, c) => p || c);
    };

    return (
      !fields?.customer?.trim() ||
      !(fields.lines.length > 0) ||
      isInvalidLines(fields.lines)
    );
  };

  const submit = async () => {
    if (isInvalid()) return;

    try {
      await Order.save(fields);
      setFields(Order.initial);
      router.goBack();
      toast("Lưu thành công.");
      // TODO: Do not fetch again
      dispatch(fetchOrders());
    } catch {
      toast("Có lỗi xảy ra, vui lòng thử lại.");
    }
  };

  const setFieldsValue = (e: Partial<Order.Skeleton>) => {
    setFields((fields) => ({ ...fields, ...e }));
  };

  const addLine = () => {
    setFields((fields) => ({
      ...fields,
      lines: [...fields.lines, Order.initialLine],
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
