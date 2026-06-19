import { useForm, } from 'react-hook-form';
import InputField from '../../components/InputField';
import PasswordField from '../../components/PasswordField';
import { login } from '../../api/auth.service';
import { useNavigate } from 'react-router-dom';
import PasswordRequirement from '../../components/PasswordRequirement';

type LoginFormData = {
  username: string;
  password: string;
};

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } =
    useForm<LoginFormData>();
  const password = watch('password', '');
  const passwordRules = {
    length:
      password.length >= 8 &&
      password.length <= 32,

    uppercase:
      /[A-Z]/.test(password),

    number:
      /\d/.test(password),

    special:
      /[^A-Za-z0-9]/.test(password),
  };
  const navigate = useNavigate();
  const onSubmit = async (
    data: LoginFormData
  ) => {
    console.log('SUBMIT');
    console.log(data);
    try {
      const response = await login(
        data.username,
        data.password
      );

      console.log(response.data);

      const { admin, tokens } =
        response.data.data;

      if (tokens.accessToken !== null && tokens.refreshToken !== null) {
        localStorage.setItem(
          'accessToken',
          tokens.accessToken
        );

        localStorage.setItem(
          'refreshToken',
          tokens.refreshToken
        );
      }

      localStorage.setItem(
        'admin',
        JSON.stringify(admin)
      );

      console.log(
        'Login success'
      );

      console.log(localStorage.getItem('accessToken'));

    } catch (error) {
      console.error(error);
    }
    navigate('/dashboard', {
      replace: true
    });
  };

  return (
    <form
      onSubmit={handleSubmit(
        onSubmit
      )}
      className="mt-10 flex flex-col gap-5"
    >
      <InputField
        label="Username or email"
        placeholder="Username or email"
        error={
          errors.username?.message
        }
        {...register('username', {
          required:
            'This field is required',
        })}
      />
      <PasswordField
        placeholder="Password"
        error={errors.password?.message}
        {...register('password', {
          required: 'This field is required',
        })}
      />

      <div
        className="mt-1 rounded-md bg-[#F6F6F6] p-2"
      >
        <div className="space-y-0.5">
          <PasswordRequirement
            met={passwordRules.length}
            text="8–32 characters long"
          />

          <PasswordRequirement
            met={passwordRules.uppercase}
            text="Contain at least one uppercase letter"
          />

          <PasswordRequirement
            met={passwordRules.number}
            text="Contain at least one number"
          />

          <PasswordRequirement
            met={passwordRules.special}
            text="Contain at least one special character"
          />
        </div>
      </div>
      <button
        type="submit"
        className="h-8 min-w-[147px] self-end rounded-[5px] bg-[#4B00A7] font-semibold text-white cursor-pointer"
      >
        Login
      </button>
    </form>
  );
}