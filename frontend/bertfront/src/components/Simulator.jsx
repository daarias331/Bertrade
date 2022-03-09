import { Container, Typography, Box, Grid } from '@mui/material';

function Simulator() {
    return ( 
        <Container sx={{display: "block"}}>
            <Grid container spacing={2}>
                <Grid item xs={3} sx={{witdh: 220, height: 190, backgroundColor: '#311442', borderRadius: "5px", padding: "10px"}}>
                    <Typography variant="h5" sx={{color: '#12C243', fontWeight: 'bold'}}>
                        TODAY'S S&P500
                    </Typography>
                </Grid>
                

                <Grid item xs={3} sx={{witdh: 220, height: 190, backgroundImage: 'linear-gradient(45deg, #394F98, #690A73, #F6855F)', borderRadius: "5px"}}>
                    <Typography variant="h5" sx={{color: '#12C243', fontWeight: 'bold'}}>
                        Performance
                    </Typography>
                </Grid>
                <Grid item xs={6}>

                </Grid>

                <Grid item xs={4} sx={{witdh: 220, height: 190, backgroundColor: '#311442', borderRadius: "5px"}}>
                    <Typography variant="h5" sx={{color: '#12C243', fontWeight: 'bold'}}>
                        Simulation
                    </Typography>
                </Grid>

                <Grid item xs={4} sx={{witdh: 220, height: 190, backgroundColor: '#311442', borderRadius: "5px"}}>
                </Grid>

                <Grid item xs={4} sx={{witdh: 220, height: 190, backgroundImage: 'linear-gradient(45deg, #394F98, #690A73, #F6855F)', borderRadius: "5px"}}>
                </Grid>
            </Grid>

        </Container>
     );
}

export default Simulator;