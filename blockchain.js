const crypto = require('crypto');

class Block {
    constructor(index, transactions, timestamp, previousHash) {
        this.index = index;
        this.transactions = transactions;
        this.timestamp = timestamp;
        this.previousHash = previousHash;
        this.nonce = 0;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        const blockString = JSON.stringify({
            index: this.index,
            transactions: this.transactions,
            timestamp: this.timestamp,
            previousHash: this.previousHash,
            nonce: this.nonce
        });
        return crypto.createHash('sha256').update(blockString).digest('hex');
    }

    mineBlock(difficulty) {
        const target = '0'.repeat(difficulty);
        while (this.hash.substring(0, difficulty) !== target) {
            this.nonce++;
            this.hash = this.calculateHash();
        }
    }
}

class Blockchain {
    constructor(difficulty = 4) {
        this.chain = [];
        this.difficulty = difficulty;
        this.createGenesisBlock();
    }

    createGenesisBlock() {
        const genesisBlock = new Block(0, [], Date.now(), '0');
        genesisBlock.mineBlock(this.difficulty);
        this.chain.push(genesisBlock);
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(transactions) {
        const previousBlock = this.getLatestBlock();
        const newBlock = new Block(
            this.chain.length,
            transactions,
            Date.now(),
            previousBlock.hash
        );
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

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

    printChain() {
        this.chain.forEach(block => {
            console.log('\nBlock #', block.index);
            console.log('Timestamp:', new Date(block.timestamp).toISOString());
            console.log('Transactions:', JSON.stringify(block.transactions, null, 2));
            console.log('Previous Hash:', block.previousHash);
            console.log('Hash:', block.hash);
            console.log('Nonce:', block.nonce);
            console.log('-'.repeat(50));
        });
    }
}

// Main function to demonstrate the blockchain
function main() {
    // Create a new blockchain
    const blockchain = new Blockchain(4);
    
    // Add some sample transactions
    const transactions = [
        { sender: 'Alice', recipient: 'Bob', amount: 50 },
        { sender: 'Bob', recipient: 'Charlie', amount: 30 }
    ];
    
    // Add a new block
    blockchain.addBlock(transactions);
    
    // Print the blockchain
    console.log('Initial Blockchain:');
    blockchain.printChain();
    
    // Demonstrate chain validation
    console.log('\nIs blockchain valid?', blockchain.isChainValid());
    
    // Demonstrate tampering detection
    console.log('\nDemonstrating tampering detection...');
    blockchain.chain[1].transactions[0].amount = 100;
    console.log('Is blockchain valid after tampering?', blockchain.isChainValid());
}

// Run the main function if this file is run directly
if (require.main === module) {
    main();
}

module.exports = { Block, Blockchain }; 