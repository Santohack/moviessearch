// httpClient.ts
"use client"
import axios from 'axios';

const client = axios.create({
  baseURL: "http://www.omdbapi.com/",
  headers: {
    'Content-Type': 'application/json',
  },
});

export default client;
