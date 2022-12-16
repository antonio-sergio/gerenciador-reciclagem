import React, { Suspense } from "react";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
function Home() {
    return (
        <Suspense fallback="Loading...">
            <div className="d-flex">
                <div className="nav-bar col col-2">
                <Grid container sx={{ color: 'text.primary' }}>
                    <Typography>Filled</Typography>
                </Grid>
                <Grid item xs={8}>
        <DeleteIcon />
        <DeleteForeverIcon />
      </Grid>
                </div>
                <div className="col col-17">sdfdfdfd</div>
            </div>

        </Suspense>
          
)}

export default Home;