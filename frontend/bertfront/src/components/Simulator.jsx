import { Typography, Box, Grid, TextField, Button, Container } from '@mui/material';
import { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Ring from './Ring';
import BarProfit from './BarProfit';
import LinePredict from './LinePredict';
import AccumProfit from './AccumProfit';
import InputAdornment from '@mui/material/InputAdornment';

//import DateAdapter from '@mui/lab/AdapterLuxon';


function Simulator() {

    const [actual, setActual] = useState('no data');
    const [predicted, setPredicted] = useState('no data');
    const [netProfit, setNetProfit] = useState(0.0);
    const [error, setError] = useState(35);
    let nav = useNavigate();

    const handleCredits = () => {
        nav("/howitworks");
    }

    return (
        <Fragment>

            <Grid justifyContent='center' container spacing={2} columns={13}>
            
                <Grid item xs={4} sx={{ height: 220, backgroundColor: 'box.main', borderRadius: "5px",
                 margin: "10px", boxShadow: 4}}>
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
                
                <Grid item xs={3} sx={{ height: 220, 
                    backgroundImage: "linear-gradient(45deg, #394F98, #690A73 50%, #A8563B)", 
                    borderRadius: "5px", margin: "10px", padding: "16px", boxShadow: 4}}>
                    <Typography variant="h5" sx={{color: 'secondary.main', fontWeight: 'bold'}}>
                        Performance
                    </Typography>
                    
                    <Box sx={{width: 140, height: 140, position: "relative"}}> 
                        <Typography variant="h5" sx={{color: 'secondary.text', fontWeight: 'bold',
                         position: "absolute", left: "75%", top: "45%", zIndex: "3"}}>
                            {error}%
                        </Typography>
                        <Ring rate={error}/>
                        
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
                        You can select a starting amount and a time
                        period to get an estimation of how much you
                        could earn following the bots decisions.
                    </Typography>
                </Grid>

                <Grid item xs={3} sx={{height: 370, backgroundColor: 'box.main', borderRadius: "5px", margin: "10px", boxShadow: 4 }}>
                    <div style={{display: "block"}}>
                        <Typography variant="h5" sx={{color: 'secondary.main', fontWeight: 'bold'}}>
                            Simulation
                        </Typography>
    
                        <TextField id="outlined-basic" label="Starting amount ($USD)" InputProps={{
                            startAdornment: <InputAdornment position="start">
                                <Typography sx={{color: 'secondary.text'}}>$
                                    </Typography>
                                </InputAdornment>,
                            }}
                        variant="outlined" color="text" focused sx={{backgroundColor: 'primary', border: "5px", margin: "20px", input: { color: 'text.main' }}}/>
                    
                        <TextField id="outlined-basic" label="Select period" type="date" defaultValue="2020-05-24"
                        variant="outlined" color="text" focused sx={{backgroundColor: 'primary', border: "5px", margin: "30px 20px 30px 20px", input: { color: 'text.main' }}}/>
                        
                        
                    </div>
                    <div>
                        <Button variant="contained" color='secondary' 
                        sx={{color: "secondary.text", float: "centre"}}>Simulate!</Button>
                    </div>
                </Grid>

                <Grid container item xs={5} sx={{ height: 370, backgroundColor: 'box.main', 
                    borderRadius: "5px", margin: "10px", padding: "16px", boxShadow: 4}}>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={10} sx={{margin: "15px"}}>
                        <LinePredict />
                    </Grid>
                    <Grid item xs={3}></Grid>
                    <Grid item xs={7}>
                        <BarProfit />
                    </Grid>
                    
                </Grid>

                <Grid item xs={4} sx={{height: 370, backgroundImage: "linear-gradient(45deg, #394F98, #690A73 50%, #A8563B)", 
                    borderRadius: "5px", margin: "10px", padding: "16px", boxShadow: 4}}>
                    <AccumProfit />
                    <Box sx={{position: "relative", top: "20%"}}>
                        <Typography variant='h5' color='secondary.text' sx={{fontWeight: 'bold',display: 'inline'}}>
                            Net profit: $
                            
                        </Typography>
                        <Typography variant='h4' color='profit.main' sx={{fontWeight: 'bold',display: 'inline'}}>
                                {netProfit}
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={12}></Grid>
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