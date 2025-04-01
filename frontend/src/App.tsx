import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Button, CircularProgress, Alert } from '@mui/material';
import { api } from './services/api';
import { BlockchainState, Block, Transaction } from './types/blockchain';
import BlockList from './components/BlockList';
import AddTransactionForm from './components/AddTransactionForm';

const App: React.FC = () => {
    const [state, setState] = useState<BlockchainState>({
        chain: [],
        isValid: true,
        loading: true,
        error: null
    });

    useEffect(() => {
        initializeBlockchain();
    }, []);

    const initializeBlockchain = async () => {
        try {
            setState(prev => ({ ...prev, loading: true, error: null }));
            await api.initBlockchain();
            await loadChain();
        } catch (error) {
            setState(prev => ({
                ...prev,
                loading: false,
                error: 'Failed to initialize blockchain'
            }));
        }
    };

    const loadChain = async () => {
        try {
            setState(prev => ({ ...prev, loading: true, error: null }));
            const chain = await api.getChain();
            const isValid = await api.validateChain();
            setState({
                chain,
                isValid,
                loading: false,
                error: null
            });
        } catch (error) {
            setState(prev => ({
                ...prev,
                loading: false,
                error: 'Failed to load blockchain'
            }));
        }
    };

    const handleAddTransaction = async (transaction: Transaction) => {
        try {
            setState(prev => ({ ...prev, loading: true, error: null }));
            await api.addBlock([transaction]);
            await loadChain();
        } catch (error) {
            setState(prev => ({
                ...prev,
                loading: false,
                error: 'Failed to add transaction'
            }));
        }
    };

    return (
        <Container maxWidth="lg">
            <Box sx={{ my: 4 }}>
                <Typography variant="h3" component="h1" gutterBottom align="center">
                    Blockchain Simulation
                </Typography>

                {state.error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {state.error}
                    </Alert>
                )}

                <Box sx={{ mb: 4 }}>
                    <AddTransactionForm onSubmit={handleAddTransaction} />
                </Box>

                {state.loading ? (
                    <Box display="flex" justifyContent="center" my={4}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <>
                        <Box sx={{ mb: 2 }}>
                            <Typography variant="h6" color={state.isValid ? 'success.main' : 'error.main'}>
                                Chain Status: {state.isValid ? 'Valid' : 'Invalid'}
                            </Typography>
                        </Box>
                        <BlockList blocks={state.chain} />
                    </>
                )}
            </Box>
        </Container>
    );
};

export default App; 