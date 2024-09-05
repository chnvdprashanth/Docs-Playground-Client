import { useEffect } from "react";
import { useGetUser } from "../contexts/User";

const User = () => {
  const { user } = useGetUser();
  const imgURL = "";

  const handleUserImage = async () => {
    try {
      const res = await fetch(
        `https://docs-playground.onrender.com/${user?.image}`
      );
      const imgBlob = res.blob();

      imgURL = URL.createObjectURL(imgBlob);
    } catch (err) {
      console.error("Error in Fetching Profile Image: ",err);
    }
  };
  useEffect(() => {
    handleUserImage();
  });

  if (user === null) return;

  return (
    <div>
      <img
        src={imgURL}
        alt="user-profile"
        className="rounded-full"
      />
    </div>
  );
};

export default User;
