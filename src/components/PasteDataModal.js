import React, { useState } from 'react';
import { Button, Modal, Box, Typography, TextField, Backdrop, Fade } from '@mui/material';

const PasteDataModal = ({onData, fileType}) => {
  const [open, setOpen] = useState(false);
  const [inputData, setInputData] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = () => {
    let data = [];
    let rows = [];
    if(fileType === 'SPREADSHEET'){
      rows = inputData.trim().split('\n');
      data = rows.map(row => row.split('\t'));
    }
    onData(data);
    handleClose();
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Paste Data
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4 }}>
            <Typography variant="h6" component="h2">
              Paste spreadsheet data here
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={10}
              variant="outlined"
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
              placeholder="Paste spreadsheet data here"
              margin="normal"
            />
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default PasteDataModal;
