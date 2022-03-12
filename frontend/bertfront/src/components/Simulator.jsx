import { Typography, Box, Grid, TextField, Button } from '@mui/material';
import { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Ring from './Ring';
import BarProfit from './BarProfit';
import LinePredict from './LinePredict';
import AccumProfit from './AccumProfit';

//import DateAdapter from '@mui/lab/AdapterLuxon';


function Simulator() {

    const [actual, setActual] = useState('no data');
    const [predicted, setPredicted] = useState('no data');
    const [netProfit, setNetProfit] = useState(0);
    let nav = useNavigate();

    const handleCredits = () => {
        nav("/howitworks");
    }

    return (
        <Fragment> 
            <Grid container spacing={2}>
            
                <Grid item xs={3} sx={{witdh: 220, height: 220, backgroundColor: 'box.main', borderRadius: "5px",
                 margin: "10px"}}>
                    <Typography variant="h5" sx={{color: 'secondary.main', fontWeight: 'bold'}}>
                        TODAY'S S&P500
                    </Typography>
                    

                    <Typography sx={{color: 'secondary.text', fontWeight: 'bold', textAlign: 'left'}}>
                        Actual price
                    </Typography>
                    <Typography variant="h4" sx={{color: 'secondary.text', fontWeight: 'bold', textAlign: 'left'}}>
                        {actual}
                    </Typography>

                    <Typography sx={{color: 'secondary.text', fontWeight: 'bold', textAlign: 'left'}}>
                        Predicted price
                    </Typography>
                    <Typography variant="h4" sx={{color: 'secondary.text', fontWeight: 'bold', textAlign: 'left'}}>
                        {predicted}
                    </Typography>

                </Grid>
                
                <Grid item xs={3} sx={{witdh: 220, height: 220, 
                    backgroundImage: "linear-gradient(45deg, #394F98, #690A73 50%, #A8563B)", 
                    borderRadius: "5px", margin: "10px", padding: "16px"}}>
                    <Typography variant="h5" sx={{color: 'secondary.main', fontWeight: 'bold'}}>
                        Performance
                    </Typography>
                    
                    <Box sx={{width: 140, height: 140, margin: "0px 0px 0px 65px"}}> 
                        
                            <Ring />
                        
                    </Box>
                    <Typography sx={{color: 'secondary.text', frontWeight: 'bold'}}>
                        Error rate
                    </Typography>
                    
                </Grid>
                <Grid item xs={5} sx={{margin: "10px", padding: "16px"}}>
                    <Typography sx={{color: 'secondary.text', textAlign: 'right'}}>
                        Bertrade is a stockmarket simulation 
                        bot based on a Machine Learning 
                        model using the state of art
                        NLP technology. The bot make use of
                        Tweets and internal market information
                        to make buy or sell decisions.
                    </Typography>
                    <Typography sx={{color: 'secondary.text', textAlign: 'right'}}>
                        You can select a starting amount, a time
                        period and a strategy to get an
                        estimation of how much you could earn
                        following the bots decisions.
                    </Typography>
                </Grid>

                <Grid item xs={4} sx={{ height: 350, backgroundColor: 'box.main', borderRadius: "5px", margin: "10px", }}>
                    <div style={{display: "block"}}>
                        <Typography variant="h5" sx={{color: 'secondary.main', fontWeight: 'bold'}}>
                            Simulation
                        </Typography>
    
                        <TextField id="outlined-basic" label="Select starting amount ($USD)" variant="outlined" color="secondary" focused sx={{backgroundColor: 'gray', border: "5px", margin: "20px"}}/>
                    
                        <TextField id="outlined-basic" label="Select period" variant="outlined" color="secondary" focused sx={{backgroundColor: 'gray', border: "5px", margin: "20px"}}/>
                        
                        
                    </div>
                    <div>
                        <Button variant="contained" color='secondary' 
                        sx={{color: "secondary.text", float: "centre"}}>Simulate!</Button>
                    </div>
                </Grid>

                <Grid item xs={3} sx={{ height: 350, backgroundColor: 'box.main', borderRadius: "5px", margin: "10px", padding: "16px"}}>
                    <Box sx={{margin: "15px"}}>
                        <LinePredict />
                    </Box>
                    
                    <BarProfit />
                </Grid>

                <Grid item xs={4} sx={{ height: 350, backgroundImage: "linear-gradient(45deg, #394F98, #690A73 50%, #A8563B)", 
                borderRadius: "5px", margin: "10px", padding: "16px"}}>
                    <AccumProfit />
                    <Box sx={{display: 'inline'}}>
                        <Typography variant='h4' color='secondary.text' sx={{fontWeight: 'bold', display: 'inline'}}>
                            Net profit: $
                            
                        </Typography>
                        <Typography variant='h4' color='profit.main' sx={{fontWeight: 'bold', display: 'inline'}}>
                                {netProfit}
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
            <div style={{float: "right"}}>
                <Button variant="text" onClick={()=> handleCredits()} color='text' sx={{fontSize: "24px", fontWeight: "900"}}>
                How it works - Creators
                </Button> 
            </div>
            <div style={{height: "50px"}}> 
            </div>
        </Fragment>
     );
}

export default Simulator;