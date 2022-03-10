import { Typography, Box, Grid, TextField, Button } from '@mui/material';
import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
//import DateAdapter from '@mui/lab/AdapterLuxon';

function Simulator() {
    let nav = useNavigate();

    const handleCredits = () => {
        nav("/howitworks");
    }

    return (
        <Fragment> 
            <Grid container spacing={2}>
            
                <Grid item xs={3} sx={{witdh: 220, height: 220, backgroundColor: 'box.main', borderRadius: "5px", margin: "10px"}}>
                    <Typography variant="h5" sx={{color: 'secondary.main', fontWeight: 'bold'}}>
                        TODAY'S S&P500
                    </Typography>
                </Grid>
                
                <Grid item xs={3} sx={{witdh: 220, height: 220, 
                    backgroundImage: "linear-gradient(45deg, #394F98, #690A73 50%, #A8563B)", 
                    borderRadius: "5px", margin: "10px"}}>
                    <Typography variant="h5" sx={{color: 'secondary.main', fontWeight: 'bold'}}>
                        Performance
                    </Typography>
                </Grid>
                <Grid item xs={4} sx={{margin: "10px"}}>
                </Grid>

                <Grid item xs={3} sx={{witdh: 220, height: 220, backgroundColor: 'box.main', borderRadius: "5px", margin: "10px"}}>
                    <Typography variant="h5" sx={{color: 'secondary.main', fontWeight: 'bold'}}>
                        Simulation
                    </Typography>
                    
                    <TextField id="outlined-basic" label="Select starting amount ($USD)" variant="outlined" color="secondary" focused sx={{backgroundColor: 'gray', border: "5px"}}/>
                
                    <TextField id="outlined-basic" label="Select period" variant="outlined" color="secondary" focused sx={{backgroundColor: 'gray', border: "5px"}}/>
                    
                    <Button variant="contained" color='secondary' sx={{color: "secondary.text"}}>Simulate!</Button>
                </Grid>

                <Grid item xs={3} sx={{witdh: 220, height: 220, backgroundColor: 'box.main', borderRadius: "5px", margin: "10px"}}>
                </Grid>

                <Grid item xs={4} sx={{witdh: 220, height: 220, backgroundImage: "linear-gradient(45deg, #394F98, #690A73 50%, #A8563B)", borderRadius: "5px", margin: "10px"}}>
                </Grid>
            </Grid>
            <div style={{float: "right"}}>
                <Button variant="text" onClick={()=> handleCredits()} color='text'>
                How it works - Creators
                </Button> 
            </div>
            <div>
                .
            </div>
        </Fragment>
     );
}

export default Simulator;