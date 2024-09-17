

const OrderCard = ({ product }) => {

    return <div>
        <div className="flex justify-between items-center">
            <div className="flex items-center gap-5">
                <div className=" w-16 h-16 bg-[#F5F6F8] px-2 py-1">
                    <img className=" w-full h-full" src={product.image} alt="Image Unavailable" />

                </div>
                <div >
                    <h4 className="text-[#232327] text-sm font-semibold leading-5 ">{product.productName}</h4>
                    <div className="flex items-center  gap-8 mt-1">
                        <p className="text-[#232327] text-base leading-6">Size: <span className="text-[#6E717D]">{product.size}</span></p>
                        <p className="text-[#232327] text-base leading-6">Qty: <span className="text-[#6E717D]">{product.quantity}</span></p>
                        <p className="text-[#232327] text-base leading-6 flex items-center gap-2">Color: <div style={{ background: product.color }} className={`w-5 h-5 rounded-full`}></div></p>

                    </div>
                </div>
            </div>

            <div>
                <p className="text-[#6E717D] text-base leading-6 font-semibold ">${product.price}</p>


            </div>
        </div>



    </div>
}

export default OrderCard