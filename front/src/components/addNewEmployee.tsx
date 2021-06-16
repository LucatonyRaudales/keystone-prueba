import React, { useState } from 'react';
import { Snackbar, Button, TextField, InputLabel, MenuItem, Select, FormControl, Accordion, AccordionDetails, AccordionSummary, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import {  useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const CREATE_TYPE = gql`
mutation createType($name: String!, $color: String!){
  createEmployees(
    variables:{
      name: $name
      createdAt: 1546465
      type:{
        _id: "60c957be625166b91cec8db9",
        name: "Nombre del tipo",
        color: "red"
      }
    }
  ){
    _id
    name
    type{
      _id
      name
      color
    }
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


interface employee{
    name: string,
    type: string
}


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
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


export default function NewEmployeeComponent() {
  const classes = useStyles();
  const [createMessage] = useMutation(CREATE_TYPE);
  const [openSuccessSnack, setOpenSuccessSnack] = useState(false);

  //const [types, setTypes] = useState<TypeList>();
  //const [tColor, setTColor] = useState("");
  const [tName, setTName] = useState("");
  //const [tID, setTID] = useState("");
  //const [id, setID] = useState("");
  //const [tipo, seTipo] = useState("null");
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    //setTName(event.target.value as string);
  };
  const handleChangeExpand = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

///Graphql

 /* const {  loading, data, error } = useQuery<TypeList>(GET_TYPES);
  if (error) {
    return <p>Error</p>;
  }
  console.log(data);
  setTypes(data);*/
  return (
    <div>
    <Accordion expanded={expanded === 'panel1'} onChange={handleChangeExpand('panel1')}  className="m-15">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>Nuevo empleado</Typography>
          <Typography className={classes.secondaryHeading}>Agregar nuevo empleado </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <form className={classes.root} noValidate autoComplete="off">
            <TextField fullWidth label="Nombre" name="name" size="small" variant="outlined" />
            
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">Color</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={tName}
                onChange={handleChange}
                label="Color"
              >
                <MenuItem value="">
                  <em>Ninguno</em>
                </MenuItem>
                {["red", "green", "yellow"].map((item) => <MenuItem  key={item} value={item}>{item}</MenuItem>)}
              </Select>
            </FormControl>

            <Button 
              onClick={
                async e => {
                  let res = await createMessage({ variables: { tName, color } });
              console.log(res.data.createType)
              if(!res.data.createType) return setOpenSuccessSnack(true);
              window.location.href = "/";
                }
              }
              color="primary" fullWidth type="submit" variant="contained">
              Agregar
            </Button>
          </form>
        </AccordionDetails>
      </Accordion>

      <Snackbar open={openSuccessSnack} autoHideDuration={6000} onClose={()=> setOpenSuccessSnack(false)}>
        <Alert onClose={()=> setOpenSuccessSnack(false)} severity="error">
          Nell my friend, ese color || nombre ya está en uso bro!
        </Alert>
      </Snackbar>
    </div>
  );
}