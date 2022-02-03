import Head from 'next/head';
import FormRegister from 'src/features/auth/components/FormRegister';

function Register() {
  return (
    <div>
      <Head>
        <title>Đăng ký</title>
      </Head>
      <main>
        <FormRegister />
      </main>
    </div>
  );
}

export default Register;