import { Snackbar,Alert } from '@mui/material';

const success = (msg: string) => {
   <Snackbar
     open={true}
     autoHideDuration={5000}
     onClose={() => {}}
   >
    <Alert
    severity="success"
    variant="filled"
    sx={{ width: '100%' }}
  >
    {msg}
  </Alert>
   </Snackbar>
};

const error = (msg: string) => {
  <Snackbar
  open={true}
  autoHideDuration={5000}
 onClose={() => {}}
  message={msg}
/>
};

const warning = (msg: string) => {
  <Snackbar
     open={true}
     autoHideDuration={5000}
     onClose={() => {}}
   >
    <Alert
    severity="warning"
    variant="filled"
    sx={{ width: '100%' }}
  >
    {msg}
  </Alert>
   </Snackbar>
};

export { success, error, warning };
