import { Container, Box, Typography } from '@mui/material';

function Card() {
    return ( 
        <Container>
            <Box sx={{witdh: 220, height: 220, backgroundColor: '#311442', borderRadius: "5px"}}>
                <Typography variant='h3'>
                    How it works?
                </Typography>
            </Box>
            <Box sx={{witdh: 220, height: 220, backgroundColor: '#311442', borderRadius: "5px"}}>
                <Typography variant='h3'>
                    Creators
                </Typography>
            </Box>
            <Box sx={{witdh: 220, height: 220, backgroundColor: '#311442', borderRadius: "5px"}}>
                <Typography variant='h4'>
                    Felipe Ramos
                </Typography>
            </Box>
            
        </Container>
     );
}

export default Card;