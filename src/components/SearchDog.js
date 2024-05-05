import { useState } from 'react';
import { TextField, Button, Typography, Grid, CircularProgress } from '@mui/material';

const SearchDogForm = () => {
  const [petID, setPetID] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({ name: '', breed: '', age: '' });


  const baseURL = "https://api57.netlify.app/.netlify/functions/app2/dogs";

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle the form submission logic here
  };

  const fortmatResponse = (res) => {
    return JSON.stringify(res, null, 2);
  }

  async function searchData() {
    setLoading(true);

    alert("will search a dog by its id: " + petID);
    try {
      const res = await fetch(`${baseURL}/${petID}`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          //"x-access-token": "token-value",
        }
      });

      if (!res.ok) {
        const message = `An error has occured: ${res.status} - ${res.statusText}`;
        throw new Error(message);
      }

      const data = await res.json();

      setData({ name: data.name, age: data.age, breed: data.breed });

      /*
      const result = {
          status: res.status + "-" + res.statusText,
          headers: {
              "Content-Type": res.headers.get("Content-Type"),
              "Content-Length": res.headers.get("Content-Length"),
          },
          data: data,
      };
*/
      alert(fortmatResponse(result));
      //alert(res.statusText);
      //alert(res.status);

    } catch (err) {

      alert(err.message);
      setData({ name: 'not Found', age: 'not Found', breed: 'not Found' });
    }

    setLoading(false);
  }



  return (
    <>
      {loading ? (
        <CircularProgress alignment="center" />
      ) : (
        <form onSubmit={handleSubmit}>

          <Grid container direction={"column"} spacing={5} align="center">
            <Grid item>
              <Typography variant="h5" >
                Search a Dog Record by ID
              </Typography>
            </Grid>
            <Grid item>

              <TextField
                label="Pet ID"
                value={petID}
                variant="outlined"
                onChange={(e) => setPetID(e.target.value)}
                required
                sx={{ width: 300 }}
              />

            </Grid>

            <Grid item>

              <Button type="submit" variant="contained" onClick={searchData}>Search a Dog by its ID</Button>

            </Grid>

            <Grid item>
              <TextField
                label="Pet Name"
                value={data.name}
                margin="normal"
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item>
              <TextField
                label="Breed"
                value={data.breed}
                margin="normal"
                InputProps={{
                  readOnly: true,
                }}
              />

              <Grid item>
                <TextField
                  label="Age"
                  value={data.age}
                  margin="normal"
                  InputProps={{
                    readOnly: true,
                  }} />
              </Grid>
            </Grid>

          </Grid>



        </form>
      )}
    </>
  );
};

export default SearchDogForm;