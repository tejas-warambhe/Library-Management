import React, { useState, useEffect } from "react";
import IndividualStudent from "./Individual/IndividualStudent";
import ImageInput from './ImageInput';
export default function Student() {
  const [Students, setStudents] = useState([]);
  const [imageUrl, setimageUrl] = useState("");
  const [inputs, setinputs] = useState({
    name: "",
    classSection: "",
    imageUrl: imageUrl
  });
  const addStudent = async (e) => {
    e.preventDefault();

    const { name, classSection } = inputs;
    // const class = classSection;
    const body = { name, classSection, imageUrl };
    const response = await fetch("http://localhost:5000/addstudent", {
      method: "POST",
      headers: {
        token: localStorage.token,
        "Content-type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const parseRes = await response.json();
    console.log(parseRes);

    fetchStudents();
    // console.log(Students);
  };
  const fetchStudents = async () => {
    const response = await fetch("http://localhost:5000/students", {
      method: "GET",
      headers: { token: localStorage.token },
    });
    const parseRes = await response.json();
    setStudents(parseRes);
  };

  const onChange = (e) => {
    setinputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const clearInputs = (e) => {
    e.preventDefault();
    setinputs({
      name: "",
      classSection: "",
      imageUrl: imageUrl
    });
  };
  useEffect(() => {
    fetchStudents();
  
   
  }, []);
  
  const handleImage = (url) =>{
    console.log(url, "here");
    setimageUrl(url);
  }

  return (
    <div className="container">
      <form
        className="container-fluid d-flex flex-column my-5 mx-5 shadow"
        style={{
          backgroundColor: "white",
          width: "80%",
          height: "50%",
          borderRadius: "0.5%",
        }}
      >
        <h1 className="text-center">Add students</h1>
        <div className="form-group row ">
          <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
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
          <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">
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
        </div>
        <div className="form-group row">
          
          <div className="col-sm-10">
            <ImageInput handleImage={handleImage}/>                 
          </div>
        </div>

        <div className="form-group row">
          <div className="col-sm-10">
            <button
              type="submit"
              className="btn btn-primary mx-2"
              onClick={(e) => addStudent(e)}
            >
              Add
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={(e) => clearInputs(e)}
            >
              Clear/Cancel
            </button>
          </div>
        </div>
      </form>
      <div className="container">
        {Students.map((Element, key) =>{
        return  <IndividualStudent imageUrl={Element.imageUrl} name={Element.name} classSection={Element.classSection} uid={Element._id}fetchStudents={() => fetchStudents()} key={key}/>
        })}
      </div>
    </div>
  );
}
