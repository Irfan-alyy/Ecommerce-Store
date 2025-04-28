import React from 'react'
import Card from './Card'
import { RiMoneyDollarBoxLine } from "react-icons/ri";
import { TbCalendarEvent } from "react-icons/tb";
import { FaRegFileAlt } from "react-icons/fa";
  

export const CardData = [
  {
    title: "Sales",
    color: {
      backGround: "linear-gradient(135deg, #a4508b 0%, #5f0a87 100%)",
      boxShadow: "0px 10px 20px 0px #c084fc",
    },
    barValue: 70,
    value: '25,970',
    png: RiMoneyDollarBoxLine,
    series: [
      {
        name: 'Sales',
        data: [31, 45, 78, 65, 109, 65, 100],
      },
    ],
  },

  {
    title: "Revenue",
    color: {
      backGround: "linear-gradient(135deg, #00b09b 0%, #96c93d 100%)",
      boxShadow: "0px 10px 20px 0px #8ee4af",
    },
    barValue: 82,
    value: '25,970',
    png: TbCalendarEvent,
    series: [
      {
        name: 'Revenue',
        data: [38, 75, 55, 66, 54, 109, 45, 90, 54],
      },
    ],
  },

  {
    title: "Expenses",
    color: {
      backGround: "linear-gradient(135deg, #f7971e 0%, #ffd200 100%)",
      boxShadow: "0px 10px 20px 0px #ffe08a",
    },
    barValue: 65,
    value: '25,970',
    png: FaRegFileAlt,
    series: [
      {
        name: 'Expenses',
        data: [28, 54, 33, 88, 76, 45, 109, 90, 100],
      },
    ],
  },
];

// here is it end

const Cards = () => {
  return (
    <div className='Cards flex gap-6   '>

{
  CardData.map((card , id )=>{
    return(
      <div className="ParentContainer" key={id}>
<Card 
  title={card.title}
  color={card.color}
  barValue={card.barValue}
  value={card.value}       
  png={card.png}
  series={card.series}
/>


      </div>
    )
  })  
}
    </div>
  )
}

export default Cards
