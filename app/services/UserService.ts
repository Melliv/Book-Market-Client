import api from '../api/api';
import { User } from '../dto/User';
import { setCookie } from 'cookies-next';

export abstract class UserService {

    static async login(user: User): Promise<{user: User, loading: boolean, error: boolean}> {
        try {
            const response = await api.post<User>(`/login`, user);
            user.token = response.data.token
            setCookie('token', user.token);
            return {
                user: response.data,
                loading: false,
                error: response.status != 200
            };
        }
        catch (err) {
            return {
                user,
                loading: false,
                error: true
            }
        }

    }
}