import "./LandingPage.css";
import React from "react";
import Axios from "axios";
import { Link, withRouter } from "react-router-dom";
import { useSelector } from "react-redux";

function LandingPage(props) {
  const onLogoutHandler = () => {
    Axios.get("/api/users/logout").then((res) => {
      if (res.data.success) {
        props.history.push("/login");
        props.history.push("/");
      } else {
        alert("로그아웃에 실패했습니다");
      }
    });
  };

  const user = useSelector((state) => state.user);
  console.log("isLOGIN: ", user.userData);

  if (user.userData && user.userData.isAuth) {
    return (
      <div id="landing__container">
        <div id="container_title">
          {user.userData.name}님 방문을 환영합니다 😁
        </div>
        <div className="container_article">
          개인 영상을 저장할 수 있는 공간입니다
        </div>
        <div className="container_article">
          서로에게 상처되지 않는 <span className="point-red">따뜻한 댓글</span>
          부탁드립니다
        </div>
        <div className="container_article">
          사이트를 떠날 땐 반드시{" "}
          <button className="link_ghost" onClick={onLogoutHandler}>
            로그아웃
          </button>
          을 해주세요
        </div>
        <br />
        <div id="etc__container-landing">
          <Link to="/video/upload">
            <button className="btn_default-blue">업로드</button>
          </Link>
          <Link to="/video/explore">
            <button className="btn_default-green">저장소</button>
          </Link>
        </div>
      </div>
    );
  } else {
    return (
      <div id="landing__container">
        <div id="container_title">환영합니다 😊</div>
        <div className="container_article">
          <Link className="link_hover" to="/login">
            로그인
          </Link>
          을 하시겠습니까?
        </div>
        <div className="container_article">
          계정이 없으시다면
          <Link className="link_hover" to="/register">
            회원가입
          </Link>
          도 가능합니다
        </div>
      </div>
    );
  }
}

export default withRouter(LandingPage);
