import { useState } from 'react';
import InputField from '../components/InputField';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="mt-10 flex flex-col gap-5">
      <InputField
        label="Username or email"
        placeholder="Username or email"
        value={username}
        onChange={setUsername}
      />

      <InputField
        label="Password"
        placeholder="Password"
        value={password}
        onChange={setPassword}
      />

      <button
        className="h-10 w-[160px] self-end rounded-[5px] bg-[#4B00A7] font-semibold text-white"
      >
        Login
      </button>
    </div>
  );
}