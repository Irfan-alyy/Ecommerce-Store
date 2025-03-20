import image1 from "../../assets/1.jpg"
const QuickView = (props) => {
    return (
    <div className="fixed top-15 justify-center w-8/12 h-10/12 left-18 bg-amber-500">
        <div className=" ">
        <div className="flex px-5 py-10">
            <img src={image1} alt="" className="w-[370px] h-[450px]" />
            <div>
                <h1>Lorem Ispum Speaker</h1>
                <p>$20 <strike>$30</strike></p>
                <br />
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit expedita neque dignissimos itaque facilis tempore tenetur voluptatem, maiores laudantium distinctio voluptatum. Repellat iusto atque fuga enim optio mollitia libero eos.</p>
            </div>
        </div>

         </div>
    </div>
     );
}
 
export default QuickView;