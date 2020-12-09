import React, { useState } from 'react'; 
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function EditCar(props) {
    const [open, setOpen] = useState(false);
    const [car, setCar] = useState({
        brand: '', model: '', color: '', fuel: '', year: '', price: ''
    });

    const handleClickOpen = () => {
        setCar({
            brand: props.data.brand, model: props.data.model, 
            color: props.data.color, fuel: props.data.fuel, 
            year: props.data.year, price: props.data.price
        });
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const newInput = (event) => {
        setCar({...car, [event.target.name]: event.target.value})
    }

    const updateCar = () => {
        props.func(car, props.data._links.car.href); 
        handleClose(); 
    }

    




    return(
        <div>
            <Button color="primary" onClick={handleClickOpen}>
                Edit car
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit details</DialogTitle>
                <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    name="brand"
                    value={car.brand}
                    label="Brand"
                    onChange={e=>newInput(e)}
                />
                 <TextField
                    margin="dense"
                    name="model"
                    label="Model"
                    value={car.model}
                    onChange={e=>newInput(e)}
                />
                 <TextField
                    margin="dense"
                    name="color"
                    label="Color"
                    value={car.color}
                    onChange={e=>newInput(e)}
                />
                 <TextField
                    margin="dense"
                    name="fuel"
                    label="Fuel"
                    value={car.fuel}
                    onChange={e=>newInput(e)}
                />
                <TextField
                    margin="dense"
                    name="year"
                    label="Year"
                    value={car.year}
                    onChange={e=>newInput(e)}
                />
                <TextField
                    margin="dense"
                    name="price"
                    label="Price"
                    value={car.price}
                    onChange={e=>newInput(e)}
                />
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={updateCar} color="primary">
                    Save
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}