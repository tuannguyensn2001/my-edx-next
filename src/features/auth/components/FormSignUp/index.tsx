import { Radio, RadioGroup, Button, TextField, FormControlLabel, FormControl, FormLabel } from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import { FormSignUpType } from 'src/features/auth/types'
import ErrorMessage from 'src/features/auth/components/ErrorMessage'

function FormSignUp() {
  const { control, handleSubmit, watch } = useForm<FormSignUpType>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirm: ''
    }
  })
  
  const submit = (data: FormSignUpType) => {
    console.log(data);    
  }

  return (
    <div className={'tw-flex tw-justify-center tw-h-screen tw-items-center'}>
      <div className={'tw-w-2/5 tw-flex tw-flex-col tw-bg-slate-50 tw-justify-center tw-p-4 tw-rounded-md tw-shadow-md'}>
        <h1 className={'tw-m-0 tw-mb-4'}>Đăng ký</h1>
        <div>
          <form onSubmit={handleSubmit(submit)} className={'tw-flex tw-flex-col tw-gap-2'}>
            <div>
              <Controller
                control={control}
                name='name'
                rules={{
                  required: 'Tên không được để trống!'
                }}
                render={({ field, fieldState: {invalid, error} }) => (
                  <div>
                    <TextField fullWidth label='Tên người dùng'{...field} />
                    {invalid && <ErrorMessage message={error?.message} />}
                  </div>
                )}
              />
            </div>
            <div>
              <Controller
                control={control}
                name='email'
                rules={{
                  required: 'Email không được để trống!',
                  pattern: {
                    value: /^(([^ <>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
                    message: 'Email không hợp lệ!'
                  }
                }}
                render={({ field, fieldState: {invalid, error} }) => (
                  <div>
                    <TextField fullWidth label='Email'{...field} />
                    {invalid && <ErrorMessage message={error?.message} />}
                  </div>
                )}
              />
            </div>
            <div>
              <Controller
                control={control}
                name='password'
                rules={{
                  required: 'Mật khẩu không được để trống!',
                  pattern: {
                    value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[~@$!%*#?&])[A-Za-z\d~@$!%*#?&]{8,}$/,
                    message: 'Mật khẩu phải có ít nhất 8 ký tự, ít nhất 1 chữ cái, 1 chữ số và 1 ký tự đặc biệt!'
                  }
                }}
                render={({ field, fieldState: {invalid, error} }) => (
                  <div>
                    <TextField fullWidth label='Mật khẩu' type={'password'} {...field} />
                    {invalid && <ErrorMessage message={error?.message} />}
                  </div>
                )}
              />
            </div>
            <div>
              <Controller
                control={control}
                name='confirm'
                rules={{
                  required: 'Mật khẩu không được để trống!',
                  validate: v => v?.trim() === watch('password')?.trim() || 'Mật khẩu không trùng khớp!'
                }}
                render={({ field, fieldState: {invalid, error} }) => (
                  <div>
                    <TextField fullWidth label='Xác nhận mật khẩu' type={'password'} {...field} />
                    {invalid && <ErrorMessage message={error?.message} />}
                  </div>
                )}
              />
            </div>
            <div>
              <Controller
                control={control}
                name='role'
                rules={{
                  required: 'Chọn vai trò của bạn!'
                }}
                render={({ field: { onChange, value }, fieldState: { invalid, error } }) => (
                  <div>
                    <FormControl>
                      <FormLabel id='select-role'>Vai trò</FormLabel>
                      <RadioGroup aria-labelledby='select-role' value={value} onChange={onChange}>
                        <FormControlLabel value={'buyer'} control={<Radio />} label='Người mua' />
                        <FormControlLabel value={'seller'} control={<Radio />} label='Người bán' />
                      </RadioGroup>
                    </FormControl>
                    {invalid && <ErrorMessage message={error?.message} />}
                  </div>
                )}
              />
            </div>
            <div className={'tw-mt-4 tw-flex tw-justify-end'}>
              <Button
                type={'submit'}
                variant={'contained'}
                size={'large'}>
                Đăng ký
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default FormSignUp