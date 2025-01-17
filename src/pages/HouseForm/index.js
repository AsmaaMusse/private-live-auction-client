import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ApolloError, useMutation } from "@apollo/client";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Container from "@mui/material/Container";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import { Navigate } from "react-router-dom";

import { CREATE_HOUSE } from "../../mutations";
import { MultiImageUploader } from "../../components/MultiImageUploader";

export const HouseForm = ({ user }) => {
  const [executeCreateHouse, { loading, error }] = useMutation(CREATE_HOUSE);

  const [uploadedImages, setUploadedImages] = useState([]);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({
    title,
    description,
    propertyType,
    reserveAmount,
    startingBid,
    bedrooms,
    bathrooms,
    googleMapUrl,
    keyFeatures,
  }) => {
    try {
      const { data } = await executeCreateHouse({
        variables: {
          input: {
            title,
            description,
            propertyType,
            reserveAmount: parseFloat(reserveAmount),
            startingBid: parseFloat(startingBid),
            bedrooms: parseInt(bedrooms),
            bathrooms: parseInt(bathrooms),
            googleMapUrl,
            keyFeatures,
            images: uploadedImages,
          },
        },
      });

      if (error) {
        throw new ApolloError("Failed to create house, please try again later");
      }

      if (data.addListing) {
        navigate("/dashboard", { replace: true });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: 4,
      mt: "30px",
    },
    loadingButton: { marginTop: 3, marginBottom: 2 },
    errorContainer: {
      marginTop: 2,
      color: "#d32f2f",
      textAlign: "center",
    },
  };

  if (!user.isLoggedIn) {
    console.log("not logged in");
    return <Navigate to="/signup" replace />;
  }

  return (
    <Container maxWidth="md" sx={{ my: 4 }}>
      <Stack spacing={3}>
        <Typography variant="h5" gutterBottom sx={{ textAlign: "center" }}>
          House Form
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            {/* TITLE */}
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                id="title"
                name="title"
                label="Title"
                fullWidth
                autoComplete="title"
                variant="outlined"
                {...register("title", { required: true })}
                error={!!errors.title}
                disabled={loading}
              />
            </Grid>
            {/* PROPERTY TYPE */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="propertyType">Property Type</InputLabel>
                <Select
                  labelId="propertyTypeLabelId"
                  id="propertyTypeId"
                  // value={propType}
                  defaultValue=""
                  label="Property Type"
                  // onChange={handlePropTypeChange}
                  {...register("propertyType", { required: true })}
                  error={!!errors.propertyType}
                  disabled={loading}
                >
                  <MenuItem value={"Detached"}>Detached</MenuItem>
                  <MenuItem value={"Semi-Detached"}>Semi-Detached</MenuItem>
                  <MenuItem value={"Terraced"}>Terraced</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {/* DESCRIPTION  */}
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                id="description"
                label="Description"
                multiline
                rows={5}
                {...register("description", { required: true })}
                error={!!errors.description}
                disabled={loading}
              />
            </Grid>
            {/* STARTING BID */}
            <Grid item xs={12} sm={6} className="relativeForm">
              <FormControl fullWidth>
                <InputLabel htmlFor="outlined-adornment-amount">
                  Starting Bid
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-amount"
                  startAdornment={
                    <InputAdornment position="start">£</InputAdornment>
                  }
                  label="Starting Bid"
                  {...register("startingBid", { required: true })}
                  error={!!errors.startingBid}
                  disabled={loading}
                />
              </FormControl>
            </Grid>
            {/* RESERVE AMOUNT */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel htmlFor="outlined-adornment-amount">
                  Reserve Amount
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-amount"
                  startAdornment={
                    <InputAdornment position="start">£</InputAdornment>
                  }
                  label="Reserve Bid"
                  {...register("reserveAmount", { required: true })}
                  error={!!errors.reserveAmount}
                  disabled={loading}
                />
              </FormControl>
            </Grid>
            {/* BEDROOMS */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="bedrooms">Bedrooms</InputLabel>
                <Select
                  id="propertyTypeId"
                  // value={bedrooms}
                  label="Bedrooms"
                  defaultValue=""
                  // onChange={handleBedroomsChange}
                  {...register("bedrooms", { required: true })}
                  error={!!errors.bedrooms}
                  disabled={loading}
                >
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={6}>6</MenuItem>
                  <MenuItem value={7}>7</MenuItem>
                  <MenuItem value={8}>8</MenuItem>
                  <MenuItem value={9}>9</MenuItem>
                  <MenuItem value={10}>10</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* BATHROOMS */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="bathrooms">Bathrooms</InputLabel>
                <Select
                  id="propertyTypeId"
                  // value={bathrooms}
                  label="bathrooms"
                  defaultValue=""
                  // onChange={handleBathroomsChange}
                  {...register("bathrooms", { required: true })}
                  error={!!errors.bathrooms}
                  disabled={loading}
                >
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={6}>6</MenuItem>
                  <MenuItem value={7}>7</MenuItem>
                  <MenuItem value={8}>8</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* GOOGLE MAP URL */}
            <Grid item xs={12} sm={12}>
              <TextField
                id="googleMapUrl"
                name="googleMapUrl"
                label="Google Map Url"
                autoComplete="googleMapUrl"
                fullWidth
                variant="outlined"
                {...register("googleMapUrl", { required: true })}
                error={!!errors.googleMapUrl}
                disabled={loading}
              />
            </Grid>

            {/* KEY FEATURES */}
            <Grid item xs={12} sm={12}>
              <TextField
                id="keyFeatures"
                name="keyFeatures"
                label="Key Features"
                helperText="Separate key features with a comma (i.e: Garden, Parking, Large Bedrooms)"
                autoComplete="keyFeatures"
                fullWidth
                variant="outlined"
                {...register("keyFeatures", { required: true })}
                error={!!errors.keyFeatures}
                disabled={loading}
              />
            </Grid>

            {/* IMAGES */}
            <Grid item xs={12} sm={12}>
              <MultiImageUploader
                uploadedImages={uploadedImages}
                setUploadedImages={setUploadedImages}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              {/* SUBMIT BUTTON */}
              <LoadingButton
                loadingIndicator="Loading..."
                loading={loading}
                variant="contained"
                fullWidth
                type="submit"
                sx={styles.loadingButton}
              >
                Submit
              </LoadingButton>
            </Grid>
          </Grid>
        </Box>
      </Stack>
    </Container>
  );
};
