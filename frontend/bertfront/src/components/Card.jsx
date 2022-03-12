import { Grid, Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {Fragment} from 'react';

function Card() {

    let nav = useNavigate();

    const handleBack = () => {
        nav("/");
    }

    return ( 
        <Fragment>
            <div style={{float: "right"}}>
                <Button variant="text" onClick={()=> handleBack()} color="text">
                    Back to simulate
                </Button>
            </div>
        
            <Grid justifyContent="space-between" container spacing={2}>
                <Grid item xs={8} sx={{height: 300, backgroundColor: 'box.main', borderRadius: "5px", margin: "10px"}}>
                    <Typography variant="h4" sx={{color: 'secondary.main', fontWeight: 'bold', textAlign: "Left"}}>
                        How it works?
                    </Typography>
                    <Typography sx={{color: 'secondary.text', fontWeight: 'bold', textAlign: "Left"}}>
                    Bertrade is a stockmarket simulation 
                    bot based on a Machine Learning 
                    model using the state of art
                    NLP technology. The bot make use of
                    Tweets and internal market information
                    to make buy or sell decisions.

                    You can select a starting amount, a time
                    period and a strategy to get an
                    estimation of how much you could earn
                    following the bots decisions
                    </Typography>
                </Grid>
                <Grid item xs={2} sx={{margin: "10px"}}>

                </Grid>
                <Grid container item xs={12} sx={{height: 300, backgroundImage: "linear-gradient(45deg, #394F98, #690A73, #F6855F)", borderRadius: "5px", margin: "15px"}}>
                    <Grid item xs={3}>
                    <Typography variant="h4" sx={{color: 'secondary.text', fontWeight: 'bold', textAlign: "Left"}}>
                        Creators
                    </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography sx={{color: 'secondary.text', textAlign: "left"}}>
                        Financial Analyst and Machine
                        learning engineer. He is passioned
                        by finance and Artificial Intelligence 
                        Currently based in Melbourne, Australia
                        he also have studies in Colombia and
                        France.
                        </Typography>
                    
                    </Grid>
                    <Grid item xs={3}>
                    <Typography variant="h5" sx={{color: 'secondary.text', fontWeight: 'bold', textAlign: "centre"}}>
                        Alex Arias
                    </Typography>
                    <Button variant="text" sx={{color: 'secondary.text', float: "centre"}}>
                        >>LinkedIn
                    </Button>
                    </Grid>
                    <Grid item xs={3}>
                        Picture
                    </Grid>
                    
                </Grid>
                <Grid container item xs={12} sx={{height: 300, backgroundImage: "linear-gradient(-10deg, #751C94, #360871, #00DECC 120%)", borderRadius: "5px", margin: "15px"}}>
                    <Grid item xs={3}>

                    </Grid>
                    <Grid item xs={3}>
                     Picture
                    </Grid>
                    <Grid item xs={3}>
                        <Typography variant="h5" sx={{color: 'secondary.text', fontWeight: 'bold', textAlign: "centre"}}>
                            Felipe Ramos
                        </Typography>
                        <Button variant="text" sx={{color: 'secondary.text', float: "centre"}}>
                        >>LinkedIn
                        </Button>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography sx={{color: 'secondary.text', textAlign: "left"}}>
                        Artificial Intelligence specialist and 
                        Machine Learning engineer.
                        Big fan of Economic history and text mining
                        Living in Melbourne, Australia, Born in Chile
                        </Typography>
                    </Grid>
                    
                    
                </Grid>
            </Grid>  
        </Fragment>  
        
     );
}

export default Card;