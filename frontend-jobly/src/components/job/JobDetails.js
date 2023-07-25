import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { CircularProgress, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import axios from 'axios';
import { API_BASE_URL } from '../../api';

function JobDetails({ jobId }) {
  const [job, setJob] = useState(null);
  const history = useHistory();
  const handleBack = () => {
    history.goBack();
  };


  useEffect(() => {
    async function fetchJobDetails() {
      try {
        const response = await axios.get(`${API_BASE_URL}/job-postings/${jobId}`);
        setJob(response.data);
      } catch (error) {
        console.error('Error fetching job details:', error);
      }
    }

    fetchJobDetails();
  }, [jobId]);

  if (!job) {
    return <CircularProgress />;
  }

  return (
    <div>
      <div style={{ marginBottom: '1rem' }}>
        <Button variant="contained" onClick={handleBack}>
          Back
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Field</strong>
              </TableCell>
              <TableCell>
                <strong>Value</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(job).map(([key, value]) => (
              <TableRow key={key}>
                <TableCell>{key}</TableCell>
                <TableCell>{value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default JobDetails;
