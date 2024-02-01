"use client"
import { Provider } from 'react-redux';
import store from '../../redux/store';
import ImageUpload from '@/Components/ImageEditor';
import Navbar from '@/Components/Navbar';

export default function Home() {
  return (
    <Provider store={store}>
      <div>
        <Navbar/>
        <ImageUpload />
      </div>
    </Provider>
  );
}
