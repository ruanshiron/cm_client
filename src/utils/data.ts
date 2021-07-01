import * as Event from "../models/stage";
import _ from "lodash";
import { Process, ProcessEnum } from "../models/process";
import { Workshop } from "../models/workshop";
import { isBetween } from "./date";
import { Amount2 } from "../models/amount";

export const CHART_COLOR = [
  "#3366CC",
  "#DC3912",
  "#FF9900",
  "#109618",
  "#990099",
  "#3B3EAC",
  "#0099C6",
  "#DD4477",
  "#66AA00",
  "#B82E2E",
  "#316395",
  "#994499",
  "#22AA99",
  "#AAAA11",
  "#6633CC",
  "#E67300",
  "#8B0707",
  "#329262",
  "#5574A6",
  "#3B3EAC",
];

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

  return undefined;
};

var mangso = [
  "không",
  "một",
  "hai",
  "ba",
  "bốn",
  "năm",
  "sáu",
  "bảy",
  "tám",
  "chín",
];
function dochangchuc(so: number, daydu: boolean) {
  var chuoi = "";
  let chuc = Math.floor(so / 10);
  let donvi = so % 10;
  if (chuc > 1) {
    chuoi = " " + mangso[chuc] + " mươi";
    if (donvi === 1) {
      chuoi += " mốt";
    }
  } else if (chuc === 1) {
    chuoi = " mười";
    if (donvi === 1) {
      chuoi += " một";
    }
  } else if (daydu && donvi > 0) {
    chuoi = " lẻ";
  }
  if (donvi === 5 && chuc > 1) {
    chuoi += " lăm";
  } else if (donvi > 1 || (donvi === 1 && chuc === 0)) {
    chuoi += " " + mangso[donvi];
  }
  return chuoi;
}
function docblock(so: number, daydu: boolean) {
  var chuoi = "";
  let tram = Math.floor(so / 100);
  so = so % 100;
  if (daydu || tram > 0) {
    chuoi = " " + mangso[tram] + " trăm";
    chuoi += dochangchuc(so, true);
  } else {
    chuoi = dochangchuc(so, false);
  }
  return chuoi;
}
function dochangtrieu(so: number, daydu: boolean) {
  var chuoi = "";
  let trieu = Math.floor(so / 1000000);
  so = so % 1000000;
  if (trieu > 0) {
    chuoi = docblock(trieu, daydu) + " triệu";
    daydu = true;
  }
  let nghin = Math.floor(so / 1000);
  so = so % 1000;
  if (nghin > 0) {
    chuoi += docblock(nghin, daydu) + " nghìn";
    daydu = true;
  }
  if (so > 0) {
    chuoi += docblock(so, daydu);
  }
  return chuoi;
}
function docso(so: number) {
  if (so === 0) return mangso[0];
  var chuoi = "",
    hauto = "";
  do {
    let ty = so % 1000000000;
    so = Math.floor(so / 1000000000);
    if (so > 0) {
      chuoi = dochangtrieu(ty, true) + hauto + chuoi;
    } else {
      chuoi = dochangtrieu(ty, false) + hauto + chuoi;
    }
    hauto = " tỷ";
  } while (so > 0);
  return chuoi;
}

export const currencyString = docso;

export const subtotal = (stage: Event.Stage, workshop?: Workshop) => {
  if (!workshop) return 0;
  const amount = workshop.amounts.find(
    (item) =>
      (stage.processStatus === "fulfilled" ||
        stage.processStatus === "rejected") &&
      item.processId === stage.processId &&
      item.productId === stage.productId &&
      isBetween(stage.date, item.fromDate, item.toDate)
  );
  if (!amount) {
    return 0;
  } else {
    return (
      stage.quantity *
      amount.amount *
      (stage.processStatus === "fulfilled" ? 1 : -1)
    );
  }
};

export const estimatedSubtotal = (stage: Event.Stage, workshop?: Workshop) => {
  if (!workshop) return 0;
  const amount = workshop.amounts.find(
    (item) =>
      stage.processStatus === "pending" &&
      item.processId === stage.processId &&
      item.productId === stage.productId &&
      isBetween(stage.date, item.fromDate, item.toDate)
  );
  if (!amount) {
    return 0;
  } else {
    return stage.quantity * amount.amount;
  }
};

export const subtotal2 = (stage: Event.Stage, amounts: Amount2[]) => {
  const amount = amounts.find(
    (item) =>
      (stage.processStatus === "fulfilled" ||
        stage.processStatus === "rejected") &&
      item.processId === stage.processId &&
      item.productId === stage.productId &&
      isBetween(stage.date, item.from, item.to)
  );
  if (!amount) {
    return 0;
  } else {
    return (
      stage.quantity *
      amount.value *
      (stage.processStatus === "fulfilled" ? 1 : -1)
    );
  }
};

export const estimatedSubtotal2 = (stage: Event.Stage, amounts: Amount2[]) => {
  const amount = amounts.find(
    (item) =>
      stage.processStatus === "pending" &&
      item.processId === stage.processId &&
      item.productId === stage.productId &&
      isBetween(stage.date, item.from, item.to)
  );
  if (!amount) {
    return 0;
  } else {
    return stage.quantity * amount.value;
  }
};

export const processMetrics = (stages: Event.Stage[]) => {
  const result: any = {};
  stages.forEach((stage) => {
    if (stage.processId in result) {
      if (stage.processStatus in result[stage.processId])
        result[stage.processId][stage.processStatus] += stage.quantity;
    } else {
      result[stage.processId] = {
        pending: stage.processStatus === "pending" ? stage.quantity : 0,
        fulfilled: stage.processStatus === "fulfilled" ? stage.quantity : 0,
        rejected: stage.processStatus === "rejected" ? stage.quantity : 0,
      };
    }
  });
  return result;
};
