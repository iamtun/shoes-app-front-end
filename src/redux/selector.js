import { createSelector } from "@reduxjs/toolkit";

export const userSelector = (state) => state.user.info;
export const typeListSelector = (state) => state.types.typeList;

export const typesInTableSelector = createSelector(typeListSelector, (types) => {
    if(types.length > 0) {
        const _types = types?.map((type, index) => {
            return {
                key: type._id,
                id: index,
                type: type.name,
                status: type.selling ? "Đang bán" : "Hết hàng",
            }
        })

        return _types;
    }
})