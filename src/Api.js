import axios from "axios"
import CryptoJS from "crypto-js"
const CONSUMER_KEY = "ck_d21a0e47d855009545ff28295862f1d6b4814752";
const CONSUMER_SECRET = "cs_07a0fad88fa6227a6465b04f856e6ac8496a49cc";
const PROJECT_URL = "https://infinitymegamall.1wp.site/";
const API_URL = PROJECT_URL + "wp-json/wc/v3"

// Function to generate OAuth signature
const generateOAuthSignature = (url, method = 'GET', params = {}) => {
  const nonce = Math.random().toString(36).substring(2);
  const timestamp = Math.floor(Date.now() / 1000);

  const oauthParams = {
    oauth_consumer_key: CONSUMER_KEY,
    oauth_nonce: nonce,
    oauth_signature_method: 'HMAC-SHA1',
    oauth_timestamp: timestamp,
    oauth_version: '1.0',
  };

  const allParams = { ...oauthParams, ...params };

  const paramString = Object.keys(allParams)
    .sort()
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(allParams[key])}`)
    .join('&');

  const baseUrl = url.split('?')[0]; // Ensure no query params in the base URL
  const baseString = `${method.toUpperCase()}&${encodeURIComponent(baseUrl)}&${encodeURIComponent(paramString)}`;
  const signingKey = `${encodeURIComponent(CONSUMER_SECRET)}&`;

  const signature = CryptoJS.HmacSHA1(baseString, signingKey).toString(CryptoJS.enc.Base64);

  return { ...oauthParams, oauth_signature: encodeURIComponent(signature) };
};

const api = axios.create({
    baseURL:API_URL
})
api.get("/products")

// get all products from woo commerece store 
 export const getAllProducts = async()=>{
    try{
        const url = `${API_URL}/products`
        const oauthParams = generateOAuthSignature(url)
        console.log(oauthParams)
        const response = await api.get("/products", {
            params: oauthParams
        })
        return response.data

    }catch(error){
        console.log(error)

    }
}

// Read Single Products Data by ID
export const getSingleProductData = async(productID)=>{
  try{
      const url = `${API_URL}/products/${productID}`
      const oauthParams = generateOAuthSignature(url)
      const response = await api.get(`/products/${productID}`,{
        params: oauthParams
      })
      return response.data

  }catch(error){
    console.log(error)

  }
}