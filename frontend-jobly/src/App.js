/* eslint-disable no-restricted-globals */
import React from 'react';
import { BrowserRouter as Router, Route, useHistory, useLocation } from 'react-router-dom';
import { Switch } from 'react-router';
import { useState, useEffect } from 'react';

import SearchForm from './components/search/SearchForm';
import JobList from './components/job/JobList';
import JobDetails from './components/job/JobDetails';
import Analytics from './components/analytics/AnalyticsPage';
import Layout from './components/layout/Layout';

function App() {
  const [selectedJobId, setSelectedJobId] = useState(null);
  const history = useHistory();
  const location = useLocation();
  const jobList = location.state?.jobList || [];


  const handleJobSelect = (jobId) => {
    setSelectedJobId(jobId);
    history.push(`/job/${jobId}`);
  };

  useEffect(() => {

  }, []);

  if (location.pathname === '/analytics') {
    return (
      <Router>
        <Layout>
          <div className="container">
            <Analytics />
          </div>
        </Layout>
      </Router>
    );
  }

  return (
    <Router>
      <Layout>
        <div className="container">
          <div className="grid-container">
            <div className="search-form">
              <SearchForm />
            </div>
            {selectedJobId ? (
              <Route exact path="/job/:jobId">

                <div className="job-details">
                  <JobDetails jobId={selectedJobId} />
                </div>
              </Route>
            ) : (
              <div className="job-list">
                <JobList onSelect={handleJobSelect} searchResults={jobList} />
              </div>
            )}
          </div>
          <Switch>
            <Route exact path="/analytics" component={Analytics} />
          </Switch>
        </div>
      </Layout>
    </Router>
  );
}

export default App;
