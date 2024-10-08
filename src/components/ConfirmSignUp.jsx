import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import hyphenLogo from '../assets/hyphen_logo.png';

import { useConfirmSignUp } from '../hooks/cognitoHooks';

const ConfirmSignUp = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [email, setEmail] = useState(location.state?.email || '');
    const [code, setCode] = useState('');
    const { mutate, isLoading, error, isSuccess } = useConfirmSignUp();

    useEffect(() => {
        if (isSuccess) {
            navigate('/signin');
        }
    }, [isSuccess]);

    const handleConfirmSignup = e => {
        e.preventDefault();
        mutate({ email, code });
    };

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
                <div href="#" className="mb-6 flex items-center text-2xl font-semibold text-gray-900 dark:text-white">
                    <img
                        alt="logo"
                        src={hyphenLogo}
                        className="mr-2 h-8 w-8"
                    />
                    Hyphen Demo
                </div>
                <div className="w-full rounded-lg bg-white shadow sm:max-w-md md:mt-0 xl:p-0 dark:border dark:border-gray-700 dark:bg-gray-800">
                    <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Create an account
                        </h1>
                        <form onSubmit={handleConfirmSignup} className="space-y-4 md:space-y-6">
                            <div>
                                <label
                                    htmlFor="email"
                                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Your email
                                </label>
                                <input
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                                    placeholder="name@company.com"
                                    required=""
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="code"
                                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Email Verification Code
                                </label>
                                <input
                                    value={code}
                                    onChange={e => setCode(e.target.value)}
                                    type="text"
                                    name="code"
                                    id="code"
                                    placeholder="••••••"
                                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                                    required=""
                                />
                            </div>
                            <div className="flex items-start">
                                <div className="flex h-5 items-center">
                                    <p className="mb-2 block text-sm font-medium text-red-500 dark:text-red-400">
                                        {!!error && error.message}
                                    </p>
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="w-full rounded-lg bg-primary-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            >
                                Verify account
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ConfirmSignUp;
