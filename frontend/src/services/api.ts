import axios from 'axios';
import { Block, Transaction } from '../types/blockchain';

const API_URL = 'http://localhost:5001/api/blockchain';

export const api = {
    async initBlockchain(): Promise<Block> {
        const response = await axios.post(`${API_URL}/init`);
        return response.data;
    },

    async getChain(): Promise<Block[]> {
        const response = await axios.get(`${API_URL}/chain`);
        return response.data;
    },

    async addBlock(transactions: Transaction[]): Promise<Block> {
        const response = await axios.post(`${API_URL}/block`, { transactions });
        return response.data;
    },

    async validateChain(): Promise<boolean> {
        const response = await axios.get(`${API_URL}/validate`);
        return response.data.isValid;
    },

    async getBlockByIndex(index: number): Promise<Block> {
        const response = await axios.get(`${API_URL}/block/${index}`);
        return response.data;
    }
}; 