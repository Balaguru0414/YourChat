import { GoogleOutlined } from "@ant-design/icons";
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { auth } from "../firebase";
import person from "../assets/person.png";

const Login = () => {
  return (
    <div className="w-full min-h-screen bg-[#111] flex flex-wrap-reverse items-center justify-around">
      <img className="w-[500px] rounded-lg" src={person} alt="person" />
      <div
        className="w-[400px] h-72 max-md:mt-10 p-5 text-center  
       bg-transparent rounded-md border
      flex flex-col justify-between"
      >
        <h2 className="font-bold text-white text-3xl">Welcome to</h2>
        <h1 className="font-bold text-white text-6xl">
          Your<span className="text-blue-600 ">Chat</span>
          <span className="text-green-600">!</span>
        </h1>

        <div
          className="login-button text-white bg-[#f45742] fc 
        justify-center gap-2"
          onClick={() => signInWithRedirect(auth, new GoogleAuthProvider())}
        >
          <GoogleOutlined /> <span>Sign With Google</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
