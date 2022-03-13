import { Grid, Box, Typography, Button, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {Fragment} from 'react';
import alex from '../alexlnk.jpg';
import pippo from '../pippolnk.jpg';

function Card() {

    let nav = useNavigate();

    const handleBack = () => {
        nav("/");
    }

    const handleCreator= (name) => {
        if(name=="pippo"){
            window.open("https://www.linkedin.com/in/felipe-ramos-datasc1/", '_blank')
        }
    }

    return ( 
        <Fragment>
            <div style={{float: "right"}}>
                <Button variant="text" onClick={()=> handleBack()} color="text">
                    Back to simulate
                </Button>
            </div>
        
            <Grid justifyContent="space-between" container spacing={2}>
                <Grid item xs={8} sx={{height: 300, backgroundColor: 'box.main', borderRadius: "5px", margin: "10px", boxShadow: 4}}>
                    <Typography variant="h4" sx={{color: 'secondary.main', fontWeight: 'bold', textAlign: "Left"}}>
                        How it works?
                    </Typography>
                    <Typography sx={{color: 'secondary.text', fontWeight: 'bold', textAlign: "Left", margin: "20px"}}>
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
                <Grid container item xs={12} sx={{height: 250, backgroundImage: "linear-gradient(45deg, #394F98, #690A73, #F6855F)", 
                    borderRadius: "5px", margin: "15px", boxShadow: 4}}>
                    <Grid item xs={4}>
                    <Typography variant="h4" sx={{color: 'secondary.text', fontWeight: 'bold', textAlign: "Left"}}>
                        Creators
                    </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography sx={{color: 'secondary.text', textAlign: "left", margin: "20px"}}>
                        Financial Analyst and Machine
                        learning engineer. He is passioned
                        by finance and Artificial Intelligence 
                        Currently based in Melbourne, Australia.
                        He also have studies in Colombia and
                        France.
                        </Typography>
                    
                    </Grid>
                    <Grid item xs={2}>
                    <Typography variant="h5" sx={{color: 'secondary.text', fontWeight: 'bold', textAlign: "left", margin: "20px 0px 0px 20px"}}>
                        Alex Arias
                    </Typography>
                    <Button variant="text" sx={{color: 'secondary.text', float: "left", margin: "0px 0px 0px 20px"}}>
                        >>LinkedIn
                    </Button>
                    </Grid>
                    <Grid item xs={3}>
                        <Box >
                           <Avatar alt="Alex Arias" src={alex} sx={{ width: 220, height: 220 }}/> 
                        </Box>

                    </Grid>
                    
                </Grid>
                <Grid container item xs={12} sx={{height: 250, backgroundImage: "linear-gradient(-10deg, #751C94, #360871, #00DECC 120%)", 
                    borderRadius: "5px", margin: "15px", boxShadow: 4}}>
                    <Grid item xs={4}>
                    </Grid>
                    <Grid item xs={3}>
                    <Box sx={{left:20}}>
                        <Avatar alt="Felipe Ramos" src={pippo} sx={{ width: 220, height: 220, marginLeft: 'auto', marginRight: 'auto'}}/> 
                    </Box>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography variant="h5" sx={{color: 'secondary.text', fontWeight: 'bold', textAlign: "left", margin: "20px 0px 0px 20px"}}>
                            Felipe Ramos
                        </Typography>
                        <Button variant="text" sx={{color: 'secondary.text', float: "left", margin: "0px 0px 0px 20px"}} onClick={handleCreator("pippo")}>
                        >>LinkedIn
                        </Button>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography sx={{color: 'secondary.text', textAlign: "left", margin: "20px"}}>
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