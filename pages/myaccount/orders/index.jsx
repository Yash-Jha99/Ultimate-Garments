import React from "react";
import { Typography, Box, Stack } from "@mui/material";
import NotFound from "@/components/general/NotFound";
import Image from "next/image";
import MyAccount from "@/components/layouts/MyAccount";
import useDataFetch from "@/hooks/useDataFetch";
import Link from "next/link";
import wrapper from "@/store/store";

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
      <Link
        style={{ textDecoration: "none", color: "black", display: "block" }}
        href={`/myaccount/orders/${id}/${orderItemId}`}
      >
        <Stack direction="row" spacing={2} pb={{ xs: 1, sm: 1 }}>
          <Stack alignItems="center">
            <Box
              height={{ xs: 72, sm: 120 }}
              width={{ xs: 72, sm: 120 }}
              mx={{ xs: 0, sm: 2 }}
            >
              <Image
                src={image}
                alt="product"
                style={{
                  objectFit: "contain",
                }}
                width={120}
                height={120}
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
      </Link>
    </Box>
  );
};

const Order = () => {
  const { data: orders } = useDataFetch("order", []);

  return (
    <MyAccount>
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
    </MyAccount>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ res, req }) => {
      const { token } = store.getState().auth;
      if (!token) {
        res.setHeader("Location", "/login?from=" + req.url);
        res.statusCode = 302;
        res.end();
      }
      return { props: {} };
    }
);

export default Order;
