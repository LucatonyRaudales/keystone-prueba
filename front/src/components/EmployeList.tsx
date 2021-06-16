import React, { useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

/////

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Button, TextField, InputLabel, MenuItem, Select, FormControl } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

//components
import NewEmployeeComponent from './addNewEmployee';

//Snackbar
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';

/////GraphQl
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";


const GET_EMPLEADOS = gql`
  {
    Employees {
    _id
    name
    typeColor
    createdAt
  }
}
`;

const GET_TYPES = gql`
  {
    typesList{
      _id
      name
      color
    }
  }
`;

const EDIT_TYPE = gql`
  mutation createType($id: String!, $name: String!, $color: String!){
    updateEmployees(
    id: $id,
    fields: {
      name:  $name,
      typeColor: $color
    }
  )
  }
`;

const DELETE_TYPE = gql`
  mutation deleteType($id: String! ){
      deleteEmployees(
        id: $id
      )
  }
`;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      maxWidth: 752,
    },
    demo: {
      backgroundColor: theme.palette.background.paper,
    },
    title: {
      margin: theme.spacing(4, 0, 2),
    },
    rootModal: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    rootExpand: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '33.33%',
      flexShrink: 0,
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
  }),
);

interface Empleado{
    _id: string,
    name: string,
    typeColor: string,
    createdAt: string

}
interface Empleados {
  Employees: Empleado[];
}

interface Resp {
  updateEmployees: boolean;
}

interface Type{
    _id: string,
    name: string,
    color: string
}
interface TypeList {
  typesList: Type[];
}


export default function EmployeeList() {
  const classes = useStyles();
  const [dense, ] = React.useState(false);
  const [name, setName] = useState("");
  const [tColor, setTColor] = useState("");
  const [id, setID] = useState("");
  const [openSnack, setOpenSnack] = React.useState(false);

  const handleCloseSnack = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnack(false);
  };
  const [open, setOpen] = React.useState(false);
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setTColor(event.target.value as string);
  };
  const handleClose = () => {
    setOpen(false);
  };


  ///GraphQL
  //const [editEmployee] = useMutation<Resp>(EDIT_TYPE);
    const [createMessage] = useMutation<Resp>(gql`
    mutation{
  updateEmployees(
    id: "60ca8ccffaad9255247e34c1",
    fields: {
      name: "Juan orlando va",
      typeColor: "yellow"
    }
  )
}
`);
  const [deleteType] = useMutation(DELETE_TYPE);
  const {  data, error, loading } = useQuery<Empleados>(GET_EMPLEADOS);
  const { data: dataR } = useQuery<TypeList>(GET_TYPES);

  if (loading) return <CircularProgress />;
  if (error) {
    console.log(error)
    return <p>Error</p>;
  }


  console.log(data)
  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <Typography variant="h6" className={classes.title}>
            Tipos de usuarios
          </Typography>
          <NewEmployeeComponent />
          <div className={classes.demo}>
            <List dense={dense}>
              {data && data.Employees.map(({_id, name, typeColor, createdAt}) =>
                <div key={_id}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <FiberManualRecordIcon style={{ color: typeColor}}/>
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={name}
                      secondary={createdAt}
                    />

                    <ListItemSecondaryAction>

                      <IconButton 
                      edge="start" 
                      aria-label="delete" 
                      onClick={()=>{
                      setID(_id);
                      setOpenSnack(true);
                      }
                      }>
                        <DeleteIcon style={{ color: "red" }}/>
                      </IconButton>
                      <IconButton edge="end" aria-label="edit" onClick={()=>{
                        setID(_id);
                        setTColor(typeColor);
                        setName(name);
                        setOpen(true);
                      }}>
                        <EditIcon style={{ color: 'grey' }}/>
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                </div>
              )}
            </List>
          </div>
        </Grid>
      </Grid>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Editar</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Editar el tipo de usuario "bro".
          </DialogContentText>
          <form className={classes.rootModal} noValidate autoComplete="off">

            <TextField 
            value={name} 
            onChange={e => setName(e.target.value)} 
            fullWidth 
            label="Nombre" 
            name="name" 
            size="small" 
            variant="outlined" 
          />
            
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">Color</InputLabel>
              
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={tColor}
                onChange={handleChange}
                label="Color" >

                <MenuItem value="">
                  <em>Ninguno</em>
                </MenuItem>

                {dataR && dataR.typesList.map(({_id, name,color}) => <MenuItem  key={_id} value={color}>{name}</MenuItem>)}
              </Select>

            </FormControl>


          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={
                async e => {
                e.preventDefault();
                console.log(id, name, tColor)
                let res = await createMessage({ variables: { id, name, tColor } });
                //(!res.data.updateEmployees) return 
                setOpen(false);
                //window.location.href = "/";
              }} color="primary">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={openSnack}
        autoHideDuration={6000}
        onClose={handleCloseSnack}
        message="Quieres borrarlo bro?"
        action={
          <React.Fragment>
            <Button color="secondary" size="small" onClick={
                async e => {
                e.preventDefault();
                let res = await deleteType({ variables: { id } });
                console.log(res.data);
                setOpenSnack(false);
                //if(!res.data.deleteEmployees) return setOpenDelete(true);
                window.location.href = "/";
              }}>
              Sí bro
            </Button>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  );
}