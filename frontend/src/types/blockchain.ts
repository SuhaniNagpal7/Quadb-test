export interface Transaction {
    sender: string;
    recipient: string;
    amount: number;
    timestamp: Date;
}

export interface Block {
    index: number;
    transactions: Transaction[];
    timestamp: Date;
    previousHash: string;
    hash: string;
    nonce: number;
}

export interface BlockchainState {
    chain: Block[];
    isValid: boolean;
    loading: boolean;
    error: string | null;
} 