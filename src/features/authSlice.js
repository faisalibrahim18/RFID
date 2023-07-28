import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";

const initialState = {
  user: null,
  isError: false,
  isSucces: false,
  isLoading: false,
  // const: localStorage.getItem("isLogged", response.data?.data?.token?.token) || false,
  isLoggedIn: localStorage.getItem("isLoggedIn", JSON.stringify(false)) || false,
  message: "",
};

export const LoginUser = createAsyncThunk("user/loginUser", async (user, thunkAPI, credential) => {
  try {
    const API_URL = import.meta.env.VITE_API_KEY;
    const response = await axios.post(`${API_URL}/api/v1/rfid/signin/user`, {
      username: user.username,
      password: user.password,
    });

    // console.log(response);
    // console.log(response.data?.data?.token);
    localStorage.setItem("token", response.data?.data?.token, true);
    // localStorage.setItem("user", JSON.stringify(response.data?.data?.token.result), true);
    // console.log("Bearer", response);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-right",
        iconColor: 'white',
        customClass: {
          popup: 'colored-toast'
        },
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
      Toast.fire({
        icon: "error",
        text: error.response.data.msg,
      });
      const message = error.response.data.msg;
      return thunkAPI.rejectWithValue(message);
    }
  }
});

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return { isLoggedIn: true };
    case "LOGOUT":
      return { isLoggedIn: false };
    default:
      return state;
  }
};
export const UserLogOut = async function () {
  try {
    await Parse.User.logOut();
    // To verify that current user is now empty, currentAsync can be used
    const currentUser = await Parse.User.current();
    if (currentUser === null) {
      alert("Success! No user is logged in anymore!");
    }
    // Update state variable holding current user

    return true;
  } catch (error) {
    alert(`Error! ${error.message}`);
    return false;
  }
};
export const getMe = createAsyncThunk("user/getMe", async (_, thunkAPI) => {
  try {
    const API_URL = import.meta.env.VITE_API_KEY;
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/api/v1/rfid/getUserSignedIn`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    if (error.response) {
      const message = error.response.data.msg;
      return thunkAPI.rejectWithValue(message);
    }
  }
});

// export const LogOut = createAsyncThunk("user/LogOut", async () => {
//   await axios.delete("http://localhost:9000/api/v1/rfid/logout").then(({ data }) => {
//     Swal.fire({
//       icon: "success",
//       text: data.message,
//     });
//   });
// });

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(LoginUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(LoginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSucces = true;
      state.user = action.payload;
    });
    builder.addCase(LoginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    // get user Login
    builder.addCase(getMe.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getMe.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSucces = true;
      state.user = action.payload;
    });
    builder.addCase(getMe.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
