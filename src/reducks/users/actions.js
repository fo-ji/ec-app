// import { useStore } from "react-redux";

export const SIGN_IN = "SIGN_IN";
export const signInAction = (userState) => {
  return {
    type: "SIGN_IN",
    pay_load: {
      isSigned: true,
      uid: userState.uid,
      username: userState.username
    }
  }
};

export const SIGN_OUT = "SIGN_OUT";
export const signOutAction = () => {
  return {
    type: "SIGN_OUT",
    pay_load: {
      isSigned: false,
      uid: "",
      username: ""
    }
  }
};
