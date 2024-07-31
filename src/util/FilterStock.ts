import moment from "moment";
import { IProduct } from "../Model/Product";
import { ISize } from "../Model/Size";

interface Stock {
  size: number | string;
  netWeight: number;
  count: number;
}

export const FilterStock = (data: IProduct[]) => {
  let temp: Stock[] = [];
  data.forEach((item) => {
    const index = temp?.findIndex(
      (stock) => stock.size === (item.size as ISize)?.size
    );
    if (index !== -1) {
      temp[index].netWeight += Number(item.netWeight);
      temp[index].count += 1;
    } else
      temp.push({
        size: (item.size as ISize)?.size,
        netWeight: Number(item.netWeight),
        count: 1,
      });
  });
  return temp;
};

export const LatestStock = (data: IProduct[]) => {
  let temp = data
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
