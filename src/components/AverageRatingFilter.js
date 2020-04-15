import React from "react";
import { TextField } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

export default function AverageRatingFilter({ handleChange }) {
  const classes = useStyles();

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField
        id="year-range-start"
        label="Average Rating (1-10)"
        variant="filled"
        onChange={handleChange}
      />
    </form>
  );
}
