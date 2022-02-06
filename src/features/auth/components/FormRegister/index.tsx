import { Radio, RadioGroup, TextField, FormControlLabel, FormControl, FormLabel, Link } from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import { FormRegisterType } from 'src/features/auth/types'
import LoadingButton from '@mui/lab/LoadingButton'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'
import { useMutation } from 'react-query'
import { getRegister } from 'src/features/auth/repositories'
import { ResponseRegister } from 'src/features/auth/types/register'
import { Response } from 'src/types/response'
import { emailPattern, passwordPattern } from 'src/features/auth/define'
import { useRouter } from 'next/router'

function FormRegister() {
  const router = useRouter()
  const { control, handleSubmit, watch, setError } = useForm<FormRegisterType>({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirm: '',
      role: 'buyer'
    }
  })

  const register = useMutation<
    Response<ResponseRegister>,
    AxiosError<Response>,
    FormRegisterType
    >('register', async (data: FormRegisterType) => {
      return await getRegister(data)
    }, {
      onSuccess(response) {
        toast.success(response.message)
        router.push('/login')
      },
      onError(error) {
        if (error.response) {
          toast.error(error.response?.data?.message)
          // if response message = 'Email đã tồn tại' then set error to 'Email đã tồn tại'
          if (error.response?.data?.message === 'Email đã tồn tại') {
            setError('email', { type: 'manual', message: 'Email đã tồn tại, vui lòng chọn email khác' })
          }
        }
        else if (error.request)
          toast.error(error.request?.statusText)
        else toast.error(error?.message)
      }
  })

  const submit = (data: FormRegisterType) => {
    register.mutate(data)
  }

  return (
    <div className={'tw-flex tw-justify-center tw-h-screen tw-items-center'}>
      <div className={'tw-flex tw-w-4/5 tw-max-w-screen-xl tw-bg-slate-50 tw-justify-between tw-overflow-hidden tw-rounded-md tw-shadow-md'}>
        <div className={'tw-bg-register-bg tw-bg-center tw-bg-cover tw-bg-no-repeat tw-w-8/12'}></div>
        <div className={'tw-flex tw-flex-col tw-p-4 tw-w-4/12'}>
          <h2 className={'tw-m-0 tw-mb-4'}>Tạo tài khoản mới</h2>
        <div>
          <form onSubmit={handleSubmit(submit)} className={'tw-flex tw-flex-col tw-gap-2'}>
            <div>
              <Controller
                control={control}
                name='username'
                rules={{
                  required: 'Tên không được để trống!'
                }}
                render={({ field, fieldState: {error} }) => (
                  <div>
                    <TextField
                      fullWidth
                      label='Tên người dùng'{...field}
                      helperText={error?.message}
                      error={!!error?.message} />
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
                    value: emailPattern,
                    message: 'Email không hợp lệ!'
                  }
                }}
                render={({ field, fieldState: {error} }) => (
                  <div>
                    <TextField
                      fullWidth
                      label='Email'{...field}
                      helperText={error?.message}
                      error={!!error?.message} />
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
                    value: passwordPattern,
                    message: 'Mật khẩu phải có ít nhất 8 ký tự, ít nhất 1 chữ cái, 1 chữ số và 1 ký tự đặc biệt!'
                  }
                }}
                render={({ field, fieldState: {error} }) => (
                  <div>
                    <TextField
                      fullWidth
                      label='Mật khẩu'
                      type={'password'}
                      helperText={error?.message}
                      error={!!error?.message}
                      {...field} />
                  </div>
                )}
              />
            </div>
            <div>
              <Controller
                control={control}
                name={'confirm'}
                rules={{
                  required: 'Mật khẩu không được để trống!',
                  validate: v => v?.trim() === watch('password')?.trim() || 'Mật khẩu không trùng khớp!'
                }}
                render={({ field, fieldState: {error} }) => (
                  <div>
                    <TextField
                      fullWidth
                      label='Xác nhận mật khẩu'
                      type={'password'}
                      helperText={error?.message}
                      error={!!error?.message}
                      {...field} />
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
                render={({ field: { onChange, value } }) => (
                  <div>
                    <FormControl>
                      <FormLabel id='select-role'>Vai trò</FormLabel>
                      <RadioGroup aria-labelledby='select-role' value={value} onChange={onChange}>
                        <FormControlLabel value={'buyer'} control={<Radio />} label='Người mua' />
                        <FormControlLabel value={'seller'} control={<Radio />} label='Người bán' />
                      </RadioGroup>
                    </FormControl>
                  </div>
                )}
              />
            </div>
            <div className={'tw-mt-4 tw-flex tw-justify-end'}>
              <LoadingButton
                type={'submit'}
                variant={'contained'}
                size={'large'}
                loading={register.isLoading}
                disabled={register.isLoading}
              >
                Đăng ký
              </LoadingButton>
            </div>
            <div className={'tw-text-center tw-text-xs tw-mt-2 tw-text-gray-500 tw-no-underline'}>Bạn đã có tài khoản? Chuyển đến
              <Link underline='hover' href={'/login'}> Đăng nhập</Link>
            </div>
          </form>
        </div>
        </div>
      </div>
    </div>
  )
}

export default FormRegister