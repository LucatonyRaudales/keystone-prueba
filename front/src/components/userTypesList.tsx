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
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

/////

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Button, TextField, InputLabel, MenuItem, Select, FormControl } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

//components
import NewTypeComponent from './addNewType';

//Snackbar
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';

/////GraphQl
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";


const GET_TYPES = gql`
  {
    typesList{
      _id
      name
      color
    }
  }
`;


function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const EDIT_TYPE = gql`
  mutation createType($id: String!, $name: String!, $color: String!){
    updateType(
      id:$id,
      fields: { name:$name, color: $color }
    )
  }
`;

const DELETE_TYPE = gql`
  mutation deleteType($id: String! ){
      deleteType(
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


interface Type{
    _id: string,
    name: string,
    color: string
}
interface TypeList {
  typesList: Type[];
}

interface Resp {
  createType: boolean;
}

export default function UserTYpesList() {
  const classes = useStyles();
  const [dense, ] = React.useState(false);
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [id, setID] = useState("");
  const [openSnack, setOpenSnack] = React.useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const handleCloseSnack = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnack(false);
  };
  const [open, setOpen] = React.useState(false);
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setColor(event.target.value as string);
  };
  const handleClose = () => {
    setOpen(false);
  };


  ///GraphQL
  const [createMessage] = useMutation<Resp>(EDIT_TYPE);
  const [deleteType] = useMutation(DELETE_TYPE);
  const {  loading, data, error } = useQuery<TypeList>(GET_TYPES);
  if (loading) return <CircularProgress />;
  if (error) {
    return <p>Error</p>;
  }

  console.log(data);
  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <Typography variant="h6" className={classes.title}>
            Tipos de usuarios
          </Typography>
          <NewTypeComponent />
          <div className={classes.demo}>
            <List dense={dense}>
              {data && data.typesList.map(({_id, name,color}) =>
                <div key={_id}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <FiberManualRecordIcon style={{ color: color }}/>
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={name}
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
                        <DeleteIcon style={{ color: 'red' }}/>
                      </IconButton>
                      <IconButton edge="end" aria-label="edit" onClick={()=>{
                        setID(_id);
                        setColor(color);
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
                value={color}
                onChange={handleChange}
                label="Color" >

                <MenuItem value="">
                  <em>Ninguno</em>
                </MenuItem>

              { ["red", "blue", "white", "green", "yellow", "grey"].map((item) => <MenuItem  key={item} value={item}>{item}</MenuItem>)}
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
                await createMessage({ variables: { id, name, color } });
                //if(!res.data.createType) return 
                setOpen(false);
                window.location.href = "/";
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
                console.log(res.data.deleteType);
                setOpenSnack(false);
                if(!res.data.deleteType) return setOpenDelete(true);
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


      <Snackbar open={openDelete} autoHideDuration={6000} onClose={()=> setOpenDelete(false)}>
        <Alert onClose={()=> setOpenDelete(false)} severity="warning">
          Uy bro!, cuidado!!... están usando este tipo!!
        </Alert>
      </Snackbar>
    </div>
  );
}