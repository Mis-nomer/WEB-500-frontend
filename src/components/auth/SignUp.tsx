import { Link } from "react-router-dom";
const SignUp = () => {
    const signUpFormSubmit = (e) => {
        e.preventDefault();
    }
    
    return (
        <div className="bg-[#084c61] min-h-screen flex justify-center items-center">
            <div className="w-90% md:w-[526px] bg-white p-8 rounded-md">
                <div className="flex gap-4 items-center w-fit ml-auto mb-6 text-xs md:text-sm">
                    Already have an account ?
                    <Link to='/login' className="px-4 py-1 border border-neutral-900 rounded-md text-xs md:text-sm 
                        hover:bg-[#177e89] hover:text-white hover:border-[#177e89]">
                        Login
                    </Link>
                </div>
                <h1 className="text-neutral-900 font-semibold text-xl md:text-3xl leading-none mb-2">Sign Up</h1>
                <h2 className="text-neutral-500 font-normal text-sm md:text-lg leading-none mb-2">
                    Please fill in this form to create an account
                </h2>
                <form onSubmit={e => signUpFormSubmit(e)} 
                    className="">
                    <div className="flex gap-4 flex-col items-center relative pt-4 pb-6 mb-6 border-b border-neutral-200">
                        <input type="email" required placeholder="Email" 
                            className="p-2 w-full border border-neutral-900 rounded-md text-lg leading-none"/>
                        <input type="password" required placeholder="Password" 
                            className="p-2 w-full border border-neutral-900 rounded-md"/>
                        <input type="submit" value="Submit" 
                            className="cursor-pointer px-5 py-1 bg-[#ffc857] rounded-md"/>
                        <h1 className="absolute bottom-0 right-1/2 translate-x-1/2 translate-y-1/2 w-max
                            bg-white px-3 text-neutral-400 font-normal text-sm md:text-base leading-none">
                            OR SIGN UP WITH
                        </h1>
                    </div>
                </form>
                <div className="flex gap-4 flex-col items-center">
                    <button className="bg-[#177e89] px-6 py-2 rounded-md text-white hover:bg-[#084c61]">
                        Sign up using Google Account
                    </button>
                    <button className="bg-[#177e89] px-6 py-2 rounded-md text-white hover:bg-[#084c61]">
                        Quick Sign Up and Login
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SignUp;