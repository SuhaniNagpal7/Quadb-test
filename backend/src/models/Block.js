const mongoose = require('mongoose');
const crypto = require('crypto');

const blockSchema = new mongoose.Schema({
    index: {
        type: Number,
        required: true,
        unique: true
    },
    transactions: [{
        sender: String,
        recipient: String,
        amount: Number,
        timestamp: {
            type: Date,
            default: Date.now
        }
    }],
    timestamp: {
        type: Date,
        default: Date.now
    },
    previousHash: {
        type: String,
        required: true
    },
    hash: {
        type: String,
        required: true,
        unique: true
    },
    nonce: {
        type: Number,
        default: 0
    }
});

blockSchema.methods.calculateHash = function() {
    const blockString = JSON.stringify({
        index: this.index,
        transactions: this.transactions,
        timestamp: this.timestamp,
        previousHash: this.previousHash,
        nonce: this.nonce
    });
    return crypto.createHash('sha256').update(blockString).digest('hex');
};

blockSchema.methods.mineBlock = function(difficulty) {
    const target = '0'.repeat(difficulty);
    while (this.hash.substring(0, difficulty) !== target) {
        this.nonce++;
        this.hash = this.calculateHash();
    }
};

const Block = mongoose.model('Block', blockSchema);

module.exports = Block; 