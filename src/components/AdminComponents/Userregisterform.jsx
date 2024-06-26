/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "../../context/Context.jsx";

function Userregisterform({ setActiveComponent }) {
  const { userList, setUserList } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    type: "user",
    email: "",
    phone: "",
    personalNumber: "",
    firstname: "",
    lastname: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const alreadyExists = userList.some(
      (user) =>
        user.personalNumber === formData.personalNumber ||
        user.email === formData.email
    );
    if (!alreadyExists) {
      const newUser = { ...formData };
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
      setActiveComponent("Users");
    } else {
      alert("A user with the same personal number or email already exists.");
      return;
    }

    setUserList((prevUsers) => [...prevUsers, { ...formData }]);
    setFormData({
      userID: "",
      username: "",
      password: "",
      type: "user",
      email: "",
      phone: "",
      personalNumber: "",
      firstname: "",
      lastname: "",
    });
  };

  return (
    <div className="container mt-5 ">
      <div className="bg"></div>
      <h2>Register Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="d-flex flex-wrap justify-content-between ">
          <div className="mb-3  col-lg-3 col-md-12 col-sm-12">
            <label htmlFor="username" className="form-label">
              User Name
            </label>
            <input
              type="text"
              className="form-control w-100"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3 col-lg-3 col-md-12 col-sm-12">
            <label htmlFor="firstname" className="form-label">
              First Name
            </label>
            <input
              type="text"
              className="form-control w-100"
              id="firstname"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3  col-lg-3 col-md-12 col-sm-12">
            <label htmlFor="lastname" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              className="form-control w-100"
              id="lastname"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              required
            />
          </div>
        </div>


        <div className="d-flex flex-wrap justify-content-between ">


        </div>
        <div className="mb-3">
          <label htmlFor="personalNumber" className="form-label">
            Personal Number
          </label>
          <input
            type="number"
            className="form-control"
            id="personalNumber"
            name="personalNumber"
            value={formData.personalNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Phone
          </label>
          <input
            type="phone"
            className="form-control"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="text"
            className="form-control"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
    </div>
  );
}
export default Userregisterform;
