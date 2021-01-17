import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Button } from '@material-ui/core';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
          margin: theme.spacing(1),
        },
      },
    
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export default function About() {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="about-title">About Melbourne Art Map</h2>
      <p id="about-description">
        Made by Tom and Alisa for Coder Academy T1A2.
      </p>
    </div>
  );

  return (
    <div className={classes.root}>
      <Button variant="contained" color="secondary" onClick={handleOpen}>
        About
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="about-title"
        aria-describedby="about-description"
      >
        {body}
      </Modal>
    </div>
  );
}
