import React, { useState } from "react";

export default function IndividualStudent(props) {
  // console.log(uid);
  const [inputs, setinputs] = useState({
    name: props.name,
    classSection: props.classSection,
    imageUrl: props.imageUrl
  });

  const deleteStudent = async (e) => {
    console.log("here");
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/${props.uid}`, {
      method: "DELETE",
      headers: { token: localStorage.token },
    });
    const parseRes = await response.json();
    console.log(parseRes);
    props.fetchStudents();
  };

  const updateStudent = async (e) => {
    e.preventDefault();
    // console.log(inputs, "here");
    const { name, classSection, imageUrl } = inputs;
    console.log(imageUrl, "cow");
    const body = { name, classSection, imageUrl };
    const response = await fetch(
      `http://localhost:5000/updatestudent/${props.uid}`,
      {
        method: "PUT",
        headers: {
          token: localStorage.token,
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
    const parseRes = await response.json();
    console.log(parseRes);

    props.fetchStudents();
    setedit(!edit);
    // console.log(Students);
  };

  const [edit, setedit] = useState(false);
  const handleEdit = (e) => {
    e.preventDefault();
    setedit(!edit);

    console.log(edit);
  };
  const onChange = (e) => {
    setinputs({ ...inputs, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <div className="row">
        <div className="col">
          {!edit ? (
            <li>
              <div className="container">
                <div
                  className="card"
                  style={{ width: "58rem", marginTop: "25px" }}
                >
                  <div className="card-body row">
                    <h5 className="card-title col-8">
                      Name: {props.name} Class: {props.classSection} <img src={props.imageUrl} style={{width: '250px'}}/>
                    </h5>
                    <button
                      className="float-right col-2 btn btn-danger"
                      onClick={(e) => handleEdit(e)}
                    >
                      Edit
                    </button>
                    <button
                      className="float-right col-2 btn btn-primary"
                      onClick={(e) => deleteStudent(e)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ) : (
            <li>
              <form
                className="container-fluid d-flex flex-column my-5 mx-5 shadow"
                style={{
                  backgroundColor: "white",
                  width: "80%",
                  height: "50%",
                  borderRadius: "0.5%",
                }}
              >
                <h1 className="text-center">Update Student</h1>
                <div className="form-group row ">
                  <label
                    htmlFor="inputEmail3"
                    className="col-sm-2 col-form-label"
                  >
                    Name
                  </label>
                  <div className="col-sm-10">
                    <input
                      name="name"
                      type="text"
                      className="form-control"
                      id="inputEmail3"
                      placeholder="Enter Name"
                      value={inputs.name}
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label
                    htmlFor="inputPassword3"
                    className="col-sm-2 col-form-label"
                  >
                    Class
                  </label>
                  <div className="col-sm-10">
                    <input
                      name="classSection"
                      type="text"
                      className="form-control"
                      id="inputPassword3"
                      placeholder="Enter Class"
                      value={inputs.classSection}
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                  <div className="col-sm-10">
                  <input
        type="file"
        name="myImage"
        className="button btn btn-primary"
        onChange={(event) => {            
          setinputs({ imageUrl : URL.createObjectURL(event.target.files[0])});
          // setSelectedImage(event.target.files[0]);
          
        }}
      />
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-sm-10">
                    <button
                      type="submit"
                      className="btn btn-primary mx-2"
                      onClick={(e) => updateStudent(e)}
                    >
                      Update
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      onClick={(e) => handleEdit(e)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            </li>
          )}
        </div>
      </div>
    </div>
  );
}
