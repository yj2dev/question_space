import "./VideoCardPage.css";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link, withRouter } from "react-router-dom";
import moment from "moment";

function VideoCardPage() {
  const [Video, setVideo] = useState([]);

  useEffect(() => {
    Axios.get("/api/video/getVideos").then((res) => {
      if (res.data.success) {
        console.log("Get Videos : Succeed");
        console.log("DB List : ", res.data);
        setVideo(res.data.videos);
      } else {
        console.log("Get Videos : Failed");
      }
    });
  }, []);
  const renderCards = Video.map((video, index) => {
    let minutes = Math.floor(video.duration / 60);
    let seconds = Math.floor(video.duration - minutes * 60);
    return (
      <a href={`/video/post${video._id}`} className="video__container">
        <img
          src={`http://localhost:8004/${video.thumbnail}`}
          alt="thumbnail_IMG"
        />
        <div className="duration__absolute">
          <div className="duration__relative">
            <span>
              {minutes}:{seconds < 10 ? `0${seconds}` : `${seconds}`}
            </span>
          </div>
        </div>
        <div className="video__info">
          <div className="title">
            <span className="profile__img">
              <img
                src="http://placehold.it/50x50"
                style={{ width: "45px", height: "45px", borderRadius: "50%" }}
              />
            </span>
            <span className=" video__title">{video.title}</span>
          </div>
          <div className="video__article video__writerName">
            {video.writer.name}
          </div>
          <div className="video__article video__date">
            {video.view} · {moment(video.createdAt).format("YY MMM Do ")}
          </div>
        </div>
      </a>
    );
  });

  return (
    <div id="card__container">
      <div id="container_nav">
        <Link to="/">
          <button className="link_back-card">뒤로가기</button>
        </Link>
      </div>
      <div id="container_title">업로드한 영상</div>
      <div className="card" style={{ display: "flex", flexWrap: "wrap" }}>
        {renderCards}
      </div>
    </div>
  );
}

export default withRouter(VideoCardPage);
