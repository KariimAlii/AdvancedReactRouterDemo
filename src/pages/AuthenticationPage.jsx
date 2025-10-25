﻿import AuthForm from '../components/AuthForm.jsx';
import {redirect} from "react-router-dom";
import {setAuthToken, setExpirationDate} from "../util/auth.js";

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

    const response = await fetch(
        `https://events-app-express-api.vercel.app/${mode}`,
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
    const token = resData.token;
    setAuthToken(token);

    const expiration = new Date();
    expiration.setHours(expiration.getHours() + 1);
    setExpirationDate(expiration);

    return redirect('/');

}