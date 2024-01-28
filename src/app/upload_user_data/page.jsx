"use client"
import { Provider } from 'react-redux';
import store from '../../redux/store';
import UploadExcel from '@/Components/UploadExcel';
import Navbar from '@/Components/Navbar';

export default function Home() {
  return (
    <Provider store={store}>
      <div>
        <Navbar />
        <UploadExcel />
      </div>
    </Provider>
  );
}
