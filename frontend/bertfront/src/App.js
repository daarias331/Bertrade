
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
      text: 'white',
    },
    box: {
      main: '#311442', 
      special: "linear-gradient(45deg, #394F98, #690A73, #A8563B)",
    },
    text: {
      main: '#FFFFFF'
    },
    profit: {
      main: '#C18B00'
    }
    
  }
});

function App() {
  return (
    <div className="App" style={{backgroundColor: '#532C6A', height: "100%"}}>
      <ThemeProvider theme={theme}>
        <Container sx={{ flexGrow: 1 }}>
          
            <Typography variant="h3" sx={{color: 'secondary.main', fontWeight: 'bold', textAlign: "right"}}>
              BERTRADE
            </Typography>

            <Routes>
              <Route exact path="/" element={<Simulator />}/>
              <Route path="/howitworks" element={<Card />}/>
            </Routes>
          
        </Container>      
      </ThemeProvider>
    </div>
  );
}

export default App;
