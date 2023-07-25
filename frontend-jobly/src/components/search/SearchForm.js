import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { TextField, Button, Grid } from '@mui/material';
import { API_BASE_URL } from '../../api';

function SearchForm() {
  const history = useHistory();
  const location = useLocation();
  const [searchParams, setSearchParams] = useState({
    title: '',
    company: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSearchParams((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`${API_BASE_URL}/job-postings?title=${searchParams.title}&company=${searchParams.company}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setSearchParams({ title: '', company: '' });
        history.push({
          pathname: '/',
          search: `?title=${searchParams.title}&company=${searchParams.company}`,
          state: { jobList: data },
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} lg={4}>
          <TextField
            label="Job Title"
            type="text"
            name="title"
            value={searchParams.title}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} lg={4}>
          <TextField
            label="Company"
            type="text"
            name="company"
            value={searchParams.company}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} lg={4}>
          <Button type="submit" variant="contained">Search</Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default SearchForm;
