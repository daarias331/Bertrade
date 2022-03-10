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
                        Explanation, blabla bla
                    </Typography>
                </Grid>
                <Grid item xs={2} sx={{margin: "10px"}}>

                </Grid>
                <Grid item xs={12} sx={{height: 300, backgroundImage: "linear-gradient(45deg, #394F98, #690A73, #F6855F)", borderRadius: "5px", margin: "15px"}}>
                    <Typography variant="h4" sx={{color: 'secondary.text', fontWeight: 'bold', textAlign: "Left"}}>
                        Creators
                    </Typography>
                    <Typography variant="h5" sx={{color: 'secondary.text', fontWeight: 'bold', textAlign: "Left"}}>
                        Alex Arias
                    </Typography>
                </Grid>
                <Grid item xs={12} sx={{height: 300, backgroundImage: "linear-gradient(-10deg, #751C94, #360871, #00DECC 120%)", borderRadius: "5px", margin: "15px"}}>
                    <Typography variant="h5" sx={{color: 'secondary.text', fontWeight: 'bold', textAlign: "Centre"}}>
                        Felipe Ramos
                    </Typography>
                </Grid>
            </Grid>  
        </Fragment>  
        
     );
}

export default Card;