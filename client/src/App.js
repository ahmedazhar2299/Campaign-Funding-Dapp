import './App.css';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import { initWeb3, loadAdoptersList } from './store/adoptSlice';
import PetList from './components/petList.js';

function App() {

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(initWeb3());
  },[]);

  setInterval(()=>{
    dispatch(loadAdoptersList());
  }, 2000);

  return (
    <div>
      <PetList />
    </div> 
  );
}

export default App;
