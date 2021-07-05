import * as React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@material-ui/core'

const AddressForm = ({
    handleNameChange,
    handlePhoneChange,
    handleAddress1Change,
    handleAddress2Change,
    handleCityChange,
    handleCountyChange,
    handleZipChange,
    handlePaymentChange,
    handleEmailChange,
    activeState
}) => {
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Shipping address
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="client_name"
                        name="clientName"
                        label="Full Name"
                        fullWidth
                        autoComplete="given-name"
                        variant="standard"
                        onChange={handleNameChange}
                        error={activeState.name.length < 4 && activeState.name}
                        helperText="Name must be 4 characters or longer."
                        value={activeState.name}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="phone"
                        name="phone"
                        label="Phone Number"
                        fullWidth
                        variant="standard"
                        onChange={handlePhoneChange}
                        error={activeState.phone.length < 10 && activeState.phone}
                        helperText="Phone number length must be at least 9 characters long."
                        value={activeState.phone}
                    />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <TextField
                        required
                        id="email"
                        name="email"
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="standard"
                        onChange={handleEmailChange}
                        error={activeState.email.length < 6 && activeState.email}
                        helperText="Email address length must be of at least 6 characters and must have a valid form."
                        value={activeState.email}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="address1"
                        name="address1"
                        label="Address line 1"
                        fullWidth
                        autoComplete="shipping address-line1"
                        variant="standard"
                        onChange={handleAddress1Change}
                        helperText="Your delivery address. You can use both fields. Must be at least 9 characters long."
                        error={activeState.address1.length < 9 && activeState.address1}
                        value={activeState.address1}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="address2"
                        name="address2"
                        label="Address line 2"
                        fullWidth
                        autoComplete="shipping address-line2"
                        variant="standard"
                        onChange={handleAddress2Change}
                        helperText="This field is optional."
                        value={activeState.address2}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="city"
                        name="city"
                        label="City"
                        fullWidth
                        autoComplete="shipping address-level2"
                        variant="standard"
                        onChange={handleCityChange}
                        error={activeState.city.length < 2 && activeState.city}
                        helperText="Name of the city."
                        value={activeState.city}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="state"
                        name="state"
                        label="State/Province/Region"
                        fullWidth
                        variant="standard"
                        onChange={handleCountyChange}
                        error={activeState.county.length < 3 && activeState.county}
                        helperText="Name of your county."
                        value={activeState.county}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="zip"
                        name="zip"
                        label="Zip / Postal code"
                        fullWidth
                        autoComplete="shipping postal-code"
                        variant="standard"
                        onChange={handleZipChange}
                        helperText="Zip / Postal code is optional"
                        value={activeState.zip}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Payment Type</FormLabel>
                        <RadioGroup aria-label="gender" name="gender1" value={activeState.payment} onChange={handlePaymentChange}>
                            <FormControlLabel value="Online Payment" control={<Radio />} label="Online Payment" />
                            <FormControlLabel value="Cash on Delivery" control={<Radio />} label="Cash on Delivery" />
                        </RadioGroup>
                    </FormControl>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default AddressForm