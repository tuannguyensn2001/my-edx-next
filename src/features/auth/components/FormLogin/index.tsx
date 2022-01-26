import { Button, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { FormLoginType } from 'src/features/auth/types';
import { Controller } from 'react-hook-form';

function FormLogin() {
  const { control, handleSubmit } = useForm<FormLoginType>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const submit = (data: FormLoginType) => {
    console.log(data);
  };

  return (
    <div className={'tw-flex tw-justify-center tw-h-screen '}>
      <div className={'tw-w-2/5 tw-flex tw-flex-col tw-justify-center '}>
        <div>
          <form onSubmit={handleSubmit(submit)}>
            <div>
              <Controller
                control={control}
                name={'email'}
                render={({ field }) => (
                  <TextField fullWidth label={'Email'} {...field} />
                )}
              />
            </div>
            <div className={'tw-mt-10'}>
              <Controller
                control={control}
                name={'password'}
                render={({ field }) => (
                  <TextField fullWidth label={'Mật khẩu'} {...field} />
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
