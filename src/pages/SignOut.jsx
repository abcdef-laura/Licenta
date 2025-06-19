import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

function SignOut() {
  const handleSignOut = () => {
    signOut(auth).then(() => {
      console.log("User signed out");
    });
  };

  return <button onClick={handleSignOut}>Sign Out</button>;
}

export default SignOut;
