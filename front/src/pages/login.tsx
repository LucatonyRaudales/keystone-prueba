import React, { useEffect, useState } from 'react';
import { Container, Button, Grid, TextField } from '@material-ui/core';
import IPage from '../interfaces/page';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';


interface User {
  email: string,
  password: string
}

const LoginPage: React.FunctionComponent<IPage & RouteComponentProps<any>> = props => {
  const [user, setUser] = useState<User>();

  const login = () => {
    setUser({
      email: "mail",
      password: "passord"
    });
  }
  return (
    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
      <div> 
        <Container maxWidth="sm">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField fullWidth label="Correo electrónico" name="email" size="small" variant="outlined" />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Contraseña"
                    name="password"
                    size="small"
                    type="password"
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
            <Link to="/">
              <Button color="primary" fullWidth type="submit" variant="contained">
                Iniciar Sesión
              </Button>
            </Link>
              
            </Grid>
          </Grid>
          {
            (!user)
              ? <pre> No hay usuario!</pre>
              : <pre> {JSON.stringify(user)}</pre>
          }
        </Container>
      </div>
    </div>
  );
}

export default withRouter(LoginPage);