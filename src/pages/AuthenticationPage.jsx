import AuthForm from '../components/AuthForm.jsx';
import {redirect} from "react-router-dom";
import {login} from "../store/authSlice.js";
import store from '../store/index.js';
function AuthenticationPage() {
    return <AuthForm />;
}

export default AuthenticationPage;

export async function authenticationAction({request}) {
    const searchParams = new URL(request.url).searchParams;
    const mode = searchParams.get('mode') || 'login';

    const data = await request.formData();

    const authData = {
        email: data.get('email'),
        password: data.get('password')
    };

    if(mode !== 'login' && mode !== 'signup') {
        throw new Response(
            JSON.stringify({message: "Unsupported Auth Mode."}),
            {status: 500}
        )
    }

    const baseUrl = import.meta.env.VITE_API_URL;

    const response = await fetch(
        `${baseUrl}/api/auth/${mode}`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(authData),
        }
    )

    if (response.status === 422 || response.status === 401) {
        return response;
    }

    if (!response.ok) {
        throw new Response(
            JSON.stringify({message: "Could not authenticate user."}),
            {status: 500}
        )
    }

    //! manage jwt token
    const resData = await response.json();
    store.dispatch(login({ token: resData.accessToken, expiration: resData.expiration }));


    return redirect('/dashboard');

}