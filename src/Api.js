import axios from "axios"
import CryptoJS from "crypto-js"
const CONSUMER_KEY = "ck_d21a0e47d855009545ff28295862f1d6b4814752";
const CONSUMER_SECRET = "cs_07a0fad88fa6227a6465b04f856e6ac8496a49cc";
const PROJECT_URL = "https://infinitymegamall.1wp.site/";
const API_URL = PROJECT_URL + "wp-json/wc/v3"
const WP_USER_API_URL = `${PROJECT_URL}wp-json/wp/v2/users`

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
  baseURL: API_URL
})
api.get("/products")

// get all products from woo commerece store 
export const getAllProducts = async () => {
  try {
    const url = `${API_URL}/products`
    const oauthParams = generateOAuthSignature(url)
    console.log(oauthParams)
    const response = await api.get("/products", {
      params: oauthParams
    })
    return response.data

  } catch (error) {
    console.log(error)

  }
}

// Read Single Products Data by ID
export const getSingleProductData = async (productID) => {
  try {
    const url = `${API_URL}/products/${productID}`
    const oauthParams = generateOAuthSignature(url)
    const response = await api.get(`/products/${productID}`, {
      params: oauthParams
    })
    return response.data

  } catch (error) {
    console.log(error)

  }
}

//Register user api
// export const registerStoreUser = async (userInfo) => {
//   try{

//     const response = await api.post(WP_USER_API_URL, userInfo, {
//       headers:
//      {
//        "Authorization": "Basic " + btoa("admin:admin")
//      }
//     })

// return response.data
//      }

//     catch(error){
//       console.log(error)

//     }

// }

// ../Api/index.js
export const registerStoreUser = async ({ name, username, email, password }) => {
  const response = await fetch("https://infinitymegamall.1wp.site/wp-json/wp/v2/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic " + btoa("abo-raihan:U)QAqvKgEx*cN7m5dKKTjoL%"),
    },
    body: JSON.stringify({
      name,
      username,
      email,
      password,
      roles: ["customer"], // optional
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to register user");
  }

  return response.json();
};


// export const loginStoreUser = async ({ username, password }) => {
//   const token = btoa(`${username}:${password}`);

//   const res = await fetch("https://infinitymegamall.1wp.site/wp-json/wp/v2/users/me", {
//     method: "GET",
//     headers: {
//       Authorization: `Basic ${token}`,
//     },
//   });

//   if (!res.ok) {
//     const errData = await res.json();
//     throw new Error(errData.message || "Login failed");
//   }

//   const user = await res.json();
//   return user;
// };


export const loginStoreUser = async ({ username, password }) => {
  const res = await fetch("https://infinitymegamall.1wp.site/wp-json/jwt-auth/v1/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data; // includes token, user_id, etc.
};


// create an order in woocommerce store
// export const createOrder = async (userInfo) => {

//   try {
//     const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
//     if (cartItems.length === 0) {
//       throw new Error("Cart is empty");
//     }
//     const lineItems = cartItems.map(item => ({
//       product_id: item.id,
//       quantity: item.quantity
//     }));

//     const orderData = {
//       ...userInfo,
//       payment_method: "cod", // Change to your desired payment method
//       payment_method_title: "Cash on Delivery",
//       set_paid: false, // Set to true if you want to mark the order as paid
//       billing: {
//         first_name: userInfo.name,
//         last_name: "",
//         address_1: userInfo.address,
//         city: userInfo.city,
//         state: userInfo.state,
//         postcode: userInfo.postcode,
//         country: userInfo.country,
//         email: userInfo.email,
//         phone: userInfo.phone
//       },
//       line_items: lineItems
//     };

//     const url = `${API_URL}/orders`;
//     const oauthParams = generateOAuthSignature(url, 'POST', orderData);

//     const oauthHeader = Object.keys(oauthParams)
//       .map(key => `${encodeURIComponent(key)}="${encodeURIComponent(oauthParams[key])}"`)
//       .join(', ');

//     return await api.post("/orders", orderData, {
//       headers: {
//         "Authorization": `OAuth ${oauthHeader}`
//       }
//     });
//   } catch (error) {
//     console.log(error)
//   }



// }


export const createOrder = async (userInfo) => {
  try {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    if (cartItems.length === 0) { 
      console.log("Cart is empty");
      return false; // or throw an error
    }

    const lineItems = cartItems.map(item => ({
      product_id: item.id,
      quantity: item.quantity
    }));

    const data = {
      ...userInfo,
      line_items: lineItems
    }

    // const orderData = {
    //   ...userInfo,
    //   payment_method: "cod",
    //   payment_method_title: "Cash on Delivery",
    //   set_paid: false,
    //   billing: {
    //     first_name: userInfo.name,
    //     last_name: "",
    //     address_1: userInfo.address,
    //     city: userInfo.city,
    //     state: userInfo.state,
    //     postcode: userInfo.postcode,
    //     country: userInfo.country,
    //     email: userInfo.email,
    //     phone: userInfo.phone
    //   },
    //   line_items: lineItems
    // };

    const url = `${API_URL}/orders`;
    const oauthParams = generateOAuthSignature(url, 'POST');



    
    const oauthHeader = Object.keys(oauthParams).map(key => `${encodeURIComponent(key)}="${encodeURIComponent(oauthParams[key])}"`)
    .join(', ');    
    
    const response = await api.post("/orders", data, {
      headers: {
        "Authorization": `OAuth ${oauthHeader}`,
      }
    });
    return response.data;


  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};