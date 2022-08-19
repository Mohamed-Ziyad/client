import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';

import api from '../api/api';

const CreatePost = () => {
  const navigate = useNavigate();
  let { id } = useParams();
  const location = useLocation();
  const { name = '', email = '' } =
    JSON.parse(localStorage.getItem('user')) ?? '';

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    link: '',
    name,
    email,
  });
  let isNew = location.pathname.includes('new');
  const [imgUrl, setImgUrl] = useState('');
  const [message, setMessage] = useState('');
  const itemName = useRef();
  const form = useRef();
  const onSubmit = (e) => {
    e.preventDefault();

    if (formData.title === '') {
      setMessage('Enter correctly Title Requird!');
    } else if (formData.description === '') {
      setMessage('Enter correctly Description Requird!');
    } else if (formData) {
      if (isNew) {
        api.post(`/new`, formData).then((res) => {
          setMessage(res.data.message);
          //setImgUrl('');
          form.current.reset(); //to reset the value using ref in form
        });
      } else {
        api.patch(`/post`, formData).then((res) => {
          setMessage(res.data.message);
        });
      }
    }

    // navigate('/');
  };
  const handleDelete = (id) => {
    api.delete(`/post/${id}`).then((res) => {
      setMessage(res.data.message);
      setImgUrl('');
      form.current.reset();
      navigate('/');
    });
  };
  useEffect(() => {
    itemName.current.focus();
  }, []);
  useEffect(() => {
    setImgUrl(formData.link);
  }, [formData.link]);
  useEffect(() => {
    setMessage('');
  }, [formData]);

  useEffect(() => {
    if (!isNew) {
      api.get(`/post/${id}`).then((res) => {
        setFormData(res.data[0]);
      });
    } else {
      itemName.current.focus();
      setImgUrl('');
      setFormData({
        title: '',
        description: '',
        link: '',
        name,
        email,
      });
      form.current.reset();
    }
  }, [location.pathname]);
  return (
    <section className="row">
      <div className="col-2"></div>

      <div className="col-8">
        <form ref={form} onSubmit={onSubmit}>
          <img
            style={{
              width: '100%',
              height: '400px',
              backgroundColor: 'gray',
              objectFit: 'cover',
            }}
            src={imgUrl ?? ''}
            className="img-fluid mb-3 max-width"
            // alt="cover"
          ></img>

          <div className="form-floating mb-3">
            <input
              ref={itemName}
              type="text"
              value={formData.title}
              className={`form-control `}
              id="floatingInput"
              placeholder="name@example.com"
              onChange={(e) => {
                setFormData((state) => {
                  return { ...state, title: e.target.value };
                });
              }}
              disabled={email === formData.email && name !== '' ? false : true}
            />
            <label htmlFor="floatingInput">Title</label>
          </div>
          <div className="form-floating mb-3">
            <textarea
              className={`form-control `}
              value={formData.description}
              placeholder="Leave a comment here"
              id="floatingTextarea"
              onChange={(e) => {
                setFormData((state) => {
                  return { ...state, description: e.target.value };
                });
              }}
              disabled={email === formData.email && name !== '' ? false : true}
            ></textarea>
            <label htmlFor="floatingTextarea">Description</label>
          </div>
          <div className="form-floating mb-3">
            <input
              // ref={itemName}
              type="text"
              className="form-control"
              id="floatingInput"
              value={formData.link}
              placeholder="name@example.com"
              onChange={(e) => {
                setFormData((state) => {
                  return { ...state, link: e.target.value };
                });
              }}
              disabled={email === formData.email && name !== '' ? false : true}
            />
            <label htmlFor="floatingInput">Image Link</label>
          </div>
          {isNew ? (
            <button type="submit" className="btn btn-primary">
              Create
            </button>
          ) : name !== '' && formData.email === email ? (
            <>
              <button type="submit" className="btn btn-primary ">
                Update
              </button>
              &nbsp; &nbsp;
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => handleDelete(id)}
              >
                Delete
              </button>
            </>
          ) : null}
        </form>
      </div>
      <div className="col-2">
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

export default CreatePost;
