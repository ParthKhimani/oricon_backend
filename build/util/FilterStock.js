"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterStock = void 0;
const FilterStock = (data) => {
    let temp = [];
    data.forEach((item) => {
        var _a;
        const index = temp === null || temp === void 0 ? void 0 : temp.findIndex((stock) => { var _a; return stock.size === ((_a = item.size) === null || _a === void 0 ? void 0 : _a.size); });
        if (index !== -1) {
            temp[index].netWeight += Number(item.netWeight);
            temp[index].count += 1;
        }
        else
            temp.push({
                size: (_a = item.size) === null || _a === void 0 ? void 0 : _a.size,
                netWeight: Number(item.netWeight),
                count: 1,
            });
    });
    return temp;
};
exports.FilterStock = FilterStock;
