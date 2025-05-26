"use client"

import React, { useState } from 'react'
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { useRouter } from 'next/navigation';
import FileUpload from '../common/FileUpoad';

const Container = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        fetch(`http://localhost:3001/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    document.cookie = `token=${data.data.token}`;
                    localStorage.setItem('token', data.data.token);
                    localStorage.setItem('user', JSON.stringify(data.data.user));
                    router.push('/dashboard');
                }
            })
            .catch(err => console.log(err));

    };

    return (
        <div className='flex items-center justify-between h-screen bg-[#F9FAFB]  '>
            <div className='flex items-center justify-center h-screen bg-gray-500 w-[50%] border-r border-gray-200'>
            </div>


            <div
                className='flex flex-col items-center  w-[50%] justify-center h-screen bg-[#F9FAFB]'
            >
                <h1 className='text-2xl font-bold mb-6 mt-[-40px] text-[#10B981]'>Login</h1>
                <form onSubmit={handleLogin} className='flex flex-col items-center justify-center bg-white  bg-opacity-20    rounded-lg p-8 w-full max-w-md  border-[#E5E7EB] gap-6 '>
                    <Input
                        label="Email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        handleChange={e => setEmail(e.target.value)}
                        required
                        icon={"/icons/Email.svg"}
                    />
                    <Input
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        handleChange={e => setPassword(e.target.value)}
                        required
                        icon={"/icons/Pass.svg"}
                    />
                    <div className='w-full flex items-center justify-center cursor-pointer'>
                        <Button fullWidth type='submit'>Log in</Button>
                    </div>
                    <div className='w-full flex items-center justify-center cursor-pointer'>
                        <Button fullWidth type='submit'>Sign up</Button>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default Container;