import React from "react";
import { FaChevronRight } from "react-icons/fa6";
import { GoogleAuthProvider, GithubAuthProvider, signInWithRedirect } from "firebase/auth";
import { auth } from "../config/firebase.config";

const AuthButtonWithProvider = ({ Icon, label, provider }) => {

  const googleAuthProvider = new GoogleAuthProvider();
  const gitAuthProvider = new GithubAuthProvider();

  const handleClick = async () => {
    switch(provider){
      case "GoogleAuthProvider" :
       await signInWithRedirect(auth, googleAuthProvider).then((result) => {
        console.log(result)
       })
       .catch((err) => {
        console.log('Error : $(err.Message)');
       });
        break;

        case "GithubAuthProvider" :
          await signInWithRedirect(auth,  gitAuthProvider).then((result) => {
            console.log(result)
           })
           .catch((err) => {
            console.log('Error : $(err.Message)');
           });
          break;

          default:
            await signInWithRedirect(auth, googleAuthProvider).then((result) => {
        console.log(result)
       })
       .catch((err) => {
        console.log('Error : $(err.Message)');
       });
            break;
    }
  }
  return (
    <div onClick={handleClick} className="w-full flex justify-center">
      <div className="w-full lg:w-1/5 px-4 py-3 rounded-md border-2 border-blue-700 flex items-center cursor-pointer group hover:bg-blue-700 active:scale-95 duration-150 hover:shadow-md">
        <Icon className="text-txtPrimary text-xl group-hover:text-white mr-2" />
        <p className="flex-1 text-txtPrimary text-lg group-hover:text-white text-center">{label}</p>
        <FaChevronRight className="text-txtPrimary text-base group-hover:text-white ml-2" />
      </div>
    </div>
  );
};

export default AuthButtonWithProvider;
