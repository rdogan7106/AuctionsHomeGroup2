/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useAuth } from "../../context/Context.jsx";
function UpdateAuctionItem({ updateAuction, setActiveComponent }) {
  const { auctionsList, setAuctionsList } = useAuth();

  const [formData, setFormData] = useState({
    id: updateAuction?.id,
    sellerId: updateAuction?.sellerId,
    sellerName: updateAuction?.sellerName,
    itemDetails: {
      title: updateAuction?.itemDetails?.title || "",
      description: updateAuction?.itemDetails?.description || "",
      price: updateAuction?.itemDetails?.price || "",
      image: updateAuction?.itemDetails?.image || "",
    },
    startDate: updateAuction?.startDate || "",
    endDate: updateAuction?.endDate || "",
    bids: updateAuction?.bids || [],
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in formData.itemDetails) {
      setFormData((prevData) => ({
        ...prevData,
        itemDetails: {
          ...prevData.itemDetails,
          [name]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `http://localhost:3001/auctions/${updateAuction.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );
    const updatedAuction = await response.json();
    setAuctionsList(
      auctionsList.map((auction) =>
        auction.id === updatedAuction.id ? updatedAuction : auction
      )
    );
    setActiveComponent("Auctions");
  };
  return (
    <div className="container mt-5">
      <h2>Update Auction Form</h2>
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
            value={formData.startDate}
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
            value={formData.endDate}
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
export default UpdateAuctionItem;
