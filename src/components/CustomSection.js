<Grid container spacing={2}>
  <Button
    variant="contained"
    color="primary"
    component={Link}
    to="/section1"
    sx={{
      backgroundImage: `url(/path/to/image1.jpg)`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      '&:hover': {
        backgroundImage: `url(/path/to/image2.jpg)`,
      },
    }}
  >
    Sección 1
  </Button>
  <Button
    variant="contained"
    color="primary"
    component={Link}
    to="/section2"
    sx={{
      backgroundImage: `url(/path/to/image3.jpg)`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      '&:hover': {
        backgroundImage: `url(/path/to/image4.jpg)`,
      },
    }}
  >
    Sección 2
  </Button>
  <Button
    variant="contained"
    color="primary"
    component={Link}
    to="/section3"
    sx={{
      backgroundImage: `url(/path/to/image5.jpg)`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      '&:hover': {
        backgroundImage: `url(/path/to/image6.jpg)`,
      },
    }}
  >
    Sección 3
  </Button>
</Grid>