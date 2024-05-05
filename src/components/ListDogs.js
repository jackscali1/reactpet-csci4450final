import React, { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { Typography, TextField, Box, DialogTitle, DialogContent, Grid, Dialog } from '@mui/material'

import { FormControl, FormLabel, Button, InputLabel, DialogActions, Select, DialogContentText } from '@mui/material';

const columns = [
  { field: '_id', headerName: 'ID', width: 300 },
  { field: 'name', headerName: 'Name', width: 300 },
  { field: 'breed', headerName: 'Breed', width: 300 },
  { field: 'age', headerName: 'Age', width: 300 }
]



const ListDogs = () => {

  const [tableData, setTableData] = useState([])
  const [open, setOpen] = useState(false);


  const [currentRowData, setCurrentRowData] = useState({});

  useEffect(() => {
    //fetch("https://jsonplaceholder.typicode.com/posts")
    fetch("https://api57.netlify.app/.netlify/functions/app2/dogs")
      .then((data) => data.json())
      .then((data) => setTableData(data))

  }, [])

  console.log(tableData)



  const handleClose = (event, reason) => {
    if (reason && reason === "backdropClick")
      return;
    setOpen(false);

  };

  const selectComponents = (
    id
  ) => {

    //alert(id);
    const rowResult = tableData.find((e) => e._id === id);


    setCurrentRowData(rowResult);

    //alert(JSON.stringify(rowResult));

    setOpen(true);
  
  };

  return (
    <>    <Grid container direction={"column"} spacing={5} align="center">
      <Grid item>
        <Typography variant="h5" >
          List Dog Records
        </Typography>

      </Grid>

      <Grid item>

        <Box style={{ height: 700, width: '80%' }} >

          <DataGrid
            getRowId={(row) => row._id}
            rows={tableData}
            columns={columns}
            pageSize={12}
            onRowClick={(rows) => { selectComponents(rows.id) }}

          />


        </Box>
      </Grid>
    </Grid>

      <Dialog
        //titleStyle={{ textAlign: "center" }}
        open={open}
        onClose={handleClose}

      >
        <DialogTitle textAlign="center"> Detailed information of a Dog</DialogTitle>


        <DialogContent>

          <DialogContentText>
            Hello, here is the basic information you are looking for.
          </DialogContentText>
          <Box
            noValidate
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              m: 'auto',
              width: 'fit-content',
            }}
          >
            <FormControl sx={{ mt: 2, minWidth: 120 }}>
            <FormLabel>Dog Name</FormLabel>
              <TextField InputProps={{
                readOnly: true,
              }} value={currentRowData.name}>

              </TextField>

              <FormLabel>Dog Breed</FormLabel>
              <TextField InputProps={{
                readOnly: true,
              }} value={currentRowData.breed}>

              </TextField>

              <FormLabel>Dog Age</FormLabel>
              <TextField InputProps={{
                readOnly: true,
              }} value={currentRowData.age}>

              </TextField>

            </FormControl>

          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>

    </>

  )
}

export default ListDogs;




