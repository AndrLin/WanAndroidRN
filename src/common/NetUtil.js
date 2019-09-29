import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

 axios.interceptors.request.use(
    async (config) => {
        const cookie = await AsyncStorage.getItem('cookie');
        if (cookie != null && cookie.length > 0) {
            config.headers.cookie = cookie;
        }
        return config;
    },
    error => Promise.reject(error)
  );
  // ...

export default axios