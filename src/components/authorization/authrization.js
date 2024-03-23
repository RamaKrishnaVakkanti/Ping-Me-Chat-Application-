import queryString from "query-string";
import { Navigate } from "react-router-dom";
import {useState, useEffect} from 'react';

const Authorization = () => {
  const [localToken, setLocalToken] = useState(null);
  const { token } = queryString.parse(window.location.search);
  useEffect(()=>{
    setLocalToken(localStorage.getItem('token'));
  },[]);
  if (token) {
    localStorage.setItem("token", token);
    return <Navigate to="/join" />;
  } else{
    if(localToken){
      return <Navigate to="/join" />
    } else {
    return <Navigate to="/login" />;
  }
}
};

export default Authorization;
