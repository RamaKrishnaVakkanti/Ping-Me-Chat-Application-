import "./login.css";
import config from '../../config/properties.json';

const Login = () => {
  console.log("login");
  const loginCall = () => {
    window.open(`${config.baseURL}/login`, "_top");
  };
  return (
    <div className="outer">
      <div className="inner">
        <h1 className="heading">PING ME</h1>
        <div>
          <button className="inputButton-login" onClick={loginCall}>
            <img className="google-image"
              width="15px"
              alt="Google login"
              src="https://developers.google.com/identity/images/g-logo.png"
            />
               Login in with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
