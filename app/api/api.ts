import axios from 'axios'
import { getCookie } from 'cookies-next'

const baseURL = process.env.NEXT_PUBLIC_API_URL
    , isServer = typeof window === 'undefined'

const api = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json'
    }
})

api.interceptors.request.use(async config => {

    if (isServer) {
        const token = getCookie("token")
        if (token) {
            config.headers['Authorization'] = token
        }
    }
    else {

        const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1')

        if (token) {
            config.headers['Authorization'] = token
        }
    }

    return config
})

export default api