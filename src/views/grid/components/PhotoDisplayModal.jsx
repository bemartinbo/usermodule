import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import PhotoIcon from '@mui/icons-material/Photo';
import { Card, CardActions, CardContent, CardMedia, IconButton } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const PhotoDisplayModal = ({rows}) => {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
        console.log(rows.row.ruta);    
    }
    const handleClose = () => setOpen(false);
    

    return (
        <div>
            <IconButton onClick={handleOpen}> <PhotoIcon/> </IconButton>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
            <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="fotousuario"
        height="140"
        image={`img/${rows.row.ruta}`}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
            </Box>
          </Modal>
        </div>
      );
}
