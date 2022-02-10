import { TextField } from '@mui/material';
import { Control, Controller } from 'react-hook-form';
import { FormSignUpType } from 'src/features/auth/types';

interface Prop {
  control: Control<FormSignUpType>;
}

function FormEmail({ control }: Prop) {
  return (
    <Controller
      control={control}
      name="email"
      rules={{
        required: 'Email không được để trống!',
        pattern: {
          value:
            /^(([^ <>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
          message: 'Email không hợp lệ!',
        },
      }}
      render={({ field, fieldState: { error } }) => (
        <div>
          <TextField
            fullWidth
            label="Email"
            {...field}
            helperText={error?.message}
          />
        </div>
      )}
    />
  );
}
