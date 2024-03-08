import { Box ,Typography} from "@mui/material";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import CurrencyExchangeOutlinedIcon from '@mui/icons-material/CurrencyExchangeOutlined';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import { useAuth } from "../../context/Context.jsx";

function ChartBox(){
    const { auctionsList, userList } = useAuth();
    let totalOffers = auctionsList.reduce((total, auction) => {
        return total + auction.bids.length;
    }, 0);
  

    return (
        <div className="d-flex mt-3 ">
        <div className="div  mx-3">
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
            sx={{
              width: 150,
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
              {userList.length > 0 ? `${userList.length} User` : "No User"}
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
              width: 150,
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
              {auctionsList.length > 0 ? `${auctionsList.length} Items` : "No Item"}
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
              width: 150,
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
              {totalOffers.length > 0 ? `${totalOffers.length} Offers` : "No Offer"}
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
              width: 150,
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
              {totalOffers.length > 0 ? `${totalOffers.length} Offers` : "No Offer"}
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
              width: 150,
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
              {totalOffers.length > 0 ? `${totalOffers.length} Offers` : "No Offer"}
            </Typography>
          </Box>

        </div>
      </div>
    )
}
export default ChartBox