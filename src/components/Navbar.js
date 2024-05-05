//import React,{Link} from 'react'; 
import Link from '@mui/material/Link';
import { Grid, Typography} from '@mui/material';


const Navbar = () => {

const menuData=[
  {path:"ListDogs", function:"List all Dogs"}, 
  {path:"InsertDog", function:"Insert a dog"}, 
  {path:"DeleteDog", function:"Delete a dog"},
  {path:"UpdateDog", function:"Update a dog"}, 
  {path:"SearchDog", function:"Search a dog by its id"},
  {path:"DataGrid", function:"All Posts"},
] ;


  return (

    <>
    <Typography variant="h5"> Spr. 24 4450 IP Menu </Typography>

<Grid container spacing={3} marginBottom={10}>
  {menuData.map((entry, index) => (
    <Grid item  key={index}>
      <Link href={`${entry.path}`}>{entry.function}</Link>
    </Grid>
  ))}
</Grid>

</>
  )

}

export default Navbar;

