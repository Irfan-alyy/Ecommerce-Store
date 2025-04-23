import "./ButtonStyle.css"
const BasicButton = ({text}) => {
    return (<>
    <button className="shop-btn px-15 py-4 bg-black text-white text-lg font-semibold  cursor-pointer w-fit">
                     {text}
                    </button>
                    </>  );
}
 
export default BasicButton;