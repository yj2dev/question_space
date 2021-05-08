import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";

import Axios from "axios";

function VideoDetailPage(props) {
  const videoId = props.match.params.videoId;
  const variable = { videoId: videoId };
  console.log("videoId :: ", videoId);
  console.log("variable :: ", variable);

  const [VideoDetail, setVideoDetail] = useState([]);

  useEffect(() => {
    Axios.post("/api/video/getVideoDetail", variable).then((res) => {
      if (res.data.success) {
        console.log("Get Video State : Succeed");
        setVideoDetail(res.data.videoDetail);
      } else {
        console.log("Get Video State : Failed");
        alert("비디오 정보를 불러오지 못했습니다");
      }
    });
  }, []);

  return (
    <div>
      {/* <video
        style={{ width: "100%" }}
        src={`http://localhost:8004/uploads/1620346642093_Cat - 66004.mp4`}
        controls
      /> */}
      {/* <video src={`http://localhost:8004/${VideoDetail.filePath}`} controls /> */}
      <h2>{VideoDetail}</h2>
    </div>
  );
}

export default withRouter(VideoDetailPage);
