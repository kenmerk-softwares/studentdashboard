import React ,
{useEffect,useState} from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { getAuth, onAuthStateChanged } from "firebase/auth";
// import logo from './psc.webp'


export const AppTopbar = (props) => {
       
      const [User,setUser] = useState(null);
      const auth = getAuth();

  useEffect(()=>{

    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user.uid);
  
        // ...
      } else {
        setUser(null)
        // User is signed out
        // ...
      
      }
    });
  },[])
    return (
        <div className="layout-topbar" style={{background:"green"}}>
            <Link to="/" className="layout-topbar-logo">
                {/* <img src={logo} alt="logo"/> */}
                <span style={{color: 'white'}}>Student Dashboard </span>
            </Link>


                <ul className={classNames("layout-topbar-menu xl:flex origin-top", {'layout-topbar-menu-mobile-active': props.mobileTopbarMenuActive })}>
               
                     <li>
                        <button  className="p-link layout-topbar-button" label='logout'style={{color: 'white'}} onClick={()=>(
   auth
          .signOut()
          .then(() => {
            setUser(null);
          })
          .catch((err) => {
            console.log(err);
          })

                        )} >
                            <i className="pi pi-download"/> &nbsp;LOGOUT
                        </button>
                    </li>
                </ul>
        </div>
    );
}
