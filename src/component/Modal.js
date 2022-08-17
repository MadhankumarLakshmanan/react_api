import React, { useState } from "react";
// import ReactDOM from "react-dom";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "100%",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

//set a element to our root dom by id
Modal.setAppElement(document.getElementById('root'))

export default function ModalComponent(props) {
  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  const Change = (event) => {
    //  formData[e.target.name] =  e.target.value;
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const Submit = (d) => {
    d.preventDefault();
    console.log(formData);
    props.saveData(formData);
    console.log("Submit");
    closeModal();
  };

  return (
    <div>
      <button className="click" onClick={openModal}>Create User</button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div style={{ textAlign: "right" }}>
          <button onClick={closeModal}>X</button>
        </div>
        <div style={{ textAlign: "center" }}>
          <div classname="div">
            <h2>Create User</h2>
          </div>
          <form className="form" onSubmit={(d) => Submit(d)}>
            <div className="parent">
              <div className="label">
                <label>Id</label>
              </div>
              <div className="inputBox">
                <input
                  type="text"
                  name="id"
                  value={formData.id}
                  onChange={(event) => Change(event)}
                ></input>
              </div>
            </div>
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
      </Modal>
    </div>
  );
}
