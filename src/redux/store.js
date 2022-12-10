import { configureStore } from "@reduxjs/toolkit";
import productTypeSlice from "./slice/productTypeSlice";
import userSlice from "./slice/userSlice";

const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        types: productTypeSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            immutableCheck: false,
            serializableCheck: false,
        }),
});

export default store;
