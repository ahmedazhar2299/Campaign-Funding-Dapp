import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { initWeb3 } from './store/adoptSlice';
import { loadAdopters } from './store/adoptSlice';

import PetList from './components/petList.js';

function App() {

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(initWeb3());
  },[]);

  return (
    <div>
      <PetList />
    </div>
  );
}

export default App;
