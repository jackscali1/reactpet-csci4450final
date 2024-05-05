import * as React from 'react';
import { TextField, Button, Typography, Grid } from '@mui/material';

const DeleteDogForm = () => {
    const [petID, setPetID] = React.useState('');


    const baseURL = "https://api57.netlify.app/.netlify/functions/app2/dogs";

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle the form submission logic here
    };

    const fortmatResponse = (res) => {
        return JSON.stringify(res, null, 2);
    }

    async function deleteData() {

        if (petID.trim() === "") {
            alert("Empty id, need to input an id to delete.");
            return;
        }
        else
            alert("will delete" + petID);

        try {
            const endPoint=`${baseURL}/${petID}`;
            alert(endPoint);
            const res = await fetch(endPoint, {
                method: "delete",
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": "token-value",
                }
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

            <Grid container direction={"column"} spacing={5} align="center">
                <Grid item>
                    <Typography variant="h5" >
                        Delete a Dog Record by ID
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

                    <Button type="submit" variant="contained" onClick={deleteData}>Delete a God</Button>

                </Grid>
            </Grid>





        </form>
    );
};

export default DeleteDogForm;