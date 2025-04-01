import React from 'react';
import { Box, Card, CardContent, Typography, Grid } from '@mui/material';
import { Block } from '../types/blockchain';

interface BlockListProps {
    blocks: Block[];
}

const BlockList: React.FC<BlockListProps> = ({ blocks }) => {
    return (
        <Box>
            {blocks.map((block) => (
                <Card key={block.index} sx={{ mb: 2 }}>
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography variant="h6">
                                    Block #{block.index}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="body2" color="text.secondary">
                                    Timestamp: {new Date(block.timestamp).toLocaleString()}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="body2">
                                    Previous Hash: {block.previousHash}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="body2">
                                    Hash: {block.hash}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="body2">
                                    Nonce: {block.nonce}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="subtitle1" gutterBottom>
                                    Transactions:
                                </Typography>
                                {block.transactions.map((transaction, index) => (
                                    <Box key={index} sx={{ ml: 2, mb: 1 }}>
                                        <Typography variant="body2">
                                            From: {transaction.sender}
                                        </Typography>
                                        <Typography variant="body2">
                                            To: {transaction.recipient}
                                        </Typography>
                                        <Typography variant="body2">
                                            Amount: {transaction.amount}
                                        </Typography>
                                    </Box>
                                ))}
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            ))}
        </Box>
    );
};

export default BlockList; 