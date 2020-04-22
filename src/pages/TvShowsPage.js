import React, { useState } from "react";
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { tvShowsTheme } from "../common/categoryThemes";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { discoverTv } from "../api/tvShowsApi";
import SearchResultList from "../components/SearchResultList";
import GenreFilter from "../components/GenreFilter";

export default function TvShowsPage() {
    const theme = {
        spacing: (factor) => `${0.5 * factor}rem`
      };

    const useStyles = makeStyles({
        title: {
            color: tvShowsTheme.backgroundColor,
            fontWeight: "700",
        },
         formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        button: {
            backgroundColor: tvShowsTheme.backgroundColor,
            color: tvShowsTheme.textColor
          }
      });

    const classes = useStyles();
    const [genre, setGenre] = useState("");
    const [rating, setRating] = useState("");
    const [search, setSearch] = useState(false);
    const [tvData, setTvData] = useState({});

    const handleChange = (event) => {
        setRating(event.target.value);
    };

    const handleSearch = async () => {
        const res = await discoverTv({
            genre,
            rating        
        });

        if (res) {
            setTvData(res);
            setSearch(true);
        }
    };

    return (
        <div align = "center">
            <Typography variant = 'h5' className={classes.title}>TV Shows</Typography>
            <GenreFilter onSubmit = {(e) => setGenre(e.target.value)}/>
            <FormControl variant = "filled" className={classes.formControl}>
                <InputLabel shrink id = "simple-select-placeholder-label-label">Rating</InputLabel>
                <Select value={rating} onChange = { handleChange } >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={6}>6</MenuItem>
                    <MenuItem value={7}>7</MenuItem>
                    <MenuItem value={8}>8</MenuItem>
                    <MenuItem value={9}>9</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                </Select>
            </FormControl>
            <div>
                <Button classes = {{ root: classes.button }} onClick = { async () => { await handleSearch(); }}>
                    Search
                </Button>
                <div style={{ paddingBottom: "100px" }}>
                    <>{ search && <SearchResultList data = { tvData } />}</>
                </div>
            </div>
        </div>
    );
}