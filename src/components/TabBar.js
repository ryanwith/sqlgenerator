// import React, { useState } from 'react';
// import { AppBar, Tabs, Tab, Box, Typography } from '@mui/material';


// function TabBar()

// function TabPanel(props) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`simple-tabpanel-${index}`}
//       aria-labelledby={`simple-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Box sx={{ p: 3 }}>
//           <Typography>{children}</Typography>
//         </Box>
//       )}
//     </div>
//   );
// }

// function UploadFileComponent() {
//   return <Typography>Upload File Component Content</Typography>;
// }

// function PasteCSVComponent() {
//   return <Typography>Paste CSV Component Content</Typography>;
// }

// function App() {
//   const [value, setValue] = useState(0);

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   return (
//     <Box sx={{ width: '100%' }}>
//       <AppBar position="static">
//         <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
//           <Tab label="Upload File" />
//           <Tab label="Paste CSV" />
//         </Tabs>
//       </AppBar>
//       <TabPanel value={value} index={0}>
//         <UploadFileComponent />
//       </TabPanel>
//       <TabPanel value={value} index={1}>
//         <PasteCSVComponent />
//       </TabPanel>
//     </Box>
//   );
// }

// export default App;
