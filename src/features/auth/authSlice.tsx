import { createSlice } from "@reduxjs/toolkit";

const user = localStorage.getItem("user");
const token = localStorage.getItem("token");

interface IUser {
  username: string;
  email: string;
  fname: string;
  lname: string;
}

interface IAuthState {
  user: IUser | null;
  token: string | null;
  isLoading: boolean;
  showAlert: boolean;
  alertText: string;
  alertType: string;
}

const initialState: IAuthState = {
  user: user ? JSON.parse(user) : null,
  token: token || null,
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
};

export const addUserToLocalStorage = (user: IUser, token: string) => {
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("token", token);
};
export const removeUserFromLocalStorage = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};

const AuthSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    clearAlert: (state) => {
      return {
        ...state,
        isLoading: false,
        showAlert: false,
        alertText: "",
        alertType: "",
      };
    },
    displayAlert: (state, action) => {
      const { alertText, alertType } = action.payload;
      return {
        ...state,
        showAlert: true,
        alertText: alertText,
        alertType: alertType,
      };
    },
    logout: (state) => {
      removeUserFromLocalStorage();
      return {
        ...state,
        user: null,
        token: "",
      };
    },
    setCredential: (state, action) => {
      addUserToLocalStorage(action.payload.user, action.payload.access_token);
      return {
        ...state,
        token: action.payload,
        user: action.payload.user,
      };
    },
  },
});

export const { logout, clearAlert, displayAlert, setCredential } =
  AuthSlice.actions;

export default AuthSlice.reducer;
