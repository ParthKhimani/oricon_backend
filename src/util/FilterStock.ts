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
