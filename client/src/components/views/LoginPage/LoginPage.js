import "./LoginPage.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../_actions/user_action";
import { withRouter } from "react-router-dom";

function LoginPage(props) {
  const dispatch = useDispatch();

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const onEmailHandler = (e) => {
    setEmail(e.currentTarget.value);
  };

  const onPasswordHandler = (e) => {
    setPassword(e.currentTarget.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    let body = {
      email: Email,
      password: Password,
    };

    dispatch(loginUser(body)).then((res) => {
      if (res.payload.loginSuccess) {
        props.history.push("/");
      }
    });
  };

  return (
    <div id="login__container">
      <Link to="/">
        <button className="link_back-login">뒤로가기</button>
      </Link>
      <div id="container_title">로그인</div>
      <form id="login__form" onSubmit={onSubmitHandler}>
        <input
          className="input_account"
          type="email"
          placeholder="이메일"
          value={Email}
          onChange={onEmailHandler}
        />
        <input
          className="input_account"
          type="password"
          placeholder="비밀번호"
          value={Password}
          onChange={onPasswordHandler}
        />

        <div id="ect__container-login">
          <Link className="link_hover link_register" to="/register">
            회원가입
          </Link>
          <button className="btn_next" type="submit">
            다음
          </button>
        </div>
      </form>
    </div>
  );
}

export default withRouter(LoginPage);
