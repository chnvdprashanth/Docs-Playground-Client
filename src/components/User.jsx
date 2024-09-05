import { useState } from "react";
import { useGetUser } from "../contexts/User";

const User = () => {
  const { user } = useGetUser();
  const [toggleUserOptions,setToggleUserOptions] = useState(false);

  if (user === null) return;

  return (
    <div>
      <img src={user?.image} alt="user-profile" className="relative rounded-full" onClick={()=>setToggleUserOptions(true)} />
      {
        toggleUserOptions && (
          <div className="bg-zinc-800 opacity-25 absolute w-auto h-auto p-2 flex flex-col items-center gap-y-2">
            <li>{user?.name}</li>
            <li>Sign Out</li>
          </div>
        )
      }
    </div>
  );
};

export default User;
