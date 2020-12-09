import { AgGridReact} from 'ag-grid-react';
import React, {useEffect, useState} from 'react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import Button from '@material-ui/core/Button';
import AddCar from './AddCar'; 
import EditCar from './EditCar'; 




export default function ListAll() {
    const [carlist, setCarlist] = useState([]); 

    const ButtonOut = (params) => {
        function remove(){
            fetch(params.value, {method: 'DELETE'})
            .then(res => fetchAll())
            .catch(err => console.log(err));  
        }
        return (
            <div><Button color='secondary' onClick={e => remove(e)}>Delete</Button></div>
        )
    }; 

    useEffect(() => fetchAll(), []); 

    function fetchAll() {
        fetch('https://carstockrest.herokuapp.com/cars')
        .then(response => response.json())
        .then(list => setCarlist(list._embedded.cars))
    };

    const addNew = (car) => {
        fetch('https://carstockrest.herokuapp.com/cars', {
            method: 'POST', 
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(car)
        })
        .then(res => fetchAll())
        .catch(err => console.log(err));
    }; 

    const updateCar = (car, link) => {
        fetch(link, {
            method: 'PUT', 
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(car)
        })
        .then(res => fetchAll())
        .catch(err => console.log(err));
    };

    const columns=[{headerName: "Brand", field: "brand", sortable:true, filter:true}, 
        {headerName: "Model", field: "model"}, {headerName: "Color", field: "color"}, 
        {headerName: "Fuel", field: "fuel", sortable:true, filter:true}, 
        {headerName: "Year", field: "year", sortable:true, filter:true}, 
        {headerName: "Price", field: "price", sortable:true, filter:true},
        {headerName: 'Edit', field: 'id', cellRenderer: 'editButton', cellRendererParams: {func: updateCar}, colId: 'params'},//unsure why it works. 
        {headerName: "Delete", field: '_links.self.href', cellRenderer: 'buttonOut', colId:'params'}]; 
    

    
    

    return (
        <div>
        <div className='newCar'><AddCar addNew={addNew}/></div>
        <div className="ag-theme-material" style={ {height: '600px', width: '55%', margin: 'auto'} }>
            <AgGridReact
            columnDefs={columns}
            rowData={carlist}
            animateRows={true}
            frameworkComponents={{buttonOut: ButtonOut, editButton: EditCar}}>
            </AgGridReact>
        </div>
        </div>

    )
}