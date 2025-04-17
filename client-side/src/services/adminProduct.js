import API from './api';

export const fetchAll = () =>
    API.post('/product/publish').then(r => r.data.metadata);

export const fetchOne = slug =>
    API.post(`/product/publish/slug/${slug}`).then(r => r.data.metadata);

export const saveProduct = formData =>
    API.post('/product', formData, {
        headers: {
            ...API.defaults.headers.common,
            'Content-Type': 'multipart/form-data'
        }
    }).then(r => r.data);

export const deleteProd = id =>
    API.post(`/product/delete/${id}`).then(r => r.data);
