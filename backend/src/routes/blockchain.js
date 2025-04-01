const express = require('express');
const router = express.Router();
const blockchainService = require('../services/blockchainService');

// Initialize blockchain with genesis block
router.post('/init', async (req, res) => {
    try {
        const genesisBlock = await blockchainService.createGenesisBlock();
        res.json(genesisBlock);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get entire blockchain
router.get('/chain', async (req, res) => {
    try {
        const chain = await blockchainService.getChain();
        res.json(chain);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add new block
router.post('/block', async (req, res) => {
    try {
        const { transactions } = req.body;
        const newBlock = await blockchainService.addBlock(transactions);
        res.json(newBlock);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Validate chain
router.get('/validate', async (req, res) => {
    try {
        const isValid = await blockchainService.isChainValid();
        res.json({ isValid });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get block by index
router.get('/block/:index', async (req, res) => {
    try {
        const block = await blockchainService.getBlockByIndex(parseInt(req.params.index));
        if (!block) {
            return res.status(404).json({ error: 'Block not found' });
        }
        res.json(block);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router; 