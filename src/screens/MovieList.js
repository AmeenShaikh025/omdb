import React, { useEffect, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { fade, makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import axios from 'axios';

import Banner from '../components/Banner';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  margin: {
    margin: theme.spacing(1),
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));


export default function MovieList() {
  const classes = useStyles();

  const [movies, setMovies] = useState({});
  const [searchTerm, setSearchTerm ] = useState('');

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
  }


  var api = 'https://www.omdbapi.com/?';
  var searchTitle = "t=";
  var title = searchTerm ? searchTerm : 'batman';
  var apiKey = '&apikey=b4566d3b';
  var url = api + searchTitle + title + apiKey;


  //Search functionality

  const handleClick = () => {
    getMovies();
  }
  // on load
  useEffect(() => {
    getMovies();
  });

  const getMovies = () => {
    axios.get(url)
    .then(function (response) {
      setMovies(response)
    })
    .catch(function (error) {
      console.error(error);
    });
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Movies
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              onChange={handleSearch}
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <Button onClick={handleClick} variant="contained" size="small" color="secondary" className={classes.margin}>
            Go
          </Button>
        </Toolbar>
        
      </AppBar>
      <main>
        <Container className={classes.cardGrid} maxWidth="md">
          
           <Grid container>
             <Banner
              image={movies.data?.Poster}
              title={movies.data?.Title}
              plot={movies.data?.Plot}
             />
           </Grid>   

          <Grid container 
            spacing={4}
            direction="row"
            justify="center"
            alignItems="center">
            <Grid item key={movies.data?.imdbID} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={movies.data?.Poster}
                    title={movies.data?.Title}
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h4" component="h2">
                      {movies.data?.Title}
                    </Typography>
                    <Grid container spacing={10}>
                      <Grid item xs={12} md={12}>
                        <Typography variant="h6" className={classes.title}>
                          {movies.data?.Genre}
                        </Typography>
                        <div className={classes.demo}>
                          <List>

                            {movies.data?.Ratings.map(item => (
                              <ListItem key={item.Source}>
                                <ListItemText
                                  primary={item.Source}
                                  secondary={item.Value}
                                />
                              </ListItem>
                            ))}

                            {/* <li key={item.Source}>{item.Source}: {item.Value}</li> */}
                          
                          </List>
                        </div>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
          </Grid>
        </Container>
      </main>
    </React.Fragment>
  );
}