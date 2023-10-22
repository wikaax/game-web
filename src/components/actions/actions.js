import { fetchData } from './api';

export const setData = (data) => {
  return {
    type: 'SET_DATA',
    payload: data,
  };
};

export const fetchDataAsync = () => {
  return (dispatch) => {
    fetchData()
      .then((data) => {
        dispatch(setData(data));
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };
};
