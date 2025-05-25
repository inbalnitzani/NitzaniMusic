import React from "react";
import GoogleButton from 'react-google-button'


const LoginPage = () => {
    const handleLogin = () => {
        window.location.href = "https://nitzanimusic.onrender.com/auth/google";
    };

    return (
        <div style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "50vh" 
  }}>
            <GoogleButton
                onClick={handleLogin}
            />
        </div>
    );
};

export default LoginPage;
