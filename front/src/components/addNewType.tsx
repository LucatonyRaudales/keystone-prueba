import React, { useState } from 'react';
import { Snackbar, Button, TextField, InputLabel, MenuItem, Select, FormControl, Accordion, AccordionDetails, AccordionSummary, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const CREATE_TYPE = gql`
mutation createType($name: String!, $color: String!){
  createType(data: { name:$name, color: $color })
}
`;

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


export default function NewTypeComponent() {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const [createMessage] = useMutation(CREATE_TYPE);
  const [openSuccessSnack, setOpenSuccessSnack] = useState(false);

  const handleChangeExpand = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setColor(event.target.value as string);
  };

  return (
    <div>
    <Accordion expanded={expanded === 'panel1'} onChange={handleChangeExpand('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header">

          <Typography className={classes.heading}>Nuevo tipo</Typography>
          <Typography className={classes.secondaryHeading}>Agregar nuevo tipo de usuario </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <form 
            onSubmit={()=>console.log("o submit")}
              className={classes.root} 
              //noValidate 
              autoComplete="off"
            >
                        <TextField 
              fullWidth 
              label="Nombre" 
              name="name" 
              size="small"
              value={name}
              onChange={e => setName(e.target.value)} 
              variant="outlined" 
            />
            
            <FormControl variant="outlined" className={classes.formControl}>


              <InputLabel id="demo-simple-select-outlined-label">Color</InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={color}
                  onChange={handleChange}
                  label="Color"
                >

                <MenuItem value="">
                  <em>Ninguno</em>
                </MenuItem>

              {  ["red", "blue", "white", "green", "yellow", "grey"].map((item, index) => <MenuItem  key={item} value={item}>{item}</MenuItem>)}
              
              </Select>
            </FormControl>

            <Button 
            color="primary" 
            fullWidth 
            type="submit" 
            variant="contained" 
            onClick={
              async e => {
              e.preventDefault();
              let res = await createMessage({ variables: { name, color } });
              console.log(res.data.createType)
              if(!res.data.createType) return setOpenSuccessSnack(true);
              window.location.href = "/";
            }}>
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