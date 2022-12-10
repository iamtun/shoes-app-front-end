import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const productTypeSlice = createSlice({
    name: "type",
    initialState: { typeList: [] },
    extraReducers: (builder) => {
        builder.addCase(fetchProductTypes.fulfilled, (state, action) => {
            state.typeList = action.payload;
        })
    }
})

export const fetchProductTypes = createAsyncThunk('types/get-all', async () => {
    const res = await fetch(`${process.env.REACT_APP_API_LINK}/product-types`);
    const types = await res.json();
    return types.data;
})

export const addProductType = createAsyncThunk('types/add-product_type', async (type) => {
    const { name } = type;
    const res = await fetch(`${process.env.REACT_APP_API_LINK}/product-types`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify()
    })
})

export default productTypeSlice;