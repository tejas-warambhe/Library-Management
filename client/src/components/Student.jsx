import React from "react";
import ImageInput from './ImageInput';
export default function Student() {
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
          <label for="inputEmail3" className="col-sm-2 col-form-label">
            Name
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="inputEmail3"
              placeholder="Enter Name"
            />  
          </div>
        </div>
        <div className="form-group row">
          <label for="inputPassword3" className="col-sm-2 col-form-label">
            Class
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="inputPassword3"
              placeholder="Enter Class"
            />
          </div>

          <div className="col-sm-10">
            <ImageInput/>
          </div>

        </div>

        <div className="form-group row">
          <div className="col-sm-10">
            <button type="submit" className="btn btn-primary">
              Add
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
