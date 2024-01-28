"use client"
import { Provider } from 'react-redux';
import store from '../../redux/store';
import ImageUploadComponent from '@/Components/ImageEditor2';

export default function Home() {
  return (
    <Provider store={store}>
      <div>
        <ImageUploadComponent />
      </div>
    </Provider>
  );
}
