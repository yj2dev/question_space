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
            alert("????????? ????????? ??????????????????.");
          }
        });
      } else {
        console.log("File Upload State : Failed");
        alert("????????? ???????????? ??????????????????");
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
        alert("??????????????? ???????????? ????????????.");
        setTimeout(() => {
          props.history.push("/");
        }, 200);
        console.log("Data =>  DB : Succeed");
      } else {
        console.log("Data =>  DB : Failed");
        alert("????????? ???????????? ??????????????????.");
      }
    });
  };

  return (
    <div id="upload__container">
      <Link to="/">
        <button className="link_back-upload">????????????</button>
      </Link>
      <div id="container_title">?????? ?????????</div>
      <form id="upload__form" onSubmit={onSubmit}>
        <div className="dropzone__container">
          <Dropzone onDrop={onDrop} multiple={false} maxSize={10_0000_0000}>
            {({ getRootProps, getInputProps }) => (
              <div className="dropzone_content" {...getRootProps()}>
                <input {...getInputProps()} />
                <div className="ico_drop">???</div>
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
            <legend>??????</legend>
            <input
              type="text"
              placeholder="???????????? ???????????? ????????? ???????????????"
              value={VideoTitle}
              onChange={onVideoTitleHandler}
            />
          </fieldset>
          <fieldset>
            <legend>??????</legend>
            <label></label>
            <textarea
              placeholder="??????????????? ???????????? ?????? ???????????????"
              value={VideoDesc}
              onChange={onVideoDescHandler}
            />
          </fieldset>
          <fieldset className="upload_option">
            <legend>?????? ??????</legend>
            ????????????
            <select onChange={onPrivateHandler}>
              <option value="0">Private</option>
              <option value="1">Public</option>
            </select>
            <span className="ico_select">|</span> ????????????
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
            ?????????
          </button>
        </div>
      </form>
    </div>
  );
}
export default withRouter(VideoUploadPage);
