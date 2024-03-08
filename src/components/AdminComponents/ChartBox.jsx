/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Box, Typography } from "@mui/material";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import CurrencyExchangeOutlinedIcon from "@mui/icons-material/CurrencyExchangeOutlined";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import { useAuth } from "../../context/Context.jsx";
import React, { useEffect, useState } from "react";

function ChartBox({
  totalOffers,
  finishedAuctions,
  inProgressAuctions,
  users,
}) {
  const { auctionsList, userList } = useAuth();
  return (
    <div className="d-flex mt-3 ">
      <div className="div  mx-3">
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
          sx={{
            width: 170,
            height: 100,
            borderRadius: 1,
            bgcolor: "primary.main",
            "&:hover": {
              bgcolor: "primary.dark",
            },
          }}
        >
          <PeopleOutlineOutlinedIcon
            sx={{ color: "white", width: 50, height: 50, marginRight: 1 }}
          />
          <Typography
            variant="body1"
            sx={{
              color: "white",
              fontSize: "1rem",
            }}
          >
            {users.length > 0 ? `${users.length} User` : "No User"}
          </Typography>
        </Box>
      </div>

      <div className="div mx-3">
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
          sx={{
            width: 170,
            height: 100,
            borderRadius: 1,
            bgcolor: "success.main",
            "&:hover": {
              bgcolor: "success.dark",
            },
          }}
        >
          <CategoryOutlinedIcon
            sx={{ color: "white", width: 50, height: 50, marginRight: 1 }}
          />
          <Typography
            variant="body1"
            sx={{
              color: "white",
              fontSize: "1rem",
            }}
          >
            {auctionsList.length > 0
              ? `${auctionsList.length} Items`
              : "No Item"}
          </Typography>
        </Box>
      </div>

      <div className="div mx-3">
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
          sx={{
            width: 170,
            height: 100,
            borderRadius: 1,
            bgcolor: "warning.main",
            "&:hover": {
              bgcolor: "warning.dark",
            },
          }}
        >
          <LocalOfferOutlinedIcon
            sx={{ color: "white", width: 50, height: 50, marginRight: 1 }}
          />
          <Typography
            variant="body1"
            sx={{
              color: "white",
              fontSize: "1rem",
            }}
          >
            {totalOffers > 0 ? `${totalOffers} Offers` : "No Offer"}
          </Typography>
        </Box>
      </div>
      <div className="div mx-3">
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
          sx={{
            width: 170,
            height: 100,
            borderRadius: 1,
            bgcolor: "secondary.main",
            "&:hover": {
              bgcolor: "secondary.dark",
            },
          }}
        >
          <CurrencyExchangeOutlinedIcon
            sx={{ color: "white", width: 50, height: 50, marginRight: 1 }}
          />
          <Typography
            variant="body1"
            sx={{
              color: "white",
              fontSize: "1rem",
            }}
          >
            {inProgressAuctions > 0
              ? `${inProgressAuctions} In Progress`
              : "No Progress"}
          </Typography>
        </Box>
      </div>

      <div className="div mx-3">
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
          sx={{
            width: 170,
            height: 100,
            borderRadius: 1,
            bgcolor: "error.main",
            "&:hover": {
              bgcolor: "error.dark",
            },
          }}
        >
          <AssignmentTurnedInIcon
            sx={{ color: "white", width: 50, height: 50, marginRight: 1 }}
          />
          <Typography
            variant="body1"
            sx={{
              color: "white",
              fontSize: "1rem",
            }}
          >
            {finishedAuctions > 0
              ? `${finishedAuctions} Finished`
              : "No Ending Auctions"}
          </Typography>
        </Box>
      </div>
    </div>
  );
}
export default ChartBox;
