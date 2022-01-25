import Head from 'next/head';
import FormLogin from 'src/features/auth/components/FormLogin';

function Login() {
  return (
    <div>
      <Head>
        <title>Đăng nhập</title>
      </Head>
      <main>
        <FormLogin />
      </main>
    </div>
  );
}

export default Login;
