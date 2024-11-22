import {
  Autocomplete,
  Box,
  Button,
  Card,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  Snackbar,
  SnackbarContent,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Product1 from "../../assets/img-1.jpeg";
import Product2 from "../../assets/img-2.jpeg";
import Product3 from "../../assets/img-3.jpeg";
import "./AllProduct.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import CloseIcon from "@mui/icons-material/Close";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../Slices/Add-cart/addCartSlice";
import { addProducts } from "../../Slices/products/productSlice";
import { ToastContainer, toast } from "react-toastify";

function AllProduct() {
  const [cartList, setCartList] = useState([]);
  const [openAlert, setOpenAlert] = useState(false);
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [categoryProduct, setCategoryProduct] = useState([]);
  const [categoryOption, setCategoryOption] = useState([]);
  const [filterCategory, setFilterCategory] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isToast } = useSelector((state) => state.products);
  console.log(isToast, "isToast");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const product = await axios.get("https://fakestoreapi.com/products");

        if (product?.status === 200) {
          setIsLoading(false);
          setProduct(product?.data);
          setCategoryProduct(product?.data);

          const filterData = product?.data.map((productItem) => {
            return {
              label: productItem.category,
              value: productItem.category,
            };
          });

          const uniqueCategory = filterData.filter(
            (item, index, self) =>
              index === self.findIndex((t) => t.value === item.value)
          );

          setCategoryOption(uniqueCategory);
        } else {
          setIsLoading(true);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let filterCategoryData = categoryProduct?.filter(
      (Item) => Item?.category === filterCategory?.value
    );
    setProduct(filterCategoryData);
  }, [filterCategory]);

  const cartHandler = (product) => {
    const isExist = cartList.find((cart) => cart.id === product.id);
    if (!isExist) {
      setCartList((prev) => [...prev, product]);
    } else {
      setOpenAlert(true);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };

  useEffect(() => {
    if (cartList.length > 0) {
      localStorage.setItem("cartList", JSON.stringify(cartList));
    }
  }, [cartList]);

  useEffect(()=>{
    if(isToast){
      toast('products already added')
    }
  },[isToast])

  return (
    <>
      <ToastContainer />
      <Box className=" d-flex justify-content-between m-3">
        <TextField
          onChange={() => {}}
          size="small"
          placeholder="Search Items..."
        />
        <Autocomplete
          disablePortal
          size="small"
          options={categoryOption}
          sx={{ width: 300 }}
          onChange={(e, newValue) => {
            setFilterCategory(newValue);
          }}
          renderInput={(params) => <TextField {...params} label="Categories" />}
        />
      </Box>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={openAlert}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <SnackbarContent
          style={{
            backgroundColor: "#bb2124",
          }}
          message={
            <Box>
              <span id="client-snackbar">
                Product Already Added to Cart List
              </span>
              <CloseIcon className="ms-5" onClick={handleClose} />
            </Box>
          }
        />
      </Snackbar>
      <Box className="container-fluid mt-4">
        {isLoading ? (
          <Box className="text-center mt-5 pt-5">
            <CircularProgress color="info" />
          </Box>
        ) : (
          <Grid container spacing={7}>
            {product?.map((item, index) => {
              return (
                <Grid item xs={12} md={4} lg={3} key={index} className="my-3">
                  <Tooltip title={item.category} arrow placement="top">
                    <Box
                      className="text-center border-2 border-success bg-light card"
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                    >
                      <Box className="text-center py-2">
                        <img
                          className="w-25 img-fluid animated-image"
                          style={{ minHeight: "140px", maxHeight: "140px" }}
                          src={item.image}
                          alt={item.title}
                        />
                      </Box>
                      <Box
                        sx={{
                          flexGrow: 1,
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          height: "250px",
                        }}
                      >
                        <Typography
                          variant="body2"
                          className="text-center py-1"
                        >
                          {item.category}
                        </Typography>
                        <Typography variant="body2">{item.title}</Typography>
                        <Typography variant="body2">{item.price}</Typography>
                        <Divider className="border-info" />
                        <Box className="d-flex justify-content-around py-3 text-white bg-success">
                          <Tooltip title="View Details" arrow>
                            <RemoveRedEyeIcon
                              className="icon"
                              onClick={() => {
                                navigate(`/product-details/${item?.id}`);
                                console.log(item);
                              }}
                            />
                          </Tooltip>
                          <Tooltip title="Add to Favorite" arrow>
                            <FavoriteIcon className="icon" />
                          </Tooltip>
                          <Tooltip title="Add to cart" arrow>
                            <AddShoppingCartIcon
                              className="icon"
                              onClick={() => dispatch(addProducts(item ))}
                            />
                            
                            
                          </Tooltip>
                        </Box>
                      </Box>
                    </Box>
                  </Tooltip>
                </Grid>
              );
            })}
          </Grid>
        )}
      </Box>
    </>
  );
}

export default AllProduct;
