"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginationHelper = void 0;
const paginationCalculation = (potions) => {
    const page = potions.page || 1;
    const limit = potions.limit || 10;
    const skip = (page - 1) * limit;
    const sortBy = potions.sortBy || 'createdAt';
    const sortOrder = potions.sortOrder || 'desc';
    return {
        page,
        limit,
        skip,
        sortBy,
        sortOrder,
    };
};
exports.paginationHelper = {
    paginationCalculation,
};
