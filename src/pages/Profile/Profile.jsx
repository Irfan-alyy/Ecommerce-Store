import { SlArrowDown } from "react-icons/sl";
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from "framer-motion";
import Orders from './Orders';
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
const BASE_URL = import.meta.env.VITE_API_BASE_URL;


export default function Profile() {
  const [isToggled1, setIsToggled1] = useState(false)
  const [isToggled2, setIsToggled2] = useState(false)
  const [isDataPresent, setIsDataPresent] = useState(null)
  const [isAdressPresent, setIsAdressPresent] = useState(false)
  const [loginData1, setLoginData1] = useState({ first_name: "", last_name: "", age: "", date_birth: "", phone: "" })
  const [loginData2, setLoginData2] = useState({ street: "", city: "", state: "", country: "", postal_code: "" })
  const [profileData, setProfileData] = useState()
  const [addressData, setAddressData] = useState()
  const [imageSrc, setImageSrc] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  
  useEffect(() => {

    // Get ProfileData
    const profileData = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/user/profile`,
          {
            headers: {
              "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
          }
        )
        if(res.data.message == "Profile not found") {
          setIsDataPresent(false) // will set the data presence according to responce
          
        } else {
          setIsDataPresent(true);
        }
        setProfileData(res.data)
        setLoginData1(res.data)
        setImageFile(res.data.profile_picture)
      } catch (error) {
        console.log('failed to get response', error);
      }
    }
    
    profileData();

    //Get Address Data
    const addressData = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/user/address`,
          {
            headers: {
              "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
          }
        )
        // setAddressData(res.data)
        setLoginData2(res.data[0])
        // setIsAdressPresent(true)
      } catch (error) {
        console.log('failed to get response');
      }
    }
    addressData();

  }, [])


  //Toggling between divs..
  const handleToggle1 = () => {
    setIsToggled1(!isToggled1);
  };  
  const handleToggle2 = () => {
    setIsToggled2(!isToggled2);
  };

  //Input handling of Form 1..
  function handleForm1(event) {
    event.preventDefault();
    setLoginData1(
      (prev) => (
        {
          ...prev,
          [event.target.name]: event.target.value,
        }
      )
    )
  }

  //Input handling of Form 2..
  function handleForm2(event) {
    const { name, value } = event.target;
    setLoginData2(prev => ({
      ...prev,
      [name]: value
    }));
  }


  const handleSubmit1 = (e) => {
    e.preventDefault();
    
    if (isDataPresent) {    // yes--> true                    // data is present it can be empty strings or anything but its present
      // Put Axios profile
      console.log("put api triggered");
      
      axios.put(`${BASE_URL}/user/profile`, loginData1,
        {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
        }
      )
        .then((res) => {
          toast.success('profile updated')
        })
        .catch(error => {
          toast.error(`Profile update failed`);
        });
      let formData = new FormData();
      formData.append("file", imageFile)
      // Post Axios picture
      axios.post(`${BASE_URL}/user/upload-picture`, formData,
        {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
        }
      )
        .then((res) => {
        })
        .catch(error => {
          console.error("image doesn't sent to api: ", error);
        })
    }else  {    
      // Post Axios Profile data
      axios.post(`${BASE_URL}/user/profile`, loginData1,
        {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
        }
      )
        .then((res) => {
          toast.success('profile created')
        })
        .catch(error => {
          toast.error('Error occurred:', error);
        });

    }
  };

  const handleSubmit2 = (e) => {

    e.preventDefault();


    // post axios address loginData2
    axios.post(`${BASE_URL}/user/address`, loginData2, 
      {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
      }
    )
      .then((res) => {
        toast.success('address updated')
      })
      .catch(error => {
        console.error('Post Address data2 Error occurred:', error);
      });

  };

  const handleImageSrcChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file); // Store the file object
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result); // Store base64 string
      };
      reader.readAsDataURL(file); // Convert to base64
    }
  };

  return (
    <div className='my-24 px-5 sm:px-15 md:px-30 lg:px-40 flex flex-col justify-between items-center'>

      <div className='flex flex-col w-full'>
        <div onClick={handleToggle1} className='border border-[#DEE2E6] h-auto flex items-center justify-start bg-[#F9F9F9] transition duration-200 hover:text-[#A749FF] cursor-pointer'>
          <span className='px-4'>1.</span>
          <span className='w-12/12 py-5'>EDIT YOUR ACCOUNT INFORMATION </span>
          <span className='pr-3 hover:text-[#A749FF]'><SlArrowDown className='size-3 clicked' /></span>
        </div>
        <div className='px-8 border border-[#DEE2E6] w-full'>
          {isToggled1 ?
            <motion.div
              key="description"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className='h-auto w-full'>

                <div className="lg:flex lg:justify-between sm:flex sm:flex-col">

                  <div className='my-8 w-1/2'>
                    <h4 className='my-1 mt-26'> MY ACCOUNT INFROMATION </h4>
                    <h4>Your Personal Details</h4>
                  </div>

                  <div className="flex flex-col items-center p-4">
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        accept="imageSrc/*"
                        onChange={handleImageSrcChange}
                        className="hidden"
                      />
                      <img
                        src={imageSrc || `${BASE_URL}/${imageFile}`}
                        alt="Profile"
                        className="w-32 h-32 object-cover rounded-full border-2 border-gray-300"
                      />
                      <div className="text-sm text-center text-blue-500 mt-2">Click to change</div>
                    </label>
                  </div>

                </div>

                   <div className='my-10 flex justify-center'> <hr className='border border-[#DEE2E6] w-12/12' /> </div>

                <div className=''>
                  <form onSubmit={handleSubmit1} className='flex flex-wrap justify-between'>
                    <span className='inline-block my-3 sm:w-full md:w-[48%] lg:w-[48%]'>
                      <label htmlFor="fName" className=''>First Name </label>
                      <input onChange={handleForm1} name='first_name' value={loginData1.first_name ?? profileData.first_name ?? ''} type="text" id="fName" className='border border-[#DEE2E6] h-10 w-full pl-3' minLength="3" maxLength="15" required/>
                    </span>

                    <span className='inline-block my-3 sm:w-full md:w-[48%] lg:w-[48%]'>
                      <label htmlFor="last_name" className=''>Last Name </label>
                      <input onChange={handleForm1} name='last_name' value={loginData1.last_name ?? profileData.last_name ?? ''} type="text" id="lName" className='border border-[#DEE2E6] h-10 w-full pl-3' minLength="3" maxLength="20" required/>
                    </span>

                    <span className='inline-block my-3 sm:w-full md:w-[48%] lg:w-[48%]'>
                      <label htmlFor="date_birth">Date of Birth</label>
                      <input onChange={handleForm1} name='date_birth' value={loginData1.date_birth ?? profileData.date_birth ?? ''} type="date" className='border border-[#DEE2E6] h-10 w-full pl-3' required/>
                    </span>

                    <span className='inline-block my-3 sm:w-full md:w-[48%] lg:w-[48%]'>
                      <label htmlFor="phone" className=''>Telephone </label>
                      <input onChange={handleForm1} name='phone' value={loginData1.phone ?? profileData.phone ?? ''} type="number" id="phone" className='border border-[#DEE2E6] h-10 w-full pl-3' minLength={3} maxLength="15" required/>
                    </span>

                    <span className='inline-block my-3 w-full'>
                      <label htmlFor="age">Age</label>
                      <input onChange={handleForm1} name='age' value={loginData1.age ?? profileData.age ?? ''} type="number" className='border border-[#DEE2E6] h-10 w-full pl-3' minLength="5" maxLength="30" required/>
                    </span>

                    <button type="submit" className='border bg-[#bc5dff] text-white h-10 w-24 my-5 cursor-pointer hover:bg-[#A749FF] transition duration-300'>Submit</button>
                  </form>
                </div>

              </div>
            </motion.div>
            : null}
        </div>
      </div>

      <div className='flex flex-col w-full'>
        <div onClick={handleToggle2} className='my-2 border border-[#DEE2E6] h-auto cursor-pointer flex items-center justify-start bg-[#F9F9F9] transition duration-200 hover:text-[#A749FF]'>
          <span className='px-4'>2.</span>
          <span className='w-12/12 py-5'>MODIFY YOUR ADDRESS BOOK ENTRIES</span>
          <span className='pr-3 hover:text-[#A749FF]'><SlArrowDown className='size-3' /></span>
        </div>
        <div className='sm:px-0 md:px-8 px:lg-8 border border-[#DEE2E6] w-full'>
          {isToggled2 ?
            <motion.div
              key="description"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className='h-auto w-full'>

                <div className='my-8'>
                  <h4 className='my-1 mt-12'> ADDRESS BOOK ENTRIES </h4>
                </div>

                <hr className='border border-[#DEE2E6] w-12/12 my-16' />

                <div className='flex flex-col'>
                  <div className='py-5 text-[18px] sm:w-full md:w-full lg:w-full'>
                    <form onSubmit={handleSubmit2} className='flex flex-wrap justify-between'>
                      <span className='inline-block my-3 sm:w-full md:w-[48%] lg:w-[48%]'>
                        <label htmlFor="street" className=''>Street</label>
                        <input onChange={handleForm2} value={loginData2?.street || ''} name='street' type="text" id="street" className='border border-[#DEE2E6] h-10 w-full pl-3' minLength="3" maxLength="20" required/>
                      </span>

                      <span className='inline-block my-3 sm:w-full md:w-[48%] lg:w-[48%]'>
                        <label htmlFor="city" className=''>City </label>
                        <input onChange={handleForm2} value={loginData2?.city || ''} name='city' type="text" id="city" className='border border-[#DEE2E6] h-10 w-full pl-3' minLength="3" maxLength="15" required/>
                      </span>

                      <span className='inline-block my-3 sm:w-full md:w-[48%] lg:w-[48%]'>
                        <label htmlFor="state">State</label>
                        <input onChange={handleForm2} value={loginData2?.state || ''} name='state' type="text" id="state" className='border border-[#DEE2E6] h-10 w-full pl-3' minLength="5" maxLength="30" required/>
                      </span>

                      <span className='inline-block my-3 sm:w-full md:w-[48%] lg:w-[48%]'>
                        <label htmlFor="country">Country</label>
                        <input onChange={handleForm2} value={loginData2?.country || ''} name='country' type="text" id="country" className='border border-[#DEE2E6] h-10 w-full pl-3' minLength="5" maxLength="30" required/>
                      </span>

                      <span className='inline-block my-3 w-full'>
                        <label htmlFor="postal_code" className=''>ZIP-Code</label>
                        <input onChange={handleForm2} value={loginData2?.postal_code || ''} name='postal_code' type="number" id="postal_code" className='border border-[#DEE2E6] h-10 w-full pl-3' maxLength="15" required/>
                      </span>

                      <button type="submit" className=' my-4 bg-[#bc5dff] text-white h-10 w-24 cursor-pointer hover:bg-[#A749FF] transition duration-300'>Submit</button>
                    </form>
                  </div>
                </div>

              </div>


            </motion.div>
            : null}
        </div>
      </div>

      <Orders />
      <ToastContainer />
    </div>
  )
}