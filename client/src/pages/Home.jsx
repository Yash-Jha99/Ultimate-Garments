import { Stack } from "@mui/material";
import Banner from "../components/home/Banner";
import CategoryRow from "../components/home/CategoryRow";
import ProductRow from "../components/home/ProductRow";

const images = [
  {
    label: "banner-1",
    image:
      "https://firebasestorage.googleapis.com/v0/b/my-project-e6483.appspot.com/o/images%2Fbanner%2Fbanner-1.jpg?alt=media&token=8e32bb5c-07c2-4dd2-9552-cb03d2289ea9",
  },
  {
    label: "banner-2",
    image:
      "https://firebasestorage.googleapis.com/v0/b/my-project-e6483.appspot.com/o/images%2Fbanner%2Fbanner-2.jpg?alt=media&token=d5213681-39c3-4809-99aa-b13fb59701ba",
  },
];

const Home = () => {
  return (
    <>
      <Banner images={images} />
      <Stack px={{ xs: 1, sm: 4.5 }} spacing={1}>
        <ProductRow title="Men" category="men" />
        <ProductRow title="Women" category="women" />
        <CategoryRow
          title="CATEGORY FOR MEN"
          category="men"
          showItems={[
            "shirts",
            "shorts",
            "t-shirts",
            "denim",
            "trousers",
            "coats & jackets",
          ]}
        />
        <CategoryRow
          title="CATEGORY FOR WOMEN"
          category="women"
          showItems={[
            "tops",
            "dresses",
            "t-shirts",
            "outerwear",
            "skirts",
            "cardigans",
          ]}
        />
      </Stack>
    </>
  );
};

export default Home;
