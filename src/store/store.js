import { configureStore } from "@reduxjs/toolkit";
import reducer from "./authsSilce";

const store = configureStore({
    reducer : reducer
});

export default store