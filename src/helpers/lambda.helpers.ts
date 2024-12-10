import { get, post, put } from "aws-amplify/api";
import axios from 'axios';
import * as crypto from 'crypto';
  
export const getAthletes = async () => {
    try {
        const restOperation = get({
            apiName: "aerenaApi",
            path: `athletes`,
        });

        const { body } = await restOperation.response;
        const response = await body.text();
        return JSON.parse(response);
    } catch (e) {
        console.log(e);
    }
};

export const getUserAthletesApi = async (tonWalletString: string) => {
    try {
        const restOperation = get({
            apiName: "aerenaApi",
            path: `user`,
            options: {
                queryParams: {
                    tonWalletString,
                },
            },
        });

        const { body } = await restOperation.response;
        const response = await body.text();
        return JSON.parse(response).athletes;
    } catch (e) {
        console.log(e);
    }
};

export const login = async (tonWalletString: string) => {
    try {
        const restOperation = post({
            apiName: "aerenaApi",
            path: `user`,
            options: {
                body: JSON.stringify({
                    tonWalletString: tonWalletString,
                }),
            },
        });

        const { body } = await restOperation.response;
        const response = await body.text();
        return JSON.parse(response);
    } catch (e) {
        console.log(e);
    }
};

export const mint = async (tonWalletString: string) => {
    try {
        const restOperation = post({
            apiName: "aerenaApi",
            path: `mint`,
            options: {
                body: JSON.stringify({
                    tonWalletString: tonWalletString,
                }),
            },
        });

        const { body } = await restOperation.response;
        const response = await body.text();
        return JSON.parse(response);
    } catch (e) {
        console.log(e);
    }
};

export const submitLineup = async (
    tournamentId,
    tonWalletString,
    userLineup
) => {
    try {
        const submitLineup = {
            tonWalletString: tonWalletString,
            lineup: userLineup,
            score: 0,
        };

        const restOperation = put({
            apiName: "aerenaApi",
            path: `tournaments/${tournamentId}`,
            options: {
                body: JSON.stringify(submitLineup),
            },
        });

        const { body } = await restOperation.response;

        const response = await body.text();

        return JSON.parse(response);
    } catch (e) {
        console.log("PUT call error");
        console.log(e);
    }
};

function generateSlug(invoiceData: any): string {
    // Convert the entire object to a string
    let invoiceString = JSON.stringify(invoiceData);
  
    // Remove special characters and spaces
    invoiceString = invoiceString.replace(/[^a-zA-Z0-9]/g, '');
  
    // Convert to lowercase
    invoiceString = invoiceString.toLowerCase();
  
    // Create a hash of the string
    const hash = crypto.createHash('md5').update(invoiceString).digest('hex');
  
    // Take the first 8 characters of the hash
    return hash.slice(0, 8);
  }

export const buyStars = async(amount) => {
    try {
        const response = await axios.post('https://vmk801l2u1.execute-api.ap-southeast-1.amazonaws.com/stars',
            {
                update_id: 100,
                message: {
                    chat: {
                    id: 7449602897,
                    first_name: "Johan",
                    last_name: "Tan",
                    username: "MaxChronicles12",
                    type: "private"
                    },
                    text: "/pay " + amount
                }
            }
        );
        
        console.log('Buy command sent successfully');

        console.log(response.data);
        return response.data;
      } catch (error) {
        console.error('Error sending buy command:', error);
      }
    // const invoiceData: InvoiceData = {
    //     id: 12345,
    //     date: new Date().toISOString().split('T')[0],
    //     totalAmount: amount,
    //     items: [
    //       { name: 'Product A', quantity: 1, price: amount },
    //     ]
    //   };
      
    //   const slug = generateSlug(invoiceData);
    //   console.log(`Invoice Slug: ${slug}`);
    //   return slug;
}
  