import { useState } from "react";
import { useGetUser } from "../contexts/User";

const User = () => {
  const { user } = useGetUser();
  const [toggleUserOptions, setToggleUserOptions] = useState(false);

  if (user === null) return;

  return (
    <div>
      <img
        src={user?.image}
        alt="user-profile"
        className="relative rounded-full cursor-pointer"
        onClick={() => setToggleUserOptions(true)}
      />
      {toggleUserOptions && (
        <div className="bg-zinc-900/90 text-white absolute right-0 top-14 w-40 h-auto rounded-lg border-[1px] border-zinc-100 p-2 flex flex-col items-center gap-y-2">
          <p className="text-center w-full text-lg">{user?.name}</p>
          <button className="outline-none bg-red-600 px-4 py-2 rounded-lg">
            Sign Out.
          </button>
        </div>
      )}
    </div>
  );
};

export default User;
