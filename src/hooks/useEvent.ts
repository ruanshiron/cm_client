import { database } from "../config/firebase";
import Event from "../models/Event";
import * as _ from "lodash";
import { useEffect, useState } from "react";

const useEvent = () => {
  const [events, setEvents] = useState<{ [key: string]: Array<any> }>({});
  const [message, setMessage] = useState<string>();

  useEffect(() => {
    get();
  }, []);

  const get = async () => {
    setEvents({});
    let res = await database.collection("events").get();
    res.forEach((doc) => {
      let group = doc.data().selectedDate;

      setEvents((e) =>
        e.hasOwnProperty(group)
          ? {
              ...e,
              [group]: [...e[group], { ...doc.data(), id: doc.id }],
            }
          : {
              ...e,
              [group]: [{ ...doc.data(), id: doc.id }],
            }
      );
    });
  };

  const save = (param: Event, callback = () => {}) => {
    const data = _.pickBy(param, _.identity);

    database
      .collection("events")
      .add(data)
      .then((res) => {
        console.log(res);
        setMessage("Lưu thành công");
        callback();
        get();
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
    events,
  };
};

export default useEvent;
