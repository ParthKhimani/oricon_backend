import moment from "moment";
import { IProduct } from "../Model/Product";
import { ISize } from "../Model/Size";

interface Stock {
  size: number | string;
  type?: "SE" | "DPC";
  netWeight: number;
  count: number;
}

interface LatestStock {
  netWeight: string;
  size: string;
  type?: "SE" | "DPC";
  id: any;
}

export const FilterStock = (data: IProduct[] | LatestStock[]) => {
  let temp: Stock[] = [];
  data.forEach((item) => {
    if (typeof item.size === "object") {
      const index = temp?.findIndex(
        (stock) => stock.size === (item.size as ISize)?.size
      );
      if (index !== -1) {
        temp[index].netWeight += Number(item.netWeight);
        temp[index].count += 1;
      } else
        temp.push({
          size: (item.size as ISize)?.size,
          type: item.type,
          netWeight: Number(item.netWeight),
          count: 1,
        });
    } else {
      const index = temp?.findIndex((stock) => stock.size === item.size);
      if (index !== -1) {
        temp[index].netWeight += Number(item.netWeight);
        temp[index].count += 1;
      } else
        temp.push({
          size: item.size,
          netWeight: Number(item.netWeight),
          count: 1,
        });
    }
  });
  return temp;
};

export const LatestStock = (data: IProduct[]) => {
  let temp: LatestStock[] = data
    ?.filter(
      (item) =>
        moment(item.created_at).utcOffset("+05:30").format("DD/MM/YYYY") ===
        moment(new Date()).format("DD/MM/YYYY")
    )
    .map((item) => ({
      netWeight: item?.netWeight,
      size: (item?.size as ISize)?.size,
      id: item?._id,
    }));
  return temp;
  // return temp?.slice(temp?.length - 5, temp?.length);
};
