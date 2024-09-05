import { useGetUser } from "../contexts/User";

const User = () => {
  const { user } = useGetUser();

  if (user === null) return;

  return (
    <div>
      <img src={user?.image} alt="user-profile" className="rounded-full" />
    </div>
  );
};

export default User;
