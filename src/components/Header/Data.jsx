import useWebsiteData from "../../customHooks/useWebsiteData";

const HeaderData = () => {

    const {websiteData,loading,error}=useWebsiteData();

    console.log(websiteData);
    return ( <>
    </> );
}
 
export default HeaderData;