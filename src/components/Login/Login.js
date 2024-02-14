import React from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import "./login.css";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../Config/Config";
import { Toast } from "primereact/toast";

export default function Login() {
    const [e_mail, sete_mail] = React.useState();
    const [password, setpassword] = React.useState();
    const toast = React.useRef(null);

    const user_validation = (e) => {
        e.preventDefault();
        const auth = getAuth(app);
        signInWithEmailAndPassword(auth, e_mail, password)
            .then((userCredential) => {

            })
            .catch((error) => {
     
                toast.current.show({ severity: "error", summary: "Something Went Wrong", detail: "Check your email and password", life: 5000 });
            });
    };
    return (
        <>
            <div className="box">
                <div className="text-center mb-5">
                    {/* <img src={logo} alt="hyper" height="50" className="mb-3" /> */}
                    <div className="text-900 text-3xl font-1rem mb-3">Welcome Back</div>
                </div>
                <form onSubmit={user_validation}>
                    <div>
                        <label htmlFor="email1" className="block text-900 font-medium mb-2">
                            Email
                        </label>
                        <InputText
                            id="email1"
                            type="email"
                            value={e_mail}
                            className="w-full mb-3"
                            onChange={(e) => {
                                sete_mail(e.target.value);
                            }}
                            required
                        />

                        <label htmlFor="password1" className="block text-900 font-medium mb-2">
                            Password
                        </label>
                        <InputText
                            id="password1"
                            type="password"
                            value={password}
                            className="w-full mb-3"
                            onChange={(e) => {
                                setpassword(e.target.value);
                            }}
                            required
                        />

                        

                        <Button label="Sign In" icon="pi pi-user" className="w-full mb-5 p-button-help" type="submit" />
                        
                    </div>
                </form>
            </div>
            <Toast ref={toast} />
        </>
    );
}
