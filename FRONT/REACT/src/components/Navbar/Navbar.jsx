import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';

export default function ButtonAppBar() {
  const navigate = useNavigate();
  const handleReturn = () => {
    navigate('/');
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#2B2D42 ' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, cursor:"pointer" }} onClick={handleReturn}>
            TheFlo
          </Typography>
          <Button color="inherit"><PersonIcon/></Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}