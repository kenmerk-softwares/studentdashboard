import React, { useState, useEffect, useRef } from "react";

  import { getAuth } from "firebase/auth";
  import {useNavigate} from 'react-router-dom'




const Dashboard = (props) => {
  const navigate=useNavigate();
  
  




  const auth = getAuth();
const [User,setUser]=useState(null);
useEffect(()=>{
  const user = auth.currentUser;

  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    // ...
    setUser(user);
  } else {
    // No user is signed in.
  }
},[])
  return (
    <div className="grid">
      <div className="col-12 lg:col-6 xl:col-12">
        <div className="card mb-0">
          <div className="flex justify-content-between mb-1">
            <div>
           
            </div>
          </div>
          <span className="text-black font-medium">
            Welcome To Dashboard{" "}
          </span>
          <span className="text-900 font-medium">{User?User.email:"Email"}</span>
        </div>
      </div>
      <div className="col-12 lg:col-6 xl:col-4" onClick={()=>(
navigate('/users')
   )}>
        <div className=" card mb-0">
          <div className="flex justify-content-between mb-1">
            <div>
              <span className="text-600 font-medium text-xl">Users</span>
    
            </div>
          
          </div>

        </div>
      </div>
      
      <div className="col-12 lg:col-6 xl:col-4" onClick={()=>(
navigate('/menu2')
   )}>
        <div className="card mb-0">
          <div className="flex justify-content-between mb-1">
            <div>
              <span className="text-600 font-medium text-xl">menu2</span>
         
            </div>
           
          </div>
          
        </div>
      </div>
      <div className="col-12 lg:col-6 xl:col-4" onClick={()=>(
navigate('/menu3')
   )}>
        <div className="card mb-0">
          <div className="flex justify-content-between mb-1">
            <div>
              <span className="text-600 font-medium text-xl">Menu3</span>
         
            </div>
           
          </div>
     
        </div>
      </div>
      <div className="col-12 lg:col-6 xl:col-4" onClick={()=>(
navigate('/menu3')
   )}>
        <div className="card mb-0">
          <div className="flex justify-content-between mb-1">
            <div>
              <span className="text-600 font-medium text-xl">Menu4</span>
         
            </div>
           
          </div>
     
        </div>
      </div>
<div className="col-12 lg:col-6 xl:col-4" onClick={()=>(
navigate('/menu3')
   )}>
        <div className="card mb-0">
          <div className="flex justify-content-between mb-1">
            <div>
              <span className="text-600 font-medium text-xl">Menu5</span>
         
            </div>
           
          </div>
     
        </div>
      </div>
      <div className="col-12 lg:col-6 xl:col-4" onClick={()=>(
navigate('/menu3')
   )}>
        <div className="card mb-0">
          <div className="flex justify-content-between mb-1">
            <div>
              <span className="text-600 font-medium text-xl">Menu6</span>
         
            </div>
           
          </div>
     
        </div>
      </div>
   

  
    </div>
  );
};



export default React.memo(Dashboard);
