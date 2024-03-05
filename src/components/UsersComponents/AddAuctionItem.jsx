/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "../../context/Context.jsx";
function AddAuctionItem({ setActiveComponent, updateAuction }) {
  const { user, logout } = useAuth();
  const [formData, setFormData] = useState({
    sellerId: user?.id || "",
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
    const newAuctionItem = { ...formData, id: uuidv4() };
    const now = new Date();
    const start = new Date(newAuctionItem.startDate);
    const end = new Date(newAuctionItem.endDate);
    if (start < now) {
      alert("Start time cannot be earlier than today");
    } else if (end <= start) {
      alert("End Time cannot be earlier than Start Time ");
    }  else {
      const response = await fetch("http://localhost:3000/auctions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAuctionItem),
      });
      setActiveComponent("Useritems");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Register Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
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

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Title
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
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            type="text"
            className="form-control"
            id="price"
            name="price"
            value={formData.itemDetails.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="startDate" className="form-label">
            Start Date
          </label>
          <input
            type="date"
            className="form-control"
            id="startDate"
            name="startDate"
            value={formData.itemDetails.startDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="endDate" className="form-label">
            End Date
          </label>
          <input
            type="date"
            className="form-control"
            id="endDate"
            name="endDate"
            value={formData.itemDetails.endDate}
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
