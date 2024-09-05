import { useEffect, useState } from "react";
import { useGetUser } from "../contexts/User";

const User = () => {
  const { user } = useGetUser();
  const [imgURL, setImgURL] = useState("");

  useEffect(() => {
    const handleUserImage = async () => {
      try {
        const res = await fetch(
          `https://docs-playground.onrender.com/${user?.image}`,{
            method: "GET",
            credentials: "include"
          }
        );
        const imgBlob = await res.blob();
  
        setImgURL(URL.createObjectURL(imgBlob));
      } catch (err) {
        console.error("Error in Fetching Profile Image: ", err);
      }
    };
    if(user?.image){
      handleUserImage();
    }
  },[user]);

  if (user === null) return;

  return (
    <div>
      <img src={imgURL} alt="user-profile" className="rounded-full" />
    </div>
  );
};

export default User;
