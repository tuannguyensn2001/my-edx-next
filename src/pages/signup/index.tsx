import Head from 'next/head';
import FormSignUp from 'src/features/auth/components/FormSignUp';

function Signup() {
  return (
    <div>
      <Head>
        <title>Đăng ký</title>
      </Head>
      <main>
        <FormSignUp />
      </main>
    </div>
  );
}

export default Signup;
