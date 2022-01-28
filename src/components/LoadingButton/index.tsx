import AutorenewIcon from '@mui/icons-material/Autorenew'
import styles from './style.module.scss'
import { Button } from "@mui/material"
import { FormLoadingType } from 'src/features/auth/types'

function LoadingButton(props:FormLoadingType) {
  
  return <Button
    type={'submit'}
    variant={'contained'}
    size={'large'}
    disabled={props?.loading}>
      {props?.loading && <AutorenewIcon className={styles.spin} />}
      {props?.loading && <span>Đang đăng ký...</span>}
      {!props?.loading && <span>Đăng ký</span>}
  </Button>
}

export default LoadingButton