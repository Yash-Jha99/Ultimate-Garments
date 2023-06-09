import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

const FilterPanel = ({ onChange, filterData }) => {
  const { size, color } = filterData;
  const [priceFilters, setPriceFilters] = useState(null);
  const [sizeFilters, setSizeFilters] = useState([]);
  const [colorFilters, setColorFilters] = useState([]);
  const [visibleFilterLength, setVisibleFilterLength] = useState({
    size: 6,
    color: 6,
  });

  const handleChange = (event) => {
    const { name, checked } = event.target;
    setSizeFilters(
      sizeFilters.map((size) =>
        size.size === name ? { ...size, active: checked } : size
      )
    );
  };

  const handleColorChange = (event) => {
    const { name, checked } = event.target;
    setColorFilters(
      colorFilters.map((color) =>
        color.color === name ? { ...color, active: checked } : color
      )
    );
  };

  const handlePriceChange = (event) => {
    setPriceFilters(event.target.value);
  };

  const handleSeeMore = (option) => {
    if (option === "size")
      setVisibleFilterLength((data) => ({ ...data, size: sizeFilters.length }));
    else
      setVisibleFilterLength((data) => ({
        ...data,
        color: colorFilters.length,
      }));
  };

  const handleSeeLess = (option) => {
    if (option === "size")
      setVisibleFilterLength((data) => ({ ...data, size: 6 }));
    else
      setVisibleFilterLength((data) => ({
        ...data,
        color: 6,
      }));
  };

  const handleClearFilters = () => {
    setColorFilters(colorFilters.map((color) => ({ ...color, active: false })));
    setSizeFilters(sizeFilters.map((size) => ({ ...size, active: false })));
    setPriceFilters(null);
  };

  useEffect(() => {
    const filters = {
      color:
        colorFilters
          .filter((color) => color.active)
          .map((color) => color.color)
          .join("+") || null,
      size:
        sizeFilters
          .filter((size) => size.active)
          .map((size) => size.size)
          .join("+") || null,
      price: priceFilters,
    };
    if (filters.size || filters.color || filters.price) onChange(filters);
  }, [sizeFilters, priceFilters, colorFilters]);

  useEffect(() => {
    setColorFilters(color);
    setSizeFilters(size);
  }, [size, color]);

  return (
    <Paper elevation={2}>
      <Stack p={2} direction="row" justifyContent="space-between">
        <Typography variant="h6">FILTER</Typography>
        <Button size="small" color="secondary" onClick={handleClearFilters}>
          Clear filters
        </Button>
      </Stack>
      <Divider />
      <Accordion defaultExpanded disableGutters elevation={0}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>SIZE</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack>
            {sizeFilters
              .slice(0, visibleFilterLength.size)
              .map(({ size, active }) => (
                <FormControlLabel
                  key={size}
                  control={
                    <Checkbox
                      size="small"
                      color="secondary"
                      checked={active ?? false}
                      onChange={handleChange}
                      name={size}
                    />
                  }
                  label={size.toUpperCase()}
                />
              ))}
          </Stack>
        </AccordionDetails>
        <AccordionActions>
          {visibleFilterLength.size === 6 ? (
            <Button color="secondary" onClick={() => handleSeeMore("size")}>
              See More
            </Button>
          ) : (
            <Button color="secondary" onClick={() => handleSeeLess("size")}>
              See Less
            </Button>
          )}
        </AccordionActions>
      </Accordion>
      <Accordion defaultExpanded disableGutters elevation={0}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>COLOR</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack>
            {colorFilters
              .slice(0, visibleFilterLength.color)
              .map(({ color, active }) => (
                <FormControlLabel
                  key={color}
                  control={
                    <Checkbox
                      size="small"
                      color="secondary"
                      checked={active ?? false}
                      onChange={handleColorChange}
                      name={color}
                    />
                  }
                  label={color}
                />
              ))}
          </Stack>
        </AccordionDetails>
        <AccordionActions>
          {visibleFilterLength.color === 6 ? (
            <Button color="secondary" onClick={() => handleSeeMore("color")}>
              See More
            </Button>
          ) : (
            <Button color="secondary" onClick={() => handleSeeLess("color")}>
              See Less
            </Button>
          )}
        </AccordionActions>
      </Accordion>
      <Accordion defaultExpanded disableGutters elevation={0}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>PRICE</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={priceFilters}
              onChange={handlePriceChange}
            >
              <FormControlLabel
                value="asc"
                control={<Radio size="small" color="secondary" />}
                label="Price : Low to High"
              />
              <FormControlLabel
                value="desc"
                control={<Radio size="small" color="secondary" />}
                label="Price : High to Low"
              />
            </RadioGroup>
          </Stack>
        </AccordionDetails>
      </Accordion>
    </Paper>
  );
};

export default FilterPanel;
