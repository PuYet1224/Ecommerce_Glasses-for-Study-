import API from './api';

export const getProducts = type =>
  API.post(`/product/publish/${type}`).then(r => r.data.metadata);

export const getProduct = id =>
    API.post(`/product/publish/slug/${id}`).then(r => r.data.metadata);