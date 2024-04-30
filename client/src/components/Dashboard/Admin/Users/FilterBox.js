import React from 'react';
import { Box, TextField, Button, Select, MenuItem, InputLabel, FormControl } from '@material-ui/core';

function FilterBox({ onFilter }) {
    const [filter, setFilter] = React.useState({
        name: '',
        email: '',
        phone: '',
        type: '',
        category: '',
        status: '',
    });

    const handleChange = (event) => {
        setFilter({
            ...filter,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onFilter(filter);
    };

    return (
        <Box component="form" onSubmit={handleSubmit} border={1} borderColor="grey.500" p={2} m={2}>
            <TextField name="search" label="Search" value={filter.search} onChange={handleChange} />
            <FormControl>
                <InputLabel>Type</InputLabel>
                <Select name="type" value={filter.type} onChange={handleChange}>
                    {/* Replace 'Option 1', 'Option 2', etc. with your actual options */}
                    <MenuItem value="Option 1">Option 1</MenuItem>
                    <MenuItem value="Option 2">Option 2</MenuItem>
                    <MenuItem value="Option 3">Option 3</MenuItem>
                </Select>
            </FormControl>
            <FormControl>
                <InputLabel>Category</InputLabel>
                <Select name="category" value={filter.category} onChange={handleChange}>
                    <MenuItem value="Option 1">Option 1</MenuItem>
                    <MenuItem value="Option 2">Option 2</MenuItem>
                    <MenuItem value="Option 3">Option 3</MenuItem>
                </Select>
            </FormControl>
            <FormControl>
                <InputLabel>Status</InputLabel>
                <Select name="status" value={filter.status} onChange={handleChange}>
                    <MenuItem value="Option 1">Option 1</MenuItem>
                    <MenuItem value="Option 2">Option 2</MenuItem>
                    <MenuItem value="Option 3">Option 3</MenuItem>
                </Select>
            </FormControl>
            <Button type="submit" variant="contained" color="primary">Filter</Button>
        </Box>
    );
}

export default FilterBox;