"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LatestStock = exports.FilterStock = void 0;
const moment_1 = __importDefault(require("moment"));
const FilterStock = (data) => {
    let temp = [];
    data.forEach((item) => {
        if (typeof item.size === "object") {
            const index = temp?.findLastIndex((stock) => stock.size === item.size?.size);
            if (index !== -1 && temp[index].type === item.type) {
                temp[index].netWeight += Number(item.netWeight);
                temp[index].count += 1;
            }
            else
                temp.push({
                    size: item.size?.size,
                    type: item.type,
                    netWeight: Number(item.netWeight),
                    count: 1,
                });
        }
        else {
            const index = temp?.findLastIndex((stock) => stock.size === item.size);
            if (index !== -1 && temp[index].type === item.type) {
                temp[index].netWeight += Number(item.netWeight);
                temp[index].count += 1;
            }
            else
                temp.push({
                    size: item.size,
                    netWeight: Number(item.netWeight),
                    count: 1,
                });
        }
    });
    return temp;
};
exports.FilterStock = FilterStock;
const LatestStock = (data) => {
    let temp = data
        ?.filter((item) => (0, moment_1.default)(item.created_at).utcOffset("+05:30").format("DD/MM/YYYY") ===
        (0, moment_1.default)(new Date()).format("DD/MM/YYYY"))
        .map((item) => ({
        netWeight: item?.netWeight,
        size: item?.size?.size,
        id: item?._id,
    }));
    return temp;
    // return temp?.slice(temp?.length - 5, temp?.length);
};
exports.LatestStock = LatestStock;
