import React, { useState, useRef, useEffect } from 'react';
import api from '../api/api';

const Post = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirm: '',
  });
  const [message, setMessage] = useState('');
  const itemName = useRef();
  const form = useRef();
  const onSubmit = (e) => {
    e.preventDefault();

    if (formData) {
      //addItem({ newItem });
      api.post(`/register`, formData).then((res) => {
        setMessage(res.data.message);
      });
      form.current.reset(); //to reset the value using ref in form
    }
  };
  useEffect(() => {
    itemName.current.focus();
  }, []);

  useEffect(() => {
    setMessage('');
  }, [formData]);
  return (
    <section className="row">
      <div className="col-4"></div>
      <div className="col-4">
        <form ref={form} onSubmit={onSubmit}>
          <div className="form-floating mb-3">
            <input
              ref={itemName}
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              onChange={(e) => {
                setFormData((state) => {
                  return { ...state, name: e.target.value };
                });
              }}
            />
            <label htmlFor="floatingInput">Username</label>
          </div>
          <div className="form-floating mb-3">
            <input
              // ref={itemName}
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              onChange={(e) => {
                setFormData((state) => {
                  return { ...state, email: e.target.value };
                });
              }}
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating  mb-3">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              onChange={(e) => {
                setFormData((state) => {
                  return { ...state, password: e.target.value };
                });
              }}
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <div className="form-floating  mb-3">
            <input
              type="password"
              className={`form-control ${
                formData.password !== formData.confirm &&
                formData.confirm !== ''
                  ? 'is-invalid'
                  : ''
              }`}
              id="floatingPassword"
              placeholder="Confirm password"
              onChange={(e) => {
                setFormData((state) => {
                  return { ...state, confirm: e.target.value };
                });
              }}
            />
            <label htmlFor="floatingPassword">Confirm Password</label>
          </div>

          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </form>
      </div>
      <div className="col-4">
        {message && (
          <div
            className={`alert ${
              message.includes('Successfully')
                ? 'alert-success'
                : 'alert-danger'
            }`}
            role="alert"
          >
            {message}
          </div>
        )}
      </div>
    </section>
  );
};

export default Post;
