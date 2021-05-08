import "./VideoUploadPage.css";
import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import Dropzone from "react-dropzone";
import Axios from "axios";
import { useSelector } from "react-redux";

function VideoUploadPage(props) {
  const user = useSelector((state) => state.user);
  const [VideoTitle, setVideoTitle] = useState("");
  const [VideoDesc, setVideoDesc] = useState("");
  const [Private, setPrivate] = useState("0");
  const [Category, setCategory] = useState("0");
  const [FilePath, setFilePath] = useState("");
  const [Duration, setDuration] = useState("");
  const [ThumbnailPath, setThumbnailPath] = useState("");

  const CategoryOptions = [
    { value: 0, label: "Animals" },
    { value: 1, label: "Cars" },
    { value: 2, label: "Kids" },
    { value: 3, label: "Music" },
    { value: 4, label: "Picture" },
    { value: 5, label: "Sport" },
    { value: 6, label: "Game" },
  ];
  const onVideoTitleHandler = (e) => {
    setVideoTitle(e.currentTarget.value);
  };
  const onVideoDescHandler = (e) => {
    setVideoDesc(e.currentTarget.value);
  };
  const onPrivateHandler = (e) => {
    setPrivate(e.currentTarget.value);
    console.log(e.currentTarget.value);
  };
  const onCategoryHandler = (e) => {
    setCategory(e.currentTarget.value);
    console.log(e.currentTarget.value);
  };
  const onDrop = (files) => {
    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    formData.append("file", files[0]);
    Axios.post("/api/video/uploadfiles", formData, config).then((res) => {
      if (res.data.success) {
        console.log("RES.DATA:", res.data);
        console.log("File Upload State : Succeed");

        let variable = {
          url: res.data.url,
          fileName: res.data.fileName,
        };

        setFilePath(res.data.url);

        Axios.post("/api/video/thumbnail", variable).then((res) => {
          if (res.data.success) {
            console.log("Create Video Thumbnail : Succeed");
            console.log(res.data);

            setDuration(res.data.fileDuration);
            setThumbnailPath(res.data.url);
          } else {
            console.log("Create Video Thumbnail : Failed");
            alert("썸네일 생성을 실패했습니다.");
          }
        });
      } else {
        console.log("File Upload State : Failed");
        alert("비디오 업로드를 실패했습니다");
      }
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const variables = {
      writer: user.userData._id,
      title: VideoTitle,
      description: VideoDesc,
      privacy: Private,
      filePath: FilePath,
      category: Category,
      duration: Duration,
      thumbnail: ThumbnailPath,
    };

    Axios.post("/api/video/uploadVideo", variables).then((res) => {
      if (res.data.success) {
        alert("성공적으로 업로드를 했습니다.");
        setTimeout(() => {
          props.history.push("/");
        }, 200);
        console.log("Data =>  DB : Succeed");
      } else {
        console.log("Data =>  DB : Failed");
        alert("비디오 업로드에 실패했습니다.");
      }
    });
  };

  return (
    <div id="upload__container">
      <Link to="/">
        <button className="link_back-upload">뒤로가기</button>
      </Link>
      <div id="container_title">영상 업로드</div>
      <form id="upload__form" onSubmit={onSubmit}>
        <div className="dropzone__container">
          <Dropzone onDrop={onDrop} multiple={false} maxSize={10_0000_0000}>
            {({ getRootProps, getInputProps }) => (
              <div className="dropzone_content" {...getRootProps()}>
                <input {...getInputProps()} />
                <div className="ico_drop">╋</div>
              </div>
            )}
          </Dropzone>
          {ThumbnailPath && (
            <div className="dropzone_article">
              <img
                src={`http://localhost:8004/${ThumbnailPath}`}
                alt="video_thumbnail"
              />
            </div>
          )}
        </div>
        <div className="upload_content">
          <fieldset>
            <legend>제목</legend>
            <input
              type="text"
              placeholder="동영상을 설명하는 제목을 추가하세요"
              value={VideoTitle}
              onChange={onVideoTitleHandler}
            />
          </fieldset>
          <fieldset>
            <legend>설명</legend>
            <label></label>
            <textarea
              placeholder="시청자에게 동영상에 대해 알려주세요"
              value={VideoDesc}
              onChange={onVideoDescHandler}
            />
          </fieldset>
          <fieldset className="upload_option">
            <legend>필수 선택</legend>
            공개범위
            <select onChange={onPrivateHandler}>
              <option value="0">Private</option>
              <option value="1">Public</option>
            </select>
            <span className="ico_select">|</span> 카테고리
            <select onChange={onCategoryHandler}>
              {CategoryOptions.map((item, index) => (
                <option key={index} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </fieldset>
        </div>
        <div id="etc__container-uplaod">
          <button className="btn_next" type="submit" onClick={onSubmit}>
            업로드
          </button>
        </div>
      </form>
    </div>
  );
}
export default withRouter(VideoUploadPage);
