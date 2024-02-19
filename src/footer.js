import { Container, Typography} from '@mui/material';


export default function Footer() {
  return (
    <footer style={{ marginTop: 'auto', backgroundColor: '#f5f5f5', padding: '20px' }}>

      <Container maxWidth="md">
        <Typography variant="body2" color="textSecondary" align="center">
         Dosis de referencia © Vandemecum chile {new Date().getFullYear()} 
        </Typography>
        <Typography variant="body2" color="textSecondary" align="center">
          Desarrollado por Medstudio<span role="img" aria-label="heart">❤️</span> y con Material-UI
        </Typography>
        
      </Container>
    </footer>
  );
}
