import { database } from "../config/firebase";
import { Event, Product } from "../models";
import * as _ from "lodash";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useToast } from "./useToast";
import { getEvents } from "../store/data/data.actions";

export const useEventForm = () => {
  const dispatch = useDispatch();
  const toast = useToast();

  const [showEventForm, setShowEventForm] = useState<boolean>(false);

  const today = new Date().toISOString().substring(0, 10);
  const [quantity, setQuantity] = useState<number>();
  const [productCode, setProductCode] = useState<string>();
  const [sizeCode, setSizeCode] = useState<string>();
  const [typeCode, setTypeCode] = useState<string>();
  const [workshop, setWorkshop] = useState<string>();
  const [selectedDate, setSelectedDate] = useState<string>(today);
  const [note, setNote] = useState<string>();

  const [products, setProducts] = useState<Product[]>();

  useEffect(() => {
    database
      .collection("products")
      .get()
      .then((snap) => {
        setProducts(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      });
  }, []);

  const save = (param: Event) => {
    const data = _.pickBy(param, _.identity);

    database
      .collection("events")
      .add(data)
      .then((res) => {
        console.log(res);
        toast("Thêm thành công");
        dispatch(getEvents());
        setShowEventForm(false);
        setQuantity(undefined);
        setNote(undefined);
        setProductCode(undefined);
        setProducts(undefined);
        setSelectedDate(today);
        setSizeCode(undefined);
        setTypeCode(undefined);
        setWorkshop(undefined);
      })
      .catch((err) => {
        console.error(err);
        toast("Lưu thất bại");
      });
  };

  const submit = (e: any) => {
    console.log(e);

    const event: Event = {
      quantity,
      productCode,
      sizeCode,
      typeCode,
      workshop,
      selectedDate,
      note,
    };

    if (
      !quantity ||
      !productCode?.trim() ||
      !sizeCode?.trim() ||
      !typeCode?.trim() ||
      !selectedDate ||
      !workshop?.trim()
    )
      return;

    save(event);

    setQuantity(undefined);
    setProductCode(undefined);
    setSizeCode(undefined);
    setTypeCode(undefined);
    setWorkshop(undefined);
    setSelectedDate(today);
    setNote(undefined);
  };

  return {
    showEventForm,
    today,
    quantity,
    productCode,
    sizeCode,
    typeCode,
    workshop,
    selectedDate,
    note,
    products,
    setShowEventForm,
    setQuantity,
    setProductCode,
    setSizeCode,
    setTypeCode,
    setWorkshop,
    setSelectedDate,
    setNote,
    submit,
  };
};
