import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

/////GraphQl
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";


const RESET = gql`
  mutation{
    reset
  }
`;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }),
);

export default function Reset() {
  const classes = useStyles();

  ///GraphQl

  const [CABUM] = useMutation(RESET);
  return (
    <div className={classes.root}>
      <Button 
        variant="outlined" 
        color="secondary"
        onClick={
          async e => {
          e.preventDefault();
          await CABUM({ variables: {  } });
          window.location.href = "/";
        }}>

        RESET!
      </Button>
    </div>
  );
}