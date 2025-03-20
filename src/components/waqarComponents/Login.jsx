const Login =()=>{

    return(
        <div className=" flex flex-col items-center justify-center w-screen">
        <div className="loginBox flex justify-center items-center mb-10 mt-24">
          <h4 className="text-2xl mr-3 font-bold">Login</h4>
          <span><hr className="h-5 bg-none border-x-[0.1px]"/></span>
          <h4 className="text-2xl ml-3 font-bold">Register</h4>
        </div>

        <div className="formDiv flex justify-center items-center w-10/12 md:w-2/3 lg:w-1/2 lg:p-24 shadow-[0_0px_3px_rgba(0,0,0,0.25)] hidden">
          <form action="#" className="w-full">
            <input
              type="text"
              placeholder="Username or Email"
              className="mb-7 w-full leading-10 pl-3 border border-[#bdbdbd] focus:outline-none"
            />
            <input
              type="password"
              placeholder="Password"
              className="mb-7 w-full leading-10 pl-3 border border-[#bdbdbd] focus:outline-none"
            />
            {/* <input
              type="password"
              placeholder="Confirm Password"
              className="mb-7 w-full leading-10 pl-3 border border-[#bdbdbd] focus:outline-none"
            /> */}
            <span className="flex justify-between w-full pt-2 pb-5">
              <span>
                <input type="checkbox" name="#" id="chk" />
                <label for="chk" className="ml-1 text-[#242424]">
                  Remember me
                </label>
              </span>
              <a
                href="#"
                className="py-2 px-7 text-sm text-gray-950 hover:text-[#A749FF] transition ease-linear duration-300"
              >
                Forget Password?
              </a>
            </span>
            <span className="w-full">
              <button className="py-2 px-7 text-sm font-medium text-[#333333] bg-[#F2F2F2] hover:bg-[#A749FF] hover:text-white transition ease-linear duration-300">
                LOGIN
              </button>
            </span>
          </form>
        </div>

        <div className="formDiv flex justify-center items-center w-10/12 md:w-2/3 lg:w-1/2 lg:p-24 shadow-[0_0px_3px_rgba(0,0,0,0.25)] hidden">
          <form action="#" className="w-full">
            <input
              type="text"
              placeholder="Full Name"
              className="mb-7 w-full leading-10 pl-3 border border-[#bdbdbd] focus:outline-none"
            />
            <input
              type="text"
              placeholder="Username"
              className="mb-7 w-full leading-10 pl-3 border border-[#bdbdbd] focus:outline-none"
            />
              <input
                type="email"
                placeholder="email"
                className="mb-7 w-full leading-10 pl-3 border border-[#bdbdbd] focus:outline-none"
              />
            <input
              type="password"
              placeholder="Password"
              className="mb-7 w-full leading-10 pl-3 border border-[#bdbdbd] focus:outline-none"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="mb-7 w-full leading-10 pl-3 border border-[#bdbdbd] focus:outline-none"
            />
            <span className="w-full">
              <button className="py-2 px-7 text-sm bg-gray-100 text-gray-950 hover:bg-purple-800 hover:text-white transition ease-linear duration-300">
                REGISTER
              </button>
            </span>
          </form>
        </div>

        <h3 className="font-medium text-2xl hidden">Reset Password</h3>
        <div className="formDiv flex justify-center items-center w-10/12 md:w-2/3 lg:w-1/2 lg:p-24 shadow-[0_0px_3px_rgba(0,0,0,0.25)]">
          <form action="#" className="w-full">
            <input
              type="email"
              placeholder="email"
              className="mb-7 w-full leading-10 pl-3 border border-[#bdbdbd] focus:outline-none"
            />
            <input
              type="password"
              placeholder="Password"
              className="mb-7 w-full leading-10 pl-3 border border-[#bdbdbd] focus:outline-none"
            />
            <input
              type="password"
              placeholder="confirm password"
              className="mb-7 w-full leading-10 pl-3 border border-[#bdbdbd] focus:outline-none"
            />
            <span className="w-full">
              <button className="py-2 px-7 text-sm bg-gray-100 text-gray-950 hover:bg-purple-800 hover:text-white transition ease-linear duration-300">
                RESET
              </button>
            </span>
          </form>
        </div>

      </div>
    )
}

export default Login
