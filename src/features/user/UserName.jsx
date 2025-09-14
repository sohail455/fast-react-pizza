import { useSelector } from 'react-redux';

function UserName() {
  const userName = useSelector((state) => state.user.userName);
  if (!userName) return;
  return (
    <span className="hidden text-2xl uppercase text-stone-600 sm:block">
      {userName}
    </span>
  );
}

export default UserName;
