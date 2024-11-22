import { Button, ButtonGroup, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { decreaseQuantity, increaseQuantity } from "../../Slices/products/productSlice";

const CartList = (props) => {
  const { open, toggleDrawer } = props;

  const dispatch = useDispatch()

  const { items } = useSelector((state) => state.products);
  console.log(items, "items");

  return (
    <div>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 450 }}
          role="presentation"
         
        >
          <Typography
            className="text-center mt-3 bg-danger rounded-4 text-white"
            variant="h6"
          >
            Cart Items
          </Typography>
          {items?.map((itemList) => {
            console.log(items, "items");

            return (
              <Box className="d-flex justify-content-around align-items-center my-3 border py-2 border-danger " style={{minHeight:'80px', maxHeight:'80px'}}>
                <img width={"40px"} src={itemList?.image} alt="card image" />

                <span>{itemList?.category}</span>
                <ButtonGroup size="small" variant="text" aria-label="Basic button group">
                  <Button><RemoveIcon onClick ={()=>dispatch(decreaseQuantity(itemList))}/></Button>
                  <Button>{itemList?.quantity}</Button>
                  <Button><AddIcon onClick ={()=>dispatch(increaseQuantity(itemList))} /></Button>
                </ButtonGroup>
                <span>{itemList?.price}</span>
              </Box>
            );
          })}
        </Box>
      </Drawer>
    </div>
  );
};

export default CartList;
