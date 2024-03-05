/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import DeleteIcon from '@mui/icons-material/Delete';

function Auctions({setActiveComponent, setUpdateAuction}) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [auctionsList, setAuctionsList] = React.useState([]);
    const columns = [
        { id: "id", label: "id", minWidth: 80 },
        { id: "seller", label: "seller", minWidth: 80 },
        { id: "title", label: "title", minWidth: 80 },
        { id: "price", label: "price", minWidth: 80 },
        { id: "startdate", label: "startdate", minWidth: 80 },
        { id: "enddate", label: "endate", minWidth: 80 },
        { id: "bids", label: "bids", minWidth: 100 },
        { id: "lastbid", label: "lastbid", minWidth: 100 },
        { id: "status", label: "status", minWidth: 50 },
        { id: "update", label: "update", minWidth: 50 },
        { id: "delete", label: "delete", minWidth: 50 },
    ]
  
    React.useEffect(() => {
      const fetchAuctions = async () => {
        const response = await fetch("http://localhost:3000/auctions");
        const data = await response.json();
        setAuctionsList(data);
      };
  
      fetchAuctions();
    }, []);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
    const deleteAuction = async (auctionId)=>{
        const response = await fetch(`http://localhost:3000/auctions/${auctionId}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error('Something went wrong with the deletion');
        }
        setAuctionsList((prevauctions) => prevauctions.filter((auction) => auction.id !== auctionId));
    
      }
    
    const handleAuctionUpdate = (auction)=> {
      setUpdateAuction(auction)
      setActiveComponent("UpdateAuctionItem")
    
    }
      
    return (
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {auctionsList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((auction) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={auction.id}>
                    <TableCell>{auction.id}</TableCell>
                    <TableCell>{auction.sellerId || auction.seller}</TableCell>
                    <TableCell>{auction.itemDetails.title}</TableCell>
                    <TableCell>{auction.itemDetails.price}</TableCell>
                    <TableCell>{auction.startDate}</TableCell>
                    <TableCell>{auction.endDate}</TableCell>
                    <TableCell>{auction.bids.length}</TableCell> 
                    <TableCell>{auction.bids[auction.bids.length - 1]?.amount || 'No bids'}</TableCell>
                    <TableCell>{auction.status}</TableCell> 
                    <TableCell onClick = {() => handleAuctionUpdate(auction)}><SystemUpdateAltIcon /></TableCell>
                    <TableCell onClick = {() => deleteAuction(auction.id)}><DeleteIcon /></TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={auctionsList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
  
export default Auctions