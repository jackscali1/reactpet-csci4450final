import * as React from 'react';
import { TextField, Grid, Typography, Select, MenuItem, Button } from '@mui/material';

const UpdateDogForm = () => {
  const [petName, setPetName] = React.useState('');
  const [petBreed, setPetBreed] = React.useState('Poodle');
  const [petAge, setPetAge] = React.useState('');
  const [petID, setPetID] = React.useState('');

  const baseURL = "https://api57.netlify.app/.netlify/functions/app2/dogs";

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle the form submission logic here
  };

  const fortmatResponse = (res) => {
    return JSON.stringify(res, null, 2);
  }

  async function updateData() {

    const updateData = {
      name: petName,
      breed: petBreed,
      age: petAge
    };

    try {
      const res = await fetch(`${baseURL}/${petID}`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          //"x-access-token": "token-value",
        },
        body: JSON.stringify(updateData),
      });

      if (!res.ok) {
        const message = `An error has occured: ${res.status} - ${res.statusText}`;
        throw new Error(message);
      }

      const data = await res.json();

      const result = {
        status: res.status + "-" + res.statusText,
        headers: {
          "Content-Type": res.headers.get("Content-Type"),
          "Content-Length": res.headers.get("Content-Length"),
        },
        data: data,
      };

      alert(fortmatResponse(result));
      alert(res.statusText);
      alert(res.status);

    } catch (err) {
      alert(err.message);
    }
  }



  return (
    <form onSubmit={handleSubmit}>

      <Grid container direction={"column"} spacing={5} align="center">

      <Grid item>
          <Typography variant="h5" align="center">
            Update a Dog Record
          </Typography>
        </Grid>

        <Grid item>
          <TextField
            label="ID"
            value={petID}
            onChange={(e) => setPetID(e.target.value)}
            required
          />

        </Grid>

        <Grid item>
          <TextField
            label="Pet Name"
            value={petName}

            onChange={(e) => setPetName(e.target.value)}
            required
          />
        </Grid>
        <Grid item>
          <Select
            label="Breed"
            value={petBreed}

            onChange={(e) => setPetBreed(e.target.value)}
            required
          >
            {/* Populate the MenuItems with actual breeds */}
            <MenuItem value="Labrador">Labrador</MenuItem>
            <MenuItem value="Poodle">Poodle</MenuItem>
            <MenuItem value="Beagle">Beagle</MenuItem>
          </Select>
        </Grid>
        <Grid item>
          <TextField
            label="Age"
            value={petAge}

            onChange={(e) => setPetAge(e.target.value)}
            required
          />

        </Grid>

        <Grid item>
          <Button type="submit" variant="contained" onClick={updateData}>Update a Dog</Button>
        </Grid>
      </Grid>

    </form>
  );
};

export default UpdateDogForm;