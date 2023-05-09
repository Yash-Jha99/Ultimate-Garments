import React, { Suspense } from "react";
import { useLoaderData, NavLink, Await } from "react-router-dom";
import { Typography, Box, Stack, Divider, Paper } from "@mui/material";
import Loader from "../general/Loader";
import NotFound from "../general/NotFound";

const OrderItem = ({
  id,
  name,
  orderedDate,
  image,
  price,
  orderId,
  status,
}) => {
  return (
    <Paper
      sx={{ p: { xs: 1, sm: 2 }, ":hover": { boxShadow: 4 } }}
    >
      <NavLink
        style={{ textDecoration: "none", color: "inherit", display: "block" }}
        to={`/myaccount/order_details?order_id=${orderId}&item_id=${id}`}
      >
        <Stack direction="row" spacing={2} pb={{ xs: 1, sm: 1 }}>
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
            <Typography mb={2} fontWeight="bold" variant="h6">
              ₹ {price}
            </Typography>
            {status === "FAILED" ? (
              <Typography fontWeight={500} color="error">
                Order Failed
              </Typography>
            ) : (
              <Typography fontWeight={500} variant="body2">
                Ordered on {new Date(orderedDate).toDateString()}
              </Typography>
            )}
          </Stack>
        </Stack>
      </NavLink>
    </Paper>
  );
};

const Order = () => {
  const { data } = useLoaderData();

  return (
    <Suspense fallback={<Loader />}>
      <Await resolve={data}>
        {(orders) => (
          <Stack spacing={{ xs: 1, sm: 1.5 }}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h5" >My Orders</Typography>
            </Paper>
            {orders.length === 0 && (
              <NotFound message="You have not placed any order yet" />
            )}
            {orders.map((item) => (
              <OrderItem
                id={item.id}
                key={item.id}
                name={item.product.name}
                image={item.product.image}
                orderedDate={item.order.orderedAt}
                price={item.price}
                orderId={item.orderId}
                status={item.order.status}
              />
            ))}
          </Stack>
        )}
      </Await>
    </Suspense>
  );
};

export default Order;
