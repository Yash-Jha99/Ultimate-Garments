import React, { useEffect, useState } from "react";
import useDataFetch from "../../hooks/useDataFetch";
import {
  Stack,
  Typography,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  FormControlLabel,
  Checkbox,
  RadioGroup,
  Radio,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { CheckCircle, Circle } from "@mui/icons-material";

const FilterPanel = ({ onChange }) => {
  const [priceFilters, setPriceFilters] = useState(null);
  const { data: sizeFilters, setData: setSizeFilters } = useDataFetch(
    "product/options/size",
    []
  );

  const { data: colorFilters, setData: setColorFilters } = useDataFetch(
    "product/options/color",
    []
  );

  const handleChange = (event) => {
    const { name, checked } = event.target;
    setSizeFilters(
      sizeFilters.map((size) =>
        size.name === name ? { ...size, active: checked } : size
      )
    );
  };

  const handleColorChange = (event) => {
    const { name, checked } = event.target;
    setColorFilters(
      colorFilters.map((color) =>
        color.value === name ? { ...color, active: checked } : color
      )
    );
  };

  const handlePriceChange = (event) => {
    setPriceFilters(event.target.value);
  };

  useEffect(() => {
    onChange((filters) => ({
      ...filters,
      color:
        colorFilters
          .filter((color) => color.active)
          .map((color) => color.name)
          .join("+") || null,
      size:
        sizeFilters
          .filter((size) => size.active)
          .map((size) => size.name)
          .join("+") || null,
      price: priceFilters,
    }));
  }, [sizeFilters, colorFilters, priceFilters, onChange]);

  return (
    <>
      <Typography p={2} variant="h6" borderBottom="1px solid lightgray">
        FILTER
      </Typography>
      <Accordion expanded elevation={0}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>SIZE</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack>
            {sizeFilters.map(({ id, name, active }) => (
              <FormControlLabel
                key={id}
                control={
                  <Checkbox
                    size="small"
                    color="secondary"
                    checked={active ?? false}
                    onChange={handleChange}
                    name={name}
                  />
                }
                label={name.toUpperCase()}
              />
            ))}
          </Stack>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded elevation={0}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>COLOR</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {colorFilters.map(({ id, value, active }) => (
            <Checkbox
              key={id}
              size="small"
              color="secondary"
              checked={active ?? false}
              onChange={handleColorChange}
              name={value}
              icon={<Circle sx={{ fontSize: 36, color: value }} />}
              checkedIcon={<CheckCircle sx={{ fontSize: 36, color: value }} />}
            />
          ))}
        </AccordionDetails>
      </Accordion>
      <Accordion expanded elevation={0}>
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
    </>
  );
};

export default FilterPanel;
