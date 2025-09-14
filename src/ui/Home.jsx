import { useSelector } from 'react-redux';
import CreateUser from '../features/user/CreateUser';
import Button from './Button';
function Home() {
  const userName = useSelector((state) => state.user.userName);
  return (
    <div className="mt-10 text-center">
      <h1 className="mb-8 text-xl font-semibold text-stone-800">
        The best pizza.
        <br />
        <span className="text-yellow-400">
          Straight out of the oven, straight to you.
        </span>
      </h1>
      {userName ? (
        <Button type={'primary'} to={'/menu'}>
          Countinue To Menu, {userName}
        </Button>
      ) : (
        <CreateUser />
      )}
    </div>
  );
}

export default Home;
