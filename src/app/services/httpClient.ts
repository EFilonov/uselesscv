import { API } from '../api/api';
import  { httpService } from './httpService';
import { MenuItem } from '../interfaces/menu.interface';
import { TopPageModel } from '../interfaces/page.interface';
import { ProductModel } from '../interfaces/product.interface';


const { request } = httpService();

export const httpClient = () => {
    // const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
    const baseUrl = process.env.NEXT_PUBLIC_DOMAIN_LOCAL;
    
    const fetchMenu = async (firstCategory : number): Promise<MenuItem[]> =>{ 
        if (typeof window !== 'undefined') {
            try {
                const res = await fetch(`${baseUrl}/api/menu?category=${firstCategory}`);
                if (res.ok) {
                const data = await res.json();
                return  data as MenuItem[];}
            } catch (error) {
                console.error('Error fetching menu from internal API:', error);
            };
            try {
                console.log('Меню получено c внешнего API');
                return await request(`${baseUrl}/api/menu`, 'POST', JSON.stringify({ firstCategory: firstCategory }));
            } catch (error) {
                console.error('Error fetching menu from external API:', error);
            }
        }
        return await request (API.topPage.find, 'POST', JSON.stringify({ firstCategory }));
    };
    
    const fetchPage = async (alias: string): Promise<TopPageModel> => {
        if (typeof window !== 'undefined') {
            try {
                const res = await fetch(`${baseUrl}/api/page?alias=${alias}`);
                if (res.ok) {
                    return await res.json();
                }
            } catch (error) {
                console.error('Error fetching page from internal API:', error);
            }
            try {
                return request(`${baseUrl}/api/page`, 'POST', JSON.stringify({ alias: alias })) ;
            } catch (error) {
                console.error('Error fetching page from external API:', error);
            }
        }
        return await request(API.topPage.byAlias + alias);
    };
    
    const fetchProducts = async (category: string): Promise<ProductModel[]> => {

        if (typeof window !== 'undefined') {
            try {
                const res = await fetch(`${baseUrl}/api/products?category=${category}`);
                if (res.ok) {
                    return await res.json();
                }
            } catch (error) {
                console.error('Error fetching products from internal API:', error);
            }
            try {
                return await request(`${baseUrl}/api/products`, 'POST', JSON.stringify({ category: category }));
            } catch (error) {
                console.error('Error fetching products from external API:', error);
            }
        }
        return await request(API.product.find, 'POST', JSON.stringify({ category: category, limit: 10 }));
    };

    return  { fetchMenu, fetchPage, fetchProducts};
};