import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { addPayment, Payment, updatePayment } from "../models/payment";
import { useSelector } from "../store";
import {
  addPayment as addPaymentToStore,
  updatePayment as updatePaymentToStore,
} from "../store/data/paymentSlice";
import { toast } from "../utils/toast";

export const usePaymentForm = () => {
  const dispatch = useDispatch();
  const { id: workshopId } = useParams<{ id: string }>();
  const { uid } = useSelector((state) => state.user);
  const [showModal, setShowModal] = useState(false);
  const [id, setId] = useState<string>();
  const [note, setNote] = useState("");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const submit = () => {
    if (loading) return;
    if (!note || !date || !amount) {
      toast("Hãy điền đầy đủ thông tin!");
      return;
    }
    const iAmount = parseInt(amount);
    if (iAmount <= 0) {
      toast("Nhập số tiền lớn hơn 0");
      return;
    }
    setLoading(true);
    const payment: Payment = {
      note,
      date: date.substring(0, 10),
      amount: iAmount,
    };
    if (!id) {
      addPayment(uid, workshopId, payment)
        .then((doc) => {
          dispatch(
            addPaymentToStore({
              workshopId,
              payment: { id: doc.id, ...payment },
            })
          );
          setLoading(false);
          toast("Lưu thành công");
          setShowModal(false);
        })
        .catch(() => {
          setLoading(false);
          toast("Có lỗi xảy ra!");
        });
    } else {
      updatePayment(uid, workshopId, id, payment)
        .then((doc) => {
          dispatch(
            updatePaymentToStore({ workshopId, payment: { id, ...payment } })
          );
          setLoading(false);
          toast("Lưu thành công");
          setShowModal(false);
        })
        .catch(() => {
          setLoading(false);
          toast("Có lỗi xảy ra!");
        });
    }
  };

  const preset = (payment?: Payment) => {
    if (payment) {
      setId(payment.id);
      setNote(payment.note);
      setDate(payment.date);
      setAmount(payment.amount.toString());
    } else {
      setId(undefined);
      setNote("");
      setDate("");
      setAmount("");
    }
  };

  return {
    submit,
    showModal,
    setShowModal,
    note,
    setNote,
    date,
    setDate,
    amount,
    setAmount,
    loading,
    preset,
  };
};
