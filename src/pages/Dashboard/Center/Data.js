import { data } from "autoprefixer";
import { RiMoneyDollarBoxLine } from "react-icons/ri";
import { TbCalendarEvent } from "react-icons/tb";
import { FaRegFileAlt } from "react-icons/fa";
export const CardData =[

{
title :"Sales",
color :{
backGround :"linear-gradient(180deg , #bb67ff 0% , #c484f3  100% )   ",
boxShadow :"0px 10px 20px 0px #e0c6f5  ",

},
barValue : 70,
value : '25,970',
png: <RiMoneyDollarBoxLine />, 
series :[
  {
    name : 'Sales',
    data : [31 , 45, 78, 65, 109, 100, 54]
  }
]


},

{
title :"Revenue",
color :{
backGround :"linear-gradient (rgb(248, 212 , 154 ) -146.42%  , rgb(255, 202, 113 ) -44.42%  )   ",
boxShadow :"0px 10px 20px 0px #f9D59B  ",

},
barValue : 70,
value : '25,970',
png: <TbCalendarEvent />, 
series :[
  {
    name : 'Revenue',
    data : [31 , 45, 78, 65, 109, 100, 54]
  }
]


},

{
  title :"Expenses",
  color :{
  backGround :"linear-gradient(180deg , #bb67ff 0% , #c484f3  100% )   ",
  boxShadow :"0px 10px 20px 0px #e0c6f5  ",
  
  },
  barValue : 70,
  value : '25,970',
  png: <FaRegFileAlt />, 
  series :[
    {
      name : 'Expenses',
      data : [31 , 45, 78, 65, 109, 100, 54]
    }
  ]
  
  
  },
  


]