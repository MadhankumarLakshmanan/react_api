import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Style.css";
debugger;

function ViewData() {
  const navigate = useNavigate();
  const location = useLocation();
  // var tmpData = {id:"",userID:"",}
  const [formData, setFormData] = useState(location.state.data);
  const [allDetails, setallDetails] = useState(location.state.allData);

  useEffect(() => {
    console.log("test");
    setFormData(location.state.data);
  }, [location.state.data]);

  // debugger;
  const Change = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const Submit = (d) => {
    setallDetails(location.state.allData);
    d.preventDefault();
    console.log(formData);
    let index = allDetails.findIndex((x) => x.id === formData.id);
    allDetails[index].userId = formData.userId;
    allDetails[index].title = formData.title;
    var payload1 = { dataprops: formData, all: allDetails };
    navigate("/", { state: payload1 });
    console.log(allDetails);
    //console.log(d.target.value);
    console.log("Submit");
  };

  return (
    <div className="wrapper">
      <h1>Edit Page</h1>
      <form className="form" onSubmit={(d) => Submit(d)}>
        <div className="parent">
          <div className="label">
            <label>UserId</label>
          </div>
          <div className="inputBox">
            <input
              type="text"
              name="userId"
              value={formData.userId}
              onChange={(event) => Change(event)}
            ></input>
          </div>
        </div>
        <div className="parent">
          <div className="label">
            <label>Title</label>
          </div>
          <div className="inputBox">
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={(event) => Change(event)}
            ></input>
          </div>
        </div>
        <div className="sub">
          <input type="submit" />
        </div>
        <button onClick={() => navigate("/")}>Go back</button>
      </form>
    </div>
  );
}

export default ViewData;
