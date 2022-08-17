import React from "react";
debugger;
function DeleteUser(props) {
  // console.log(props);
  const DeleteParentData = (event) => {
    console.log("delete1");
    props.allData.splice(props.index, 1);
    props.deleteData(props.allData);
    event.stopPropagation();
  };
  return (
    <button style = {{width:"90%",backgroundColor:"red",width:"90%",borderColor:"#eae7e7",color:"#f2e5e5"}}onClick={(event) => DeleteParentData(event, props.data)}>
      Delete
    </button>
  );
}

export default DeleteUser;
