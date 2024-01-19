import { ChatEngine } from "react-chat-engine";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./Loading";

const Chats = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  const handleLogout = async () => {
    await signOut(auth);

    navigate("/");
  };

  const getFile = async (url) => {
    const res = await fetch(url);
    const data = await res.blob();

    return new File([data], "userPhoto.jpg", { type: "image/jpeg" });
  };

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }

    axios
      .get("https://api.chatengine.io/users/me/", {
        headers: {
          "project-id": process.env.REACT_APP_CHAT_PROJECT_ID,
          "user-name": user.email,
          "user-secret": user.uid,
        },
      })
      .then(() => setLoading(false))
      .catch(() => {
        let formData = new FormData();
        formData.append("email", user.email);
        formData.append("username", user.email);
        formData.append("secret", user.uid);

        getFile(user.photoURL).then((avatar) => {
          formData.append("avatar", avatar, avatar.name);

          axios
            .post("https://api.chatengine.io/users/", formData, {
              headers: {
                "PRIVATE-KEY": process.env.REACT_APP_CHAT_PRIVATE_KEY,
              },
            })
            .then(() => setLoading(false))
            .catch((err) => console.error(err));
        });
      });
  }, [user, navigate]);

  if (!user || loading) return <Loading />;
  return (
    <div className="absolute w-full h-screen">
      <div className="h-[66px] w-full bg-black sticky top-0 z-10 px-10 fc justify-between">
        <div className="text-white text-3xl font-bold">
          Your<span className="text-blue-600">Chat</span>
        </div>
        <div
          onClick={handleLogout}
          className="fc justify-center text-white text-xl border rounded 
          py-1 px-4 cursor-pointer hover:bg-blue-600 hover:border-none"
        >
          Logout
        </div>
      </div>
      <ChatEngine
        height="calc(100vh-66px)"
        projectID={process.env.REACT_APP_CHAT_PROJECT_ID}
        userName={user.email}
        userSecret={user.uid}
      />
    </div>
  );
};

export default Chats;
