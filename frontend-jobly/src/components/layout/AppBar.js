import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { useHistory } from 'react-router-dom';

function AppAppBar() {
    const history = useHistory();

    const handleGoBack = () => {
        history.push('/');
    };
    const handleAnalytics = () => {
        history.push('/analytics');
    };
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h4" sx={{  cursor: 'pointer' }} style={{ marginLeft: '2rem', marginRight: '4rem'}} onClick={handleGoBack}>
                    Jobly
                </Typography>
                <Typography variant="h4" sx={{  cursor: 'pointer' }}  onClick={handleAnalytics}>
                    Analytics
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

export default AppAppBar;
