import React, { Suspense } from "react";
import { useLoaderData, NavLink, Await } from "react-router-dom";
import { Typography, Box, Stack } from "@mui/material";
import Loader from "../General/Loader";

const OrderItem = ({ id, name, date, image, price, orderItemId }) => {
  return (
    <Box
      sx={{ ":hover": { boxShadow: 3 } }}
      bgcolor="white"
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
  const { data } = useLoaderData();

  return (
    <Suspense fallback={<Loader />}>
      <Await resolve={data}>
        {(orders) => (
          <Stack spacing={{ xs: 1, sm: 2 }}>
            {orders.length === 0 && (
              <Typography variant="h4" mx="auto">
                Yoy have not placed any order yet
              </Typography>
            )}
            {orders.map((order) => (
              <OrderItem
                id={order.id}
                key={order.orderItemId}
                name={order.name}
                image={order.image}
                date={order.date}
                price={order.price}
                orderItemId={order.orderItemId}
              />
            ))}
          </Stack>
        )}
      </Await>
    </Suspense>
  );
};

export default Order;
