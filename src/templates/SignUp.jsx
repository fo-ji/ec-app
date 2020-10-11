import { TextField } from "@material-ui/core/TextField";
import React, { useState, useCallback } from "react";
import {TextInput} from "../components/UIkit";

const SignUp = () => {

  const [username, setUsername]               = useState(""),
        [email, setEmail]                     = useState(""),
        [password, setPassword]               = useState(""),
        [confirmPassword, setConfirmPassword] = useState("");

  const inputUsername = useCallback((e) => {
    setUsername(e.target.value)
  }, [setUsername]);

  const inputEmail = useCallback((e) => {
    setEmail(e.target.value)
  }, [setEmail]);

  const inputPassword = useCallback((e) => {
    setPassword(e.target.value)
  }, [setPassword]);

  const inputConfirmPassword = useCallback((e) => {
    setConfirmPassword(e.target.value)
  }, [setConfirmPassword]);

  return (
    <div className="c-section-container">
      <h2 className="u-text__headline u-text-center">アカウント登録</h2>
      <div className="module-spacer--medium" />
      <TextInput 
        fullWidth={true} label={"ユーザー名"} multiline={false} required={true}
        rows={1} value={username} type={"text"} onChange={inputUsername}
      />
      <TextInput 
        fullWidth={true} label={"メールアドレス"} multiline={false} required={true}
        rows={1} value={email} type={"email"} onChange={inputEmail}
      />
      <TextInput 
        fullWidth={true} label={"パスワード"} multiline={false} required={true}
        rows={1} value={password} type={"password"} onChange={inputPassword}
      />
      <TextInput 
        fullWidth={true} label={"パスワード(確認用)"} multiline={false} required={true}
        rows={1} value={confirmPassword} type={"password"} onChange={inputConfirmPassword}
      />
    </div>
  )
}

export default SignUp;