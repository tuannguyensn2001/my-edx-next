import { Radio, RadioGroup, TextField, FormControlLabel, FormControl, FormLabel } from '@mui/material'
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

function FormRegister() {
  const { control, handleSubmit, watch } = useForm<FormRegisterType>({
    defaultValues: {
      name: '',
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
        console.log([response]);
        toast.success(response.message)
      },
      onError(error) {
        if (error.response)
          toast.error(error.response?.data?.message)
        else if (error.request)
          toast.error(error.request?.statusText)
        else toast.error(error?.message)
      }
  })

  const submit = (data: FormRegisterType) => {
    console.log([register]);
    
    register.mutate(data)
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
                render={({ field, fieldState: {error} }) => (
                  <div>
                    <TextField fullWidth label='Tên người dùng'{...field} helperText={error?.message} />
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
                    <TextField fullWidth label='Email'{...field} helperText={error?.message} />
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
                    <TextField fullWidth label='Mật khẩu' type={'password'} helperText={error?.message} {...field} />
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
                render={({ field, fieldState: {error} }) => (
                  <div>
                    <TextField fullWidth label='Xác nhận mật khẩu' type={'password'} helperText={error?.message} {...field} />
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
              Đăng ký</LoadingButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default FormRegister