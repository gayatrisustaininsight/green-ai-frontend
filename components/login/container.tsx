"use client"

import React, { useState } from 'react'
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { useRouter } from 'next/navigation';

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
                    localStorage.setItem('token', data.data.token);
                    localStorage.setItem('user', JSON.stringify(data.data.user));
                    router.push('/dashboard');
                }
            })
            .catch(err => console.log(err));

    };

    return (
        <div
            className='flex flex-col items-center justify-center h-screen bg-[#F9FAFB]'
        >
            <h1 className='text-2xl font-bold mb-6 mt-[-40px] text-[#1F2937]'>Login</h1>
            <form onSubmit={handleLogin} className='flex flex-col items-center justify-center bg-white rounded-lg p-8 w-full max-w-md border border-[#E5E7EB] gap-6 shadow'>
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
            </form>
        </div>
    )
}

export default Container;