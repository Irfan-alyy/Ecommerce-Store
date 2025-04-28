import React, { useState } from 'react';
import { motion, LayoutGroup } from 'framer-motion';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { RxCross2 } from "react-icons/rx";
import Chart from "react-apexcharts";
import { Curve, Tooltip, XAxis } from 'recharts';

const Card = (props) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <LayoutGroup >
      {expanded ? 
      <ExpandedCard param={props} setExpanded={()=> setExpanded(false)} /> 

      : <CompactCard param={props}  setExpanded={()=> setExpanded(true)} />}
    </LayoutGroup>
  );
};

// CompactCard Component
function CompactCard({ param , setExpanded}) {
  const Png = param.png;

  return (
    <motion.div className="CompactedCard "   
    
    style={{
background : param.color.backGround,
boxShadow : param.color.boxShadow


    }}
    layoutId= 'expandableCard'
    onClick={setExpanded}
    >
      <div className="Radialbar">
        <CircularProgressbar
          value={param.barValue || 0}  // Ensure it's a number
          text={`${param.barValue}%`}
        className='CircularProgressbar mt-6  ' />

          <span className=' font-semibold m-0 '>{param.title}</span>

      </div>
      <div className="detail mt-2">

       <Png className="text-4xl"  /> 

        <span className='text-2xl font-semibold '>${param.value}</span>
        <span className='text-sm font-semibold'>Last 24 hours</span>
      </div>
    </motion.div>
  );
}
//  here is  the the ExpandedCard

function ExpandedCard({param, setExpanded}){
const data ={
  options:{
    chart:{
type : "area",
height:'auto'
    },
dropShadow :{
  enabled :false,
enabledOnSeries :undefined,
top: 0,
left: 0,
blur:  3,
color : '#000',
opacity: 0.35,
},
fill:{
color :['#fff'],
type :'gradient',

},
dataLabels:{
  enabled :false,

},
stroke:{
  Curve : 'smooth',
  color : ['white']
},
tooltip:{
x:{
  format : 'dd/MM/yy HH:mm',

}},
grid:{
show: true,
},
xaxis :{
  type: "datatime",
  catagories :[
'2018-09-19T00:00.000Z',
'2018-09-19T01:30.000Z',
'2018-09-19T02:30.000Z',
'2018-09-19T03:30.000Z',
'2018-09-19T04:30.000Z',
'2018-09-19T05:30.000Z',
'2018-09-19T06:30.000Z',

  ]
}



  }
}


  return(
<motion.div 
 className="ExpandedCard mr-20 bg-white " 
style={{
  background : param.color.backGround,
  boxShadow : param.color.boxShadow
  
      }}
      LayoutGroup= 'expandableCard'

        >
<div className='text-3xl  text-white self-end mt-2'>
<RxCross2  onClick={setExpanded}/>
</div>
<span > 
 <a href="" className='text-3xl text-white font-semibold '>{param.title}</a>
</span>
<div className="chartContainer">

<Chart  series={param.series} type='area' options={data.options}  />

</div>
<span>Last 24 hours</span>

</motion.div>

  )
}



export default Card;
