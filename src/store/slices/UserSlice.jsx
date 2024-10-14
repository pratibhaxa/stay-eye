import { LocalHospital } from "@mui/icons-material";
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: [],
    reducers: {
        addUser(state, action) {
            console.log("addUser state: ", action.payload);
            state.push(action.payload);
        },
        editUser(state, action) {},
        deleteUser(state, action) {},
        validateUser(state, action) {
            // console.log("validateUser state: ", action.payload);
            // console.log("inside validateUser");
            // // if (state.includes(action.payload)) {
            // //     return true;
            // // } else {
            // //     console.log("user does not exist");
            // // }
            // console.log("state.email: ", state.email);
            // console.log("action.payload.email: ", action.payload.email);
            // console.log("state.password: ", state.password);
            // console.log("action.payload.password: ", action.payload.password);
            // if (state.email == action.payload.email && state.password == action.payload.password) {
            //     console.log("user exists");
            //     return true;
            // }
        }
    }
})

export default userSlice.reducer;
export const { addUser, editUser, deleteUser, validateUser } = userSlice.actions;