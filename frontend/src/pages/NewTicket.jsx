import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { createTicket, reset } from "../features/tickets/ticketSlice";

import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";

const NewTicket = () => {
  const [product, setProduct] = useState("iPhone");
  const [description, setDescription] = useState("");
  const { user } = useSelector((state) => state.auth);
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.tickets
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const options = ["iPhone", "Macbook Pro", "iMac", "iPad"];

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      dispatch(reset());
      navigate("/tickets");
    }

    dispatch(reset());
  }, [isError, message, isSuccess, dispatch, navigate]);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createTicket({ product, description }));
  };

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <BackButton url="/" />
          <section className="heading">
            <h1>Create New Ticket</h1>
            <p>Please fill out the form below</p>
          </section>
          <section className="form">
            <div className="form-group">
              <label htmlFor="name">Customer Name</label>
              <input
                className="form-control"
                type="text"
                id="name"
                value={user.name}
                disabled
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Customer Email</label>
              <input
                className="form-control"
                type="email"
                id="email"
                value={user.email}
                disabled
              />
            </div>
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <label htmlFor="product">Product</label>
                <select
                  name="product"
                  id="product"
                  value={product}
                  onChange={(e) => setProduct(e.target.value)}
                  required
                >
                  {options.map((option, ind) => (
                    <option key={ind} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="description">Description for the issue</label>
                <textarea
                  name="description"
                  id="description"
                  className="form-control"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
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

export default NewTicket;
