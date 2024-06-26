import { useSelector } from 'react-redux';
import CreateUser from '../features/user/CreateUser'
import Button from './Button';
import PizzaModel from '../features/pizza-model/PizzaModel';

function Home() {
  const {username}= useSelector(store=>store.user)
  return (
    <div className='my-10  px-4 text-center sm:my-16'>
      <h1 className="mb-8 text-stone-700 text-xl md:text-3xl font-semibold"> 
        The best pizza.
        <br />
        <span className="text-yellow-500">Straight out of the oven, straight to you.</span>
      </h1>
       {username ===''? <CreateUser/>:<Button to='/menu' type='primary'>Continue ordering, {username}</Button>}
      
      <PizzaModel></PizzaModel>

    </div>
  );
}

export default Home;
