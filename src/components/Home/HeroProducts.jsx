import useFeaturedProducts from "../../customHooks/useFeaturedProducts";

const HeroSection = () => {

    const {products,loading,error}=useFeaturedProducts()

    console.log(products)
    return (<>
    
    </>  );
}
 
export default HeroSection;