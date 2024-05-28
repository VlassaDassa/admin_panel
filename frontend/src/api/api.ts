import axios, { AxiosResponse } from 'axios';
import { NavigationField, PageObjects } from '../types';





// const BASE_URL = 'http://192.168.0.118:8000/';
const BASE_URL = 'http://127.0.0.1:8000/';


export const getMenu = async (): Promise<NavigationField[]> => {
    try {
        const response: AxiosResponse<NavigationField[]> = await axios.get(BASE_URL + 'menu');
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};


export interface Result {
    success: boolean;
    message?: string;
    data?: any;
}

export const updateMenu = async (data: NavigationField[]): Promise<Boolean> => {
    try {
        const response: AxiosResponse<Result> = await axios.post(BASE_URL + 'menu', {data: data});
        return response.data.success;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};



export const getPage = async (pageName: string): Promise<PageObjects[]> => {
    try {
        const response: AxiosResponse<PageObjects[]> = await axios.get(BASE_URL + 'page/' + pageName)
        return response.data
    }
    catch (error) {
        console.error('Error fetching data: ', error)
        throw error;
    }
} 