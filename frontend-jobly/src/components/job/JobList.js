/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemText, CircularProgress, Container, Button, Typography, Box } from '@mui/material';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { API_BASE_URL } from '../../api';

function JobList({ onSelect, searchResults }) {
  const history = useHistory();

  const handleJobClick = (jobId) => {
    //history.push(`/job/${jobId}`);
    onSelect(jobId);
  };
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 20;

  useEffect(() => {
    if (searchResults.length === 0) {
      async function fetchJobs() {
        try {
          const response = await axios.get(`${API_BASE_URL}/job-postings`);
          setJobs(response.data);
          setIsLoading(false);
        } catch (error) {
          console.error('Error fetching job postings:', error);
        }
      }
  
      fetchJobs();
    } else {
      setJobs(searchResults);
      setIsLoading(false);
    }
  }, [currentPage, searchResults]);
  
    const handleNextPage = () => {
      setCurrentPage((prevPage) => prevPage + 1);
    };

    const handlePreviousPage = () => {
      setCurrentPage((prevPage) => prevPage - 1);
    };

    const renderJobs = () => {
      if (isLoading) {
        return <CircularProgress />;
      }

      const startIndex = (currentPage - 1) * jobsPerPage;
      const endIndex = startIndex + jobsPerPage;
      const jobsToDisplay = jobs.slice(startIndex, endIndex);

      return jobsToDisplay.map((job) => (
        <ListItem key={job.JobID} button onClick={() => handleJobClick(job.JobID)}>
          <ListItemText primary={job.JobTitle} secondary={job.CompanyName} />
        </ListItem>
      ));
    };

    return (
      <Container maxWidth="md">
        <Typography variant="h4" style={{ marginBottom: '1rem' }}>{searchResults.length !== 0 ? "Search Results" : "Job Listings"}</Typography>
        <List component="nav">
          {renderJobs()}
        </List>
        <Box display="flex" justifyContent="center" mt={2}>
          <Button
            disabled={currentPage === 1}
            onClick={handlePreviousPage}
            style={{ marginRight: '0.5rem' }}
          >
            Previous
          </Button>
          <Button
            disabled={currentPage * jobsPerPage >= jobs.length}
            onClick={handleNextPage}
          >
            Next
          </Button>
        </Box>
      </Container>
    );

  }

export default JobList;
