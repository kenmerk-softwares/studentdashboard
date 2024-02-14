import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames";
import { CSSTransition } from "react-transition-group";
import { AppTopbar } from "./AppTopbar";
import { AppMenu } from "./AppMenu";
import { AppConfig } from "./AppConfig";
import { Routes, Route, useLocation } from "react-router-dom";
import Dashboard from "./components/Dashboard";

import Login from "./components/Login/Login";

import PrimeReact from "primereact/api";
import { Tooltip } from "primereact/tooltip";
import "primereact/resources/primereact.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "prismjs/themes/prism-coy.css";
import "./assets/demo/flags/flags.css";
import "./assets/demo/Demos.scss";
import "./assets/layout/layout.scss";
import "./App.scss";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Spinner from "./components/Spinner/Spinner";
import Users from "./components/Spinner/Users/Users";



const App = () => {
  const [layoutMode, setLayoutMode] = useState("overlay");
  const [layoutColorMode, setLayoutColorMode] = useState("light");
  const [inputStyle, setInputStyle] = useState("outlined");
  const [ripple, setRipple] = useState(true);
  const [staticMenuInactive, setStaticMenuInactive] = useState(false);
  const [overlayMenuActive, setOverlayMenuActive] = useState(false);
  const [mobileMenuActive, setMobileMenuActive] = useState(false);
  const [mobileTopbarMenuActive, setMobileTopbarMenuActive] = useState(false);
  const copyTooltipRef = useRef();
  const location = useLocation();
  const [loading,setloading] = useState(true);
  const navigate = useNavigate();
  PrimeReact.ripple = true;
  let menuClick = false;
  let mobileTopbarMenuClick = false;
  // get current usser
  const [User,setUser] = useState(null);
      const auth = getAuth();

  useEffect(()=>{

    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user.uid);
        setloading(false);
        // ...
      } else {
        setUser(null)
        // User is signed out
        // ...
        setloading(false);
      }
    });
  },[])

  useEffect(() => {
    if (mobileMenuActive) {
      addClass(document.body, "body-overflow-hidden");
    } else {
      removeClass(document.body, "body-overflow-hidden");
    }
  }, [mobileMenuActive]);

  useEffect(() => {
    copyTooltipRef &&
      copyTooltipRef.current &&
      copyTooltipRef.current.updateTargetEvents();
  }, [location]);

  const onInputStyleChange = (inputStyle) => {
    setInputStyle(inputStyle);
  };

  const onRipple = (e) => {
    PrimeReact.ripple = e.value;
    setRipple(e.value);
  };

  const onLayoutModeChange = (mode) => {
    setLayoutMode(mode);
  };

  const onColorModeChange = (mode) => {
    setLayoutColorMode(mode);
  };

  const onWrapperClick = (event) => {
    if (!menuClick) {
      setOverlayMenuActive(false);
      setMobileMenuActive(false);
    }

    if (!mobileTopbarMenuClick) {
      setMobileTopbarMenuActive(false);
    }

    mobileTopbarMenuClick = false;
    menuClick = false;
  };

  const onToggleMenuClick = (event) => {
    menuClick = true;

    if (isDesktop()) {
      if (layoutMode === "overlay") {
        if (mobileMenuActive === true) {
          setOverlayMenuActive(true);
        }

        setOverlayMenuActive((prevState) => !prevState);
        setMobileMenuActive(false);
      } else if (layoutMode === "static") {
        setStaticMenuInactive((prevState) => !prevState);
      }
    } else {
      setMobileMenuActive((prevState) => !prevState);
    }

    event.preventDefault();
  };

  const onSidebarClick = () => {
    menuClick = true;
  };

  const onMobileTopbarMenuClick = (event) => {
    mobileTopbarMenuClick = true;

    setMobileTopbarMenuActive((prevState) => !prevState);
    event.preventDefault();
  };

  const onMobileSubTopbarMenuClick = (event) => {
    mobileTopbarMenuClick = true;

    event.preventDefault();
  };

  const onMenuItemClick = (event) => {
    if (!event.item.items) {
      setOverlayMenuActive(false);
      setMobileMenuActive(false);
    }
      if (event.item.label === "LogOut") {
        auth
          .signOut()
          .then(() => {
            setUser(null);
          })
          .catch((err) => {
            console.log(err);
          });
      }
  };
  const isDesktop = () => {
    return window.innerWidth >= 992;
  };

  const menu = [
  
    {
      label: "Dashboard",
      icon: "pi pi-fw pi-search",
      items: [
     {
          label: "Home",
          icon: "pi pi-fw pi-home",
          to: "/",
        },
        

        {
          label: "Demo",
          icon: "pi pi-fw pi-user",
          items: [
            {
              label: "demo",
              icon: "pi pi-tags",
              to: "/levelten",
            },
            {
              label: "demo",
              icon: "pi pi-tags",
              to: "/",
            },
            {
              label: "LogOut",
              icon: "pi pi-tags",
              to: "/",
            },
           
          ],
        },
        

      ],
    },
    
  
  
  ];

  const addClass = (element, className) => {
    if (element.classList) element.classList.add(className);
    else element.className += " " + className;
  };

  const removeClass = (element, className) => {
    if (element.classList) element.classList.remove(className);
    else
      element.className = element.className.replace(
        new RegExp(
          "(^|\\b)" + className.split(" ").join("|") + "(\\b|$)",
          "gi"
        ),
        " "
      );
  };

  const wrapperClass = classNames("layout-wrapper", {
    "layout-overlay": layoutMode === "overlay",
    "layout-static": layoutMode === "static",
    "layout-static-sidebar-inactive":
      staticMenuInactive && layoutMode === "static",
    "layout-overlay-sidebar-active":
      overlayMenuActive && layoutMode === "overlay",
    "layout-mobile-sidebar-active": mobileMenuActive,
    "p-input-filled": inputStyle === "filled",
    "p-ripple-disabled": ripple === false,
    "layout-theme-light": layoutColorMode === "light",
  });
  return (
    <div className={wrapperClass} onClick={onWrapperClick}>
    {loading?(
      <Spinner/>
    ):(
      <>
        {User ? (
          <>
            {" "}
            <Tooltip
              ref={copyTooltipRef}
              target=".block-action-copy"
              position="bottom"
              content="Copied to clipboard"
              event="focus"
            />
            <AppTopbar
              onToggleMenuClick={onToggleMenuClick}
              layoutColorMode={layoutColorMode}
              mobileTopbarMenuActive={mobileTopbarMenuActive}
              onMobileTopbarMenuClick={onMobileTopbarMenuClick}
              onMobileSubTopbarMenuClick={onMobileSubTopbarMenuClick}
            />
           
          </>
        ) : null}

        <div className="layout-main-container">
          <div className="layout-main">
            {User ? (
              <>
                <Routes>
                  {/* <Route path="/" exact render={() => <Dashboard colorMode={layoutColorMode} location={location} />} /> */}
                  <Route path="/" element={<Dashboard />} />
                     <Route path="/users" element={<Users />} />

                  
                </Routes>
              </>
            ) : (
              <Routes>
                <Route path="/" element={<Login />} />
              </Routes>
            )}
          </div>
          {/* <AppFooter layoutColorMode={layoutColorMode} /> */}
        </div>

        <AppConfig
          rippleEffect={ripple}
          onRippleEffect={onRipple}
          inputStyle={inputStyle}
          onInputStyleChange={onInputStyleChange}
          layoutMode={layoutMode}
          onLayoutModeChange={onLayoutModeChange}
          layoutColorMode={layoutColorMode}
          onColorModeChange={onColorModeChange}
        />

        <CSSTransition
          classNames="layout-mask"
          timeout={{ enter: 200, exit: 200 }}
          in={mobileMenuActive}
          unmountOnExit
        >
          <div className="layout-mask p-component-overlay"></div>
        </CSSTransition>
      </>
      )}
    </div>
  );
};

export default App;
