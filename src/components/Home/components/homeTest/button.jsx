const HeroButton = ({onClick}) => {
    return ( <>
    <button className="shop-btn md:px-15 md:py-4 px-8 py-3 bg-transparent border-1  w-fit" onClick={onClick}>
         SHOP NOW
    </button>
    </> );
}
 
export default HeroButton;