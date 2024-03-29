"use client"
import { Provider } from 'react-redux';
import store from '../../redux/store';
import ImageUploadComponent from '@/Components/ImageEditor2';
import Navbar from '@/Components/Navbar';

export default function Home() {
  return (
    <Provider store={store}>
      <div>
        <Navbar/>
        <ImageUploadComponent />
      </div>
    </Provider>
  );
}
