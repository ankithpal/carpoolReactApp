import "./signup.scss";
import logo from  '../../assets/logo.png';
import img1 from "../../assets/img1.png";
import { LoginForm } from "./LoginForm";

export const Login = () => {  
   
  return (
    <div className="signup d-flex">
      <div className="left-col h-100">
        <div className="inner-left-col d-flex justify-content-center w-100 h-50">
        <div className="inner-left-inner-col d-flex flex-column h-100">
          <div className="logo d-flex align-items-center w-100"> <img src={logo}></img></div>
          <div className="middle-text w-100">
            <div className="content lh-1 mt-5 w-100">
            <i>TURN </i><i className="orange-shade-c">MILES </i>
            <br></br>
            <i className="mt-0">INTO </i><i className="violet-shade-c">MONEY</i>
            </div>    
            <h2 className="fs-3 mt-0  ">RIDES ON TAP</h2>
          </div>
        </div>
        </div>
        <div className="left-col-image w-100 h-50">
          <img src={img1} className="img1 w-100 h-100"></img>
        </div>
      </div>
      <div className={`right-col d-flex align-items-baseline h-100 flex-1 violet-shade-bg`}>
          <LoginForm/>
      </div>
    </div>
  );
};
