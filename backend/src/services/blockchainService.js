const Block = require('../models/Block');

class BlockchainService {
    constructor(difficulty = 4) {
        this.difficulty = difficulty;
    }

    async createGenesisBlock() {
        // Check if a genesis block already exists
        const existingGenesis = await Block.findOne({ index: 0 });
        if (existingGenesis) {
            return existingGenesis; // Return the existing genesis block
        }

        // Create a new genesis block if none exists
        const genesisBlock = new Block({
            index: 0,
            transactions: [],
            timestamp: new Date(),
            previousHash: '0',
            nonce: 0
        });
        genesisBlock.hash = genesisBlock.calculateHash();
        genesisBlock.mineBlock(this.difficulty);
        await genesisBlock.save();
        return genesisBlock;
    }

    async getLatestBlock() {
        return await Block.findOne().sort({ index: -1 });
    }

    async addBlock(transactions) {
        const previousBlock = await this.getLatestBlock();
        const newBlock = new Block({
            index: previousBlock ? previousBlock.index + 1 : 0,
            transactions,
            timestamp: new Date(),
            previousHash: previousBlock ? previousBlock.hash : '0',
            nonce: 0
        });
        newBlock.hash = newBlock.calculateHash();
        newBlock.mineBlock(this.difficulty);
        await newBlock.save();
        return newBlock;
    }

    async isChainValid() {
        const blocks = await Block.find().sort({ index: 1 });
        
        for (let i = 1; i < blocks.length; i++) {
            const currentBlock = blocks[i];
            const previousBlock = blocks[i - 1];

            // Verify current block's hash
            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            // Verify chain linkage
            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }

            // Verify proof of work
            if (currentBlock.hash.substring(0, this.difficulty) !== '0'.repeat(this.difficulty)) {
                return false;
            }
        }

        return true;
    }

    async getChain() {
        return await Block.find().sort({ index: 1 });
    }

    async getBlockByIndex(index) {
        return await Block.findOne({ index });
    }
}

module.exports = new BlockchainService(); 