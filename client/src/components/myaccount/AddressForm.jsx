import { Button, Checkbox, Grid, Stack, TextField } from "@mui/material";

const AddressForm = ({
  formDetails,
  error,
  formLabels,
  onChange,
  onSave,
  onCancel,
}) => (
  <>
    <Grid p={2} container rowSpacing={3} columnSpacing={2}>
      {Object.keys(formDetails).map((label, index) =>
        index < 8 ? (
          <Grid key={label} item xs={12} sm={6}>
            <TextField
              error={error[label]}
              color="secondary"
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
    <Button
      sx={{ mb: 1 }}
      variant="contained"
      fullWidth
      onClick={onSave}
    >
      Save
    </Button>
    <Button color="inherit" fullWidth onClick={onCancel}>
      Cancel
    </Button>
  </>
);

export default AddressForm;
