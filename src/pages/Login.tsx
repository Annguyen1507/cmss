import AuthLayout from '../layouts/AuthLayout';
import LoginForm from '../features/LoginForm';
import logo from '../assets/logo.svg'

export default function () {
  return (
    <AuthLayout>
      <div
        className="flex w-[401px] flex-col rounded-[25px] bg-white px-[42px] pt-[67px] pb-[27px] shadow-[0_4px_26px_rgba(0,0,0,0.16)]"
      >
        <img
          src={logo}
          alt="NurtureWave Logo"
          className="mx-auto w-[70px]"
        />

        <h1 className="mt-8 text-center text-[16px] font-bold">
          CMS Login
        </h1>

        <LoginForm />
      </div>
    </AuthLayout>
  );
}