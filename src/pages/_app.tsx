import 'src/styles/global.scss';
import type {AppProps} from 'next/app';
import {QueryClientProvider} from 'react-query';
import {Provider} from 'react-redux';
import {ToastContainer} from 'react-toastify';
import {store} from 'src/app/store';
import queryClient from 'src/config/query_client';
import 'react-toastify/dist/ReactToastify.css';
import {useEffect} from "react";
import {fetchMe} from "../features/auth/services";
import {AxiosResponse} from 'axios';
import {Response} from "src/types/response";
import {IUser} from "src/models/IUser";
import {setMe} from "src/slices/auth";

function MyApp({Component, pageProps}: AppProps) {

    useEffect(() => {
        fetchMe()
            .then((response: AxiosResponse<Response<IUser>>) => {
                store.dispatch(setMe(response.data.data))
            })
            .catch(err => console.log(err));
    }, [])

    return (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <ToastContainer/>
                <Component {...pageProps} />
            </QueryClientProvider>
        </Provider>
    );
}

export default MyApp;
