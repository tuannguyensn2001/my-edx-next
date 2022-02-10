import {Alert, Button, TextField} from '@mui/material';
import {AxiosError} from 'axios';
import {Controller, useForm} from 'react-hook-form';
import {useMutation} from 'react-query';
import {toast} from 'react-toastify';
import {useAppDispatch} from 'src/app/store';
import {getLogin} from 'src/features/auth/repositories';
import {FormLoginType} from 'src/features/auth/types';
import {ResponseLogin} from 'src/features/auth/types/login';
import {setLoggedIn} from 'src/slices/auth';
import {Response} from 'src/types/response';
import {useRouter} from "next/router";

function FormLogin() {
    const {control, handleSubmit} = useForm<FormLoginType>({
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const dispatch = useAppDispatch();

    const router = useRouter();

    const login = useMutation<Response<ResponseLogin>,
        AxiosError<Response>,
        FormLoginType>(
        'login',
        async (data: FormLoginType) => {
            return await getLogin(data);
        },
        {
            async onSuccess(response) {
                dispatch(setLoggedIn(response.data));
                await router.push('/')
                toast.success(response.message);
            },
            onError(error) {
            },
        }
    );

    const submit = (data: FormLoginType) => {
        login.mutate(data);
    };

    return (
        <div className={'tw-flex tw-justify-center tw-h-screen '}>
            <div className={'tw-w-2/5 tw-flex tw-flex-col tw-justify-center '}>
                <div>
                    <div className={'tw-mb-10'}>
                        {login.isError && (
                            <Alert severity={'error'}>
                                {login.error?.response?.data?.message}
                            </Alert>
                        )}
                    </div>
                    <form onSubmit={handleSubmit(submit)}>
                        <div>
                            <Controller
                                control={control}
                                name={'email'}
                                render={({field}) => (
                                    <TextField fullWidth label={'Email'} {...field} />
                                )}
                            />
                        </div>
                        <div className={'tw-mt-10'}>
                            <Controller
                                control={control}
                                name={'password'}
                                render={({field}) => (
                                    <TextField
                                        type={'password'}
                                        fullWidth
                                        label={'Mật khẩu'}
                                        {...field}
                                    />
                                )}
                            />
                        </div>
                        <div className={'tw-mt-10 tw-flex tw-justify-end'}>
                            <Button type={'submit'} variant={'contained'}>
                                Đăng nhập
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default FormLogin;
