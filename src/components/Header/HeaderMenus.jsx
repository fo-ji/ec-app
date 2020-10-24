import React from "react";
import IconButton from "@material-ui/core/IconButton";
import { Badge } from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import MenuIcon from "@material-ui/icons/Menu";
import { getProductsInCart } from "../../reducks/users/selectors";
import { useSelector } from "react-redux";

const HeaderMenus = (props) => {
  const selector = useSelector((state) => state)
  let productsInCart = getProductsInCart(selector)
  
  return (
    <>
      <IconButton>
        <Badge badgeContent={productsInCart.length} color="secondary">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
      <IconButton>
        <FavoriteBorderIcon />
      </IconButton>
      <IconButton onClick={(e) => props.handleDrawerToggle(e)} >
        <MenuIcon />
      </IconButton>
    </>
  )
};

export default HeaderMenus;