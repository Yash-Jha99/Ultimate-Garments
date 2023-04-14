import { Button, Checkbox, Grid, Stack, TextField } from "@mui/material";

const AddressForm = ({ formDetails, error, formLabels, onChange, onAdd }) => (
  <>
    <Grid p={2} container rowSpacing={3} columnSpacing={2}>
      {Object.keys(formDetails).map((label, index) =>
        index < 8 ? (
          <Grid key={label} item xs={12} sm={6}>
            <TextField
              error={error[label]}
              color="text"
              label={formLabels[index]}
              required
              size="small"
              fullWidth
              value={formDetails[label]}
              onChange={onChange}
              name={label}
            />
          </Grid>
        ) : (
          <Stack pt={2} direction="row" alignItems="center" key={index}>
            <span>
              <Checkbox
                color="secondary"
                checked={formDetails.isDefault}
                onChange={onChange}
                name="isDefault"
              />
            </span>
            <span>Make this my default address</span>
          </Stack>
        )
      )}
    </Grid>
    <Button variant="contained" color="inherit" fullWidth onClick={onAdd}>
      Add Address
    </Button>
  </>
);

export default AddressForm;
