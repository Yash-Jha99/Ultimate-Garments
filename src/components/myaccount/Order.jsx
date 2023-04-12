import React from "react";
import { useLoaderData, NavLink } from "react-router-dom";
import { Typography, Box, Stack } from "@mui/material";

const OrderItem = ({ id, name, date, image, price, orderItemId }) => {
  return (
    <Box
      sx={{ ":hover": { boxShadow: 3 } }}
      border="1px solid lightgray"
      padding={1}
    >
      <NavLink
        style={{ textDecoration: "none", color: "black", display: "block" }}
        to={`/myaccount/orders/${id}/${orderItemId}`}
      >
        <Stack direction="row" spacing={2} pb={{ xs: 1, sm: 3 }}>
          <Stack alignItems="center">
            <Box
              height={{ xs: 72, sm: 120 }}
              width={{ xs: 72, sm: 120 }}
              mx={{ xs: 0, sm: 2 }}
            >
              <img
                src={image}
                alt="product"
                style={{
                  objectFit: "contain",
                  width: "100%",
                  height: "100%",
                }}
              />
            </Box>
          </Stack>
          <Stack width="100%" overflow="hidden" textOverflow="ellipsis">
            <Typography variant="body1">{name}</Typography>
            <Typography mb={2} fontWeight="bold" variant="h6" color="black">
              ₹ {price}
            </Typography>
            <Typography variant="body2">Ordered on {date}</Typography>
          </Stack>
        </Stack>
      </NavLink>
    </Box>
  );
};

const Order = () => {
  const data = useLoaderData();

  return (
    <Stack spacing={{ xs: 1, sm: 2 }}>
      {data.map((order) => (
        <OrderItem
          id={order.id}
          key={order.key}
          name={order.name}
          image={order.image}
          date={order.date}
          price={order.price}
          orderItemId={order.orderItemId}
        />
      ))}
    </Stack>
  );
};

export default Order;
