import React, { Suspense } from "react";
import { useLoaderData, NavLink, Await } from "react-router-dom";
import { Typography, Box, Stack } from "@mui/material";
import Loader from "../general/Loader";
import NotFound from "../general/NotFound";

const OrderItem = ({
  id,
  name,
  orderedDate,
  image,
  price,
  orderItemId,
  status,
}) => {
  return (
    <Box
      sx={{ ":hover": { boxShadow: 4 } }}
      bgcolor="white"
      padding={{ xs: 1, sm: 2 }}
      boxShadow={2}
    >
      <NavLink
        style={{ textDecoration: "none", color: "black", display: "block" }}
        to={`/myaccount/orders/${id}/${orderItemId}`}
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
            <Typography mb={2} fontWeight="bold" variant="h6" color="black">
              ₹ {price}
            </Typography>
            {status === "FAILED" ? (
              <Typography fontWeight={500} color="error">
                Order Failed
              </Typography>
            ) : (
              <Typography fontWeight={500} variant="body2">
                Ordered on {orderedDate}
              </Typography>
            )}
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
          <Stack spacing={{ xs: 1, sm: 1.5 }}>
            {orders.length === 0 && (
              <NotFound message="You have not placed any order yet" />
            )}
            {orders.map((order) => (
              <OrderItem
                id={order.id}
                key={order.orderItemId}
                name={order.name}
                image={order.image}
                orderedDate={order.orderedDate}
                price={order.price}
                orderItemId={order.orderItemId}
                status={order.status}
              />
            ))}
          </Stack>
        )}
      </Await>
    </Suspense>
  );
};

export default Order;
