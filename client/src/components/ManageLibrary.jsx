import React, {useState} from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
function ManageLibrary() {
    const [startDate, setStartDate] = useState(new Date());
    const [startDate1, setStartDate1] = useState(new Date());
    console.log(startDate);
    
  return (
    <div className="container-fluid">
      <form
        className="container-fluid d-flex flex-column my-5 mx-5 shadow"
        style={{
          backgroundColor: "white",
          width: "80%",
          height: "50%",
          borderRadius: "0.5%",
        }}
      >
        <h1 className="text-center">Manage Library</h1>
        <div className="container-fluid d-flex m-5">
          <select
            className="form-control form-control mx-2"
            style={{ width: "30%" }}
          >
            <option>Select Student</option>
          </select>
          <select className="form-control form-control" style={{ width: "30%" }}>
            <option>Select Book</option>
            <option>Default select</option>
            <option>Default select</option>
          </select>
          <div className="mx-2 my-1">
          <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
          </div>
          <div className="my-1">
          <DatePicker selected={startDate1} onChange={(date) => setStartDate1(date)} />
          </div>
        </div>
      </form>
    </div>
  );
}

export default ManageLibrary;
