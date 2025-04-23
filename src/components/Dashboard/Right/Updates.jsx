
import React from 'react'
import pic1 from './../../../assets/1.jpg'



const updatesData =[

{
    img : pic1,
name :'ALi-Hassan',
noti:"Has orderd the Apple Smart Watch",
time : " 13 minutes ago"



},
{
    img : pic1,
name :"Ayaz-khan",
noti:"Has orderd the Apple Smart Watch",
time : " 2 days ago"



},
{
    img : pic1,
name :"Zesshan Sabir",
noti:"Has orderd the Apple Smart Watch",
time : "1 hour 13 minutes ago"



},




]

const Updates = () => {
  return (
    <div>
      
<div className="updates p-4  bg-white gap-4 pl-4 border-r-4  mt-4 mr-4  flex justify-center items-center flex-col pt-2  " style={{borderRadius:'10px'}}  >
{updatesData.map((item, index )=>{
return(
<div className="update flex justify-center items-center flex-row gap-2  cursor-pointer  " key={index}>
  <img src={item.img}  className='h-[50px] w-[50px]  ' style={{borderRadius :'50%'}}  />
<div className="noti"> 
  <div>
    <span className='font-semibold ml-3'>{item.name}</span>
<span> {item.noti}</span>

  </div>
  <span className='text-red-700'>{item.time}</span>
</div>


</div>

)

})


}
</div>

    </div>
  )
}

export default Updates
