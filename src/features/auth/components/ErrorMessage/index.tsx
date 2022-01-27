import {FormErrorType} from 'src/features/auth/types'

function ErrorMessage(props:FormErrorType) {
  return (
    <div className={'tw-text-xs tw-text-red-600 tw-mt-1'}>{props?.message}</div>
  )
}
export default ErrorMessage