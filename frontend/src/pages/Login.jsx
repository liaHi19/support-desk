import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSignInAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import { login, reset } from "../features/auth/authSlice";

import Spinner from "../components/Spinner";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      navigate("/");
      dispatch(reset());
    }
  }, [isError, message, isSuccess, navigate, dispatch, user]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData));
  };
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {" "}
          <section className="heading">
            <h1>
              <FaSignInAlt /> Login
            </h1>
            <p>Please log in to get support</p>
          </section>
          <section className="form">
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <input
                  className="form-control"
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  value={email}
                  onChange={onChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  className="form-control"
                  type="password"
                  placeholder="Enter password"
                  name="password"
                  value={password}
                  onChange={onChange}
                  required
                />
              </div>
              <div className="form-group">
                <button className="btn btn-block">Submit</button>
              </div>
            </form>
          </section>
        </>
      )}
    </>
  );
};

export default Login;
