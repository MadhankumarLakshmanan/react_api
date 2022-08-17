import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Style.css";
import DeleteUser from "./DeleteUser";
import { useNavigate, useLocation } from "react-router-dom";
import Modal from "./Modal";
import { CSVLink } from "react-csv";
function Main() {
  const location1 = useLocation();
  const [getter, setGetter] = useState([]);
  const [allData, setAllData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!location1.state) {
      axios
        .get(`https://jsonplaceholder.typicode.com/albums`)
        .then((response) => {
          //console.log(response);
          setGetter(response.data);
          setAllData(response.data);
        });
    } else {
      setGetter(location1.state.all);
      setAllData(location1.state.all);
    }
  }, [location1.state]);

  function handleClicked(event, data) {
    var payload = { data: data, allData: getter };
    console.log("Event Clicked");
    navigate("/details", { state: payload });
  }

  const DeleteData = (data) => {
    console.log("delete2");
    setGetter((data) => [...data]);
    // console.log(data);
  };

  const SaveData = (data) => {
    console.log("Save");
    var tempData = getter;
    tempData.push(data);
    setGetter((tempData) => [...tempData]);
    // console.log(data);
  };

  const SearchData = (e) => {
    let val = document.getElementById("search").value;
    var localData = allData;
    let tempData = localData.filter((x) => x.title.includes(val));
    // setGetter((tempData) => [...tempData]);
    setGetter(tempData);
    // console.log(data);
  };
  const header = [
    {
      lable: "id",
      key: "id",
    },
    {
      lable: "userId",
      key: "userId",
    },
    {
      lable: "title",
      key: "title",
    },
  ];
  const csvFile = {
    header: header,
    data: getter,
    filename: "data.csv",
  };

  const SortData = (event) => {
    const sortprops = [...allData].sort((access, access2) =>
      access.title > access2.title ? 1 : -1
    );
    setGetter(sortprops);
    // setAllData(sortprops);
    console.log(sortprops);
  };
  return (
    <div>
      <div style={{width: "250px"}}>
        <input type="text" id="search"></input>
        <button type="button" onClick={(event) => SearchData(event)}>
          Search
        </button>
        </div>
        <CSVLink className="csv" {...csvFile}>Export to CSV</CSVLink>
   
      <Modal saveData={SaveData} />
      <button className="sort" type="submit" onClick={(event) => SortData(event)}>
        Sort
      </button>
      <table className="tb">
        <tbody>
          <tr className="tr">
            <th className="th">Id</th>
            <th className="th">userId</th>
            <th className="th">Title</th>
            <th className="th">Action</th>
          </tr>
          {getter.map((post, i) => (
            <tr
              className="tr"
              onClick={(event) => handleClicked(event, post)}
              key={post.id}
            >
              <td name="id" className="td">
                {" "}
                {post.id}
              </td>
              <td name="userId" className="td">
                {post.userId}
              </td>
              <td name=" title" className="td">
                {post.title}
              </td>
              <td>
                <DeleteUser
                  data={post}
                  index={i}
                  allData={getter}
                  deleteData={DeleteData}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Main;
