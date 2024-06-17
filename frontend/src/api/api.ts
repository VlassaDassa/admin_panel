import axios, { AxiosResponse } from 'axios';
import { NavigationField, PageObjects, Color } from '../types';





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
    data?: boolean;
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


export const savePageChanges = async (data: PageObjects[], pageName: string): Promise<Boolean> => {
    try {
        const response: AxiosResponse<Result> = await axios.post(BASE_URL + 'page/' + pageName, {data: data});
        return response.data.success;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};


export const getColors = async (): Promise<Color[]> => {
    try {
        const { data }: AxiosResponse<Color[]> = await axios.get(BASE_URL + 'colors')
        return data
    }
    catch (error) {
        console.error('Error fetching data: ', error)
        throw error;
    }
} 


export const saveColors = async (data: Color[]): Promise<Boolean> => {
    try {
        const response: AxiosResponse<Result> = await axios.post(BASE_URL + 'colors', {data: data})
        return response.data.success
    }
    catch (error) {
        console.error('Error fetching data: ', error)
        throw error;
    }
} 