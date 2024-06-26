/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "../../context/Context.jsx";
function AddAuctionItem({ setActiveComponent, updateAuction }) {
  const { user, auctionsList, setAuctionsList } = useAuth();
  const [formData, setFormData] = useState({
    sellerId: user?.userID || "",
    sellerName: user?.username || "",
    itemDetails: {
      title: "",
      description: "",
      image: "",
      price: "",
    },
    bids: [],
    startDate: "",
    endDate: "",
    status: "in progress",
  });

  const handleChange = (e) => {
    if (["title", "description", "image", "price"].includes(e.target.name)) {
      setFormData((prevData) => ({
        ...prevData,
        itemDetails: {
          ...prevData.itemDetails,
          [e.target.name]: e.target.value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newAuctionItem = { ...formData };
    const start = new Date(newAuctionItem.startDate);
    const end = new Date(newAuctionItem.endDate);
    const now = new Date();

    if (start.getDay() < now.getDay()) {
      alert("Start time cannot be earlier than today");
    } else if (end <= start) {
      alert("End Time cannot be earlier than Start Time ");
    } else if (Number(newAuctionItem.itemDetails.price) < 1) {
      alert("Please enter a price ");
    } else {
      const response = await fetch("/api/auctions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAuctionItem),
      });
      setActiveComponent("Useritems");
      setAuctionsList([...auctionsList, newAuctionItem])
    }
  };

  return (
    <div className="container mt-5">
      <div className="bg"></div>
      <h2>Register Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="d-flex flex-wrap justify-content-between ">
          <div className="mb-3 col-lg-5 col-md-12 col-sm-12">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={formData.itemDetails.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3 col-lg-5 col-md-12 col-sm-12">
            <label htmlFor="price" className="form-label">
              Price
            </label>
            <input
              type="text"
              className="form-control"
              id="price"
              name="price"
              value={Number(formData.itemDetails.price)}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="d-flex flex-wrap justify-content-between ">
          <div className="mb-3 col-lg-5 col-md-12 col-sm-12">
            <label htmlFor="startDate" className="form-label">
              Start Date
            </label>
            <input
              type="datetime-local"
              className="form-control"
              id="startDate"
              name="startDate"
              value={formData.itemDetails.startDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3 col-lg-5 col-md-12 col-sm-12">
            <label htmlFor="endDate" className="form-label">
              End Date
            </label>
            <input
              type="datetime-local"
              className="form-control"
              id="endDate"
              name="endDate"
              value={formData.itemDetails.endDate}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            value={formData.itemDetails.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Image
          </label>
          <input
            type="text"
            className="form-control"
            id="image"
            name="image"
            value={formData.itemDetails.image}
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
export default AddAuctionItem;
