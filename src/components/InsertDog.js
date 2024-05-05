import * as React from 'react';
import { TextField,  Grid, MenuItem, Button, Typography } from '@mui/material';


const InsertDogForm = () => {
  const [petName, setPetName] = React.useState('');
  const [petBreed, setPetBreed] = React.useState('Labrador');
  const [petAge, setPetAge] = React.useState('');




  const baseURL = "https://api57.netlify.app/.netlify/functions/app2/dogs";

  const handleSubmit = (event) => {

    event.preventDefault();
    // Handle the form submission logic here
  };


  const fortmatResponse = (res) => {
    return JSON.stringify(res, null, 2);
  }

  async function postData() {


    const postData = {
      name: petName,
      breed: petBreed,
      age: petAge
    };

    alert(JSON.stringify(postData));

    try {
      const res = await fetch(`${baseURL}`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          //"x-access-token": "token-value",
        },
        body: JSON.stringify(postData),
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
      //alert(res.statusText);
      //alert(res.status);

    } catch (err) {
      alert(err.message);
    }
  }



  return (
    <form onSubmit={handleSubmit}>


      <Grid container sx={{minWidth:100}} direction={"column"} spacing={5} align="center">
        <Grid item>
          <Typography variant="h5" align="center">
            Insert a Dog Record
          </Typography>
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


          <TextField
            label="Breed"
            value={petBreed}
            select
            variant="outlined"

            onChange={(e) => setPetBreed(e.target.value)}
            required
          >
            {/* Populate the MenuItems with actual breeds */}
            <MenuItem value="Labrador">Labrador</MenuItem>
            <MenuItem value="Poodle">Poodle</MenuItem>
            <MenuItem value="Beagle">Beagle</MenuItem>
          </TextField>
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
          <Button type="submit" variant="contained" onClick={postData}>Insert a Dog</Button>
        </Grid>
      </Grid>

    </form>
  );
};

export default InsertDogForm;