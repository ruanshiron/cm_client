import * as Event from "../models/stage";
import _ from "lodash";
import { Process, ProcessEnum } from "../models/process";

export const filter = (events: Event.Stage[]) =>
  _.chain(events)
    .groupBy((event) => {
      const date = new Date(event.date!);
      return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
    })
    .map((value, key) => ({ name: key, events: value }))
    .value()
    .sort(function (a, b) {
      return +new Date(b.name) - +new Date(a.name);
    });

export const processParser = (process: string, processes: Process[]) => {
  const [processId, processStatus] = process.split("/");

  const tmp: any = processes.find((item) => item.id === processId);

  if (tmp) {
    if (processStatus in tmp) return tmp[processStatus];
    else return ProcessEnum[processStatus] + tmp.name;
  }

  return "unknown";
};
