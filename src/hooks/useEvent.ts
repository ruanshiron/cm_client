import { database } from "../config/firebase";
import { Event } from "../models/Diary";
import * as _ from "lodash";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getEvents } from "../store/diary/diary.actions";

export const useEvent = () => {
  const [message, setMessage] = useState<string>();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEvents());
  }, [dispatch]);

  const save = (param: Event, callback = () => {}) => {
    const data = _.pickBy(param, _.identity);

    database
      .collection("events")
      .add(data)
      .then((res) => {
        console.log(res);
        setMessage("Lưu thành công");
        callback();
        dispatch(getEvents());
      })
      .catch((err) => {
        console.error(err);
        setMessage("Lưu thất bại");
      });
  };

  return {
    save,
    message,
    setMessage,
  };
};
