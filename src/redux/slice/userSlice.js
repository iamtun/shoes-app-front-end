import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import jwt from "jsonwebtoken";

const userSlice = createSlice({
    name: "user",
    initialState: { info: null },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLoginData.fulfilled, (state, action) => {
                const { user, token, message } = action.payload;
                if (message) {
                    alert(message);
                } else {
                    localStorage.setItem(process.env.REACT_APP_TOKEN, token);
                    state.info = user;
                }
            })
            .addCase(fetchUserInfo.fulfilled, (state, action) => {
                const { user } = action.payload;
                state.info = user;
            });
    },
});

export const fetchLoginData = createAsyncThunk("user/login", async (data) => {
    try {
        const { username, password } = data;
        const req = await fetch(
            `${process.env.REACT_APP_API_LINK}/auth/login`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            }
        );

        const res = await req.json();
        const { token, message } = res;

        if (token) {
            const { userId } = jwt.decode(token);
            if (userId) {
                const req = await fetch(
                    `${process.env.REACT_APP_API_LINK}/users/${userId}`
                );

                const res = await req.json();

                return { user: res.data, token };
            }
        }

        if (message) return { message };
    } catch (error) {
        console.warn(`[fetchLoginData] -> ${error}`);
    }
});

export const fetchUserInfo = createAsyncThunk("user/getInfo", async (token) => {
    try {
        if (token) {
            const { userId } = jwt.decode(token);
            if (userId) {
                const req = await fetch(
                    `${process.env.REACT_APP_API_LINK}/users/${userId}`
                );

                const res = await req.json();

                return { user: res.data };
            }
        }
    } catch (error) {
        console.warn(`[fetchUserInfo] -> ${error}`);
    }
});

export default userSlice;
