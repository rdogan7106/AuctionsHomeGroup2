/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState,useEffect } from "react";

function HomePage() {
  const [comingAuctions, setComingAuctions] = useState(null);
  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const response = await fetch("http://localhost:3000/auctions");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const data2 = data.filter((auction)=> new Date(auction.startDate) > new Date() )
        setComingAuctions(data2);
      } catch (error) {
        console.error("Fetching auctions failed:", error);
      }
    };

    fetchAuctions();
  }, []);

  if (comingAuctions === null) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div className="bg"></div>
      <div className="container">
        <div id="carouselExampleCaptions" className="carousel slide">
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src="https://cdn.pixabay.com/photo/2020/12/06/15/52/realtor-5809182_1280.png"
                className="d-block w-100"
                alt="..."
              />
              <div className="carousel-caption d-none d-md-block">
                <h5>First slide label</h5>
                <p>
                  Some representative placeholder content for the first slide.
                </p>
              </div>
            </div>
            <div className="carousel-item">
              <img
                src="https://cdn.pixabay.com/photo/2021/11/30/15/33/realtor-6835635_1280.png"
                className="d-block w-100"
                alt="..."
              />
              <div className="carousel-caption d-none d-md-block">
                <h5>Second slide label</h5>
                <p>
                  Some representative placeholder content for the second slide.
                </p>
              </div>
            </div>
            <div className="carousel-item">
              <img
                src="https://cdn.pixabay.com/photo/2021/07/20/12/35/auction-6480582_1280.jpg"
                className="d-block w-100"
                alt="..."
              />
              <div className="carousel-caption d-none d-md-block">
                <h5>Third slide label</h5>
                <p>
                  Some representative placeholder content for the third slide.
                </p>
              </div>
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className="container">
        <h2 className="text-light text-center">Coming </h2>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {comingAuctions.map((auction) => (
            <div className="col" key={auction.id}>
              <div className="card h-100">
                <img
                  src={auction.itemDetails.image}
                  className="card-img-top"
                  alt={auction.itemDetails.title}
                />
                <div className="card-body">
                  <h5 className="card-title">{auction.itemDetails.title}</h5>
                  <p className="card-text">{auction.itemDetails.description}</p>
                </div>
                
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
export default HomePage;
