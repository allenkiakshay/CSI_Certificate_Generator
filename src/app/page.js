"use client"
import { Provider } from 'react-redux';
import store from '../redux/store';
import Login from "@/Components/LoginComponent";
import Navbar from '@/Components/Navbar';

export default function Home() {
  return (
    <Provider store={store}>
      <div>
        <Navbar/>
        <Login />
      </div>
    </Provider>
  );
}
