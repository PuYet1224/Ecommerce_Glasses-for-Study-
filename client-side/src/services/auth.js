import API from'./api'
export const login=(email,password)=>API.post('/shop/login',{email,password}).then(r=>r.data)
export const signup=(name,email,password)=>API.post('/shop/signup',{name,email,password}).then(r=>r.data)
