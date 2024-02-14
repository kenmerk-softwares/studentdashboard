import React, { useEffect, useState ,useRef} from "react";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, getDocs, query,updateDoc,addDoc,doc,setDoc } from "firebase/firestore";
import { app,db } from "../../Config/Config";
import Stack from "@mui/material/Stack";
import LinearProgress from '@mui/material/LinearProgress';

import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function Forms() {

  const auth = getAuth(app);
  const [user, setuser] = useState(null);
  const [user_email, setuser_email] = useState(null);

  //state variables
    const [loading, setloading] = useState(false);
      const [availableBooks, setAvailableBooks] = useState([]);
        const [level, setlevel] = useState(null);
        
      const storage = getStorage();
        const toast = useRef(null);
           var date_today = new Date();

  return (
   <>
      <Toast ref={toast}></Toast>
      {loading === true ? (
       <div style={{ width: '50%', margin: 'auto' }}>
      <LinearProgress style={{ height: 10, backgroundColor: '#e0e0e0' }} />
    </div>
      ) : (

     <>
           
<div className="col-12">
          <div className="">
            <h2>Forms</h2>
            <form >
              <div className="p-fluid formgrid grid">

               
                <div className="field col-12 md:col-6">
                   <label htmlFor="lastname2">
                      Book No<span style={{ color: "red" }}>*</span>
                    </label>
                  <FormControl fullWidth>
             
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Age"
                       value={"1"}
                    //   onChange={(e) => {
                    //     handleChange1(e);
                    //   }}
                    >
                  
              <MenuItem key={"1"} value={"1"}>
            1
              </MenuItem>
            )
   
                    </Select>
                  </FormControl>
                  </div>
                 
                   <div className="field col-12 md:col-6">
                    <label htmlFor="lastname2">
                      Book Name<span style={{ color: "red" }}>*</span>
                    </label>
                    <InputText
                      id="state"
                      className="mr-2 mb-2"
       
                      required
                    ></InputText>
                  </div>
                  
                   <div className="field col-12 md:col-12">
                    <label htmlFor="lastname2">
                      Book introduction<span style={{ color: "red" }}>*</span>
                    </label>
                    <InputTextarea
                      id="state"
                      className="mr-2 mb-2"
               
                      required
                         style={{height:'200px'}}
                    ></InputTextarea>
                  </div>
                
                  </div>
                   
                  <div className="col-12">
                  <div className="card">
                    <h6> Image</h6>
                    <br />
                    <div >
                    <div
       
        className="card"
        style={{
          border: '4px dashed #625b73',
          padding: '20px',
          textAlign: 'center',
          cursor: 'pointer'
        }}
      >
        <label htmlFor="fileInput">click Here to select</label>
        <input
          type="file"
          id="fileInput"
        //   onChange={handleSelectChangeapp}
          style={{ display: 'none' }}
        />
      </div>
      <br/>
                    </div>
                  </div>
                </div>
           
              <Button
                label="Add "
                className="p-button p-button-success"
                type="submit"
              />
                 </form>
          </div>
          </div>
          </>
           )}
          </>
     
  
  )
}

