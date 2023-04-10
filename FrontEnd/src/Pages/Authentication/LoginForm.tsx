import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import axios from "axios";
import "./signupform.scss";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm, SubmitHandler } from "react-hook-form";
import { signUpFormType } from "../../Interfaces/AuthenticationType";
import { loginUrl } from "../../HttpServices/HttpUrls";

export const LoginForm = () => {
  let [email, setEmail] = useState<string>("");
  let [password, setPassword] = useState<string>("");

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<signUpFormType>({ mode: "onTouched" });
  const onSubmit: SubmitHandler<signUpFormType> = async (data) => {
    try {
      const url = `${loginUrl}`;
      const data = {
        email: email,
        password: password,
      };
      const res = await axios.post(url, data);
      console.log(res.data);
      localStorage.setItem("jwt-token",(res.data));
      window.location.replace("/bookorofferride");
      toast.success("Successfully loggedIn . ");
    } catch (err) {
      toast.error("Wrong Credentials.");
    }
  };

  return (
    <div
      className={`signupform d-flex align-items-center justify-content-center w-100 violet-shade-bg`}
    >
      <div className="inner-signupform  h-100 mt-5 d-flex flex-column align-items-center justify-content-center">
        <div className="signup-header d-flex flex-column align-items-center justify-content-center">
          <h1>Log In</h1>
          <p></p>
        </div>
        <ToastContainer />
        <div className="mt-5 signup-form">
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group
              className="mb-3 input-feild form-floating"
              controlId="formBasicEmail"
            >
              <Form.Control
                type="email"
                id="email"
                size="lg"
                placeholder="Enter Email Id"
                className="pt-3 pb-3 form-input"
                {...register("email", {
                  required: true,
                  pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                })}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email?.type == "required" && <p>"Email is required"</p>}
              {errors.email?.type == "pattern" && <p>"invalid email format"</p>}
              <label htmlFor="email" className="text-muted">
                Enter the Email Id
              </label>
            </Form.Group>
            <Form.Group
              className="mb-3 input-feild form-floating"
              controlId="formBasicPassword"
            >
              <Form.Control
                type="password"
                id="password"
                placeholder="Password"
                className="pt-3 pb-3"
                {...register("password", { required: true })}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password?.type == "required" && (
                <p>Password is required</p>
              )}
              <label htmlFor="password" className="text-muted">
                Password
              </label>
            </Form.Group>
            <div className="signup-button d-flex align-items-center justify-content-center w-100">
              <Button
                variant="primary"
                type="submit"
                className={`orange-shade-bg`}
              >
                Submit
              </Button>
            </div>
          </Form>
        </div>
        <div className="signup-text d-flex align-items-center justify-content-center">
          <p>Don't have account ? </p>
          <p className="login-text">
            <Link to="/"> sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};
