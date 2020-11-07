import axios from 'axios';
import { parseCSV } from './parseCSV';

export const fetchCSVData = async (url: string) => {
    try {
        const { data } = await axios.get(url);
        if (data) {
            return parseCSV(data);
        }
    } catch (error) {
        console.error(error.message);
    }
};
