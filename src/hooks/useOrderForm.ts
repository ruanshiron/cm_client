import { useIonRouter } from "@ionic/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  initialOrder,
  Order,
  isInvalidOrder,
  saveOrder,
  initialLine,
} from "../models/order";
import { useSelector } from "../store";
import { addOrder, updateOrder } from "../store/data/orderSlice";
import { fetchAllProducts } from "../store/data/productSlice";
import { toast } from "../utils/toast";

export const useOrderForm = (customerId: string) => {
  const router = useIonRouter();
  const [fields, setFields] = useState<Order>(initialOrder);
  const uid = useSelector((state) => state.user.uid);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const customers = useSelector((state) => state.customers);

  useEffect(() => {
    if (products.length <= 0) dispatch(fetchAllProducts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submit = async () => {
    if (isInvalidOrder(fields)) return;

    const params = fields;
    params.lines = fields.lines.map((line) => ({
      ...line,
      productName:
        products.find((item) => item.id === line.productId)?.name || "",
    }));

    try {
      const newOrder = (await saveOrder(uid, customerId, {
        uid,
        ...params,
      })) as any;
      setFields(initialOrder);
      router.goBack();
      toast("Lưu thành công.");
      // TODO: Do not fetch again
      if (fields.id) {
        dispatch(updateOrder({ ...fields, customerId }));
      } else {
        dispatch(addOrder({ ...fields, id: newOrder.id, customerId }));
      }
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
