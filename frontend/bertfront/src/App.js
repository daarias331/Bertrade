
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Card from './components/Card';
import Simulator from './components/Simulator';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container, Typography, Box } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#532C6A',
    },
    secondary: {
      main: '#12C243',
    },
  }
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Container>
          <Box sx={{witdh: 900, height: 620, backgroundColor: '#532C6A', borderRadius: "5px"}}>
            <Typography variant="h3" sx={{color: '#12C243', fontWeight: 'bold'}}>
              BERTRADE
            </Typography>

            <Routes>
              <Route exact path="/" element={<Simulator />}/>
              <Route path="/howitworks" element={<Card />}/>
            </Routes>
          </Box>
        </Container>      
      </ThemeProvider>
    </div>
  );
}

export default App;
