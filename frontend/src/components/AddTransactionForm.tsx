import React, { useState } from 'react';
import {
    Box,
    TextField,
    Button,
    Typography,
    Paper,
    Grid
} from '@mui/material';
import { Transaction } from '../types/blockchain';

interface AddTransactionFormProps {
    onSubmit: (transaction: Transaction) => void;
}

const AddTransactionForm: React.FC<AddTransactionFormProps> = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        sender: '',
        recipient: '',
        amount: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
            sender: formData.sender,
            recipient: formData.recipient,
            amount: parseFloat(formData.amount),
            timestamp: new Date()
        });
        setFormData({ sender: '', recipient: '', amount: '' });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
                Add New Transaction
            </Typography>
            <Box component="form" onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            fullWidth
                            label="Sender"
                            name="sender"
                            value={formData.sender}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            fullWidth
                            label="Recipient"
                            name="recipient"
                            value={formData.recipient}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            fullWidth
                            label="Amount"
                            name="amount"
                            type="number"
                            value={formData.amount}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                        >
                            Add Transaction
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Paper>
    );
};

export default AddTransactionForm; 