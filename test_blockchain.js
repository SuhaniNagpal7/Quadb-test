const { Blockchain } = require('./blockchain');

function testBlockchain() {
    console.log('Starting Blockchain Tests...\n');

    // Test 1: Create a new blockchain
    console.log('Test 1: Creating a new blockchain');
    const blockchain = new Blockchain(4);
    console.log('Genesis block created successfully\n');

    // Test 2: Add a block with transactions
    console.log('Test 2: Adding a block with transactions');
    const transactions = [
        { sender: 'Alice', recipient: 'Bob', amount: 50 },
        { sender: 'Bob', recipient: 'Charlie', amount: 30 }
    ];
    blockchain.addBlock(transactions);
    console.log('Block added successfully\n');

    // Test 3: Validate the chain
    console.log('Test 3: Validating the chain');
    console.log('Chain is valid:', blockchain.isChainValid(), '\n');

    // Test 4: Demonstrate tampering detection
    console.log('Test 4: Demonstrating tampering detection');
    console.log('Original transaction amount:', blockchain.chain[1].transactions[0].amount);
    blockchain.chain[1].transactions[0].amount = 100;
    console.log('Modified transaction amount:', blockchain.chain[1].transactions[0].amount);
    console.log('Chain is valid after tampering:', blockchain.isChainValid(), '\n');

    // Test 5: Print the entire chain
    console.log('Test 5: Printing the entire blockchain');
    blockchain.printChain();
}

// Run the tests
testBlockchain(); 