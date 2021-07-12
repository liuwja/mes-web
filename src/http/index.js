import axios from 'axios'

const http = axios.create();

http.defaults.baseURL = '/api'
http.defaults.withCredentials = true

export default http