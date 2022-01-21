import React, { useEffect, useState } from "react";

const UploadAndDisplayImage = ({handleImage}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [current, setcurrent] = useState("");
  console.log(current);

  handleImage(current);
  
    
  return (
    <div className="container">
     
      {selectedImage && (                                 
        <div>
        <img alt="not fount" width={"250px"} src={URL.createObjectURL(selectedImage)}/>
        <br />
        <button className = "btn btn-primary">Remove</button>
        </div>
      )}
      <br />
     
      <br /> 
      <input
        type="file"
        name="myImage"
        className="button btn btn-primary"
        onChange={(event) => {            
          setcurrent(URL.createObjectURL(event.target.files[0]));
          setSelectedImage(event.target.files[0]);
          
        }}
      />
    </div>
  );
};

export default UploadAndDisplayImage;