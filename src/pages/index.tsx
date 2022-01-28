import { Button } from '@mui/material';
import useAuth from 'src/hooks/useAuth';

function Home() {
  const { user, isLoggedIn } = useAuth();

  return (
    <div>
      <Button variant={'contained'} color={'primary'}>
        {isLoggedIn}
      </Button>
    </div>
  );
}

export default Home;
