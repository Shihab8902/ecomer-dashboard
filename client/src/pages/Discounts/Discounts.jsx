import { useNavigate } from "react-router-dom";
import LoaderSpinner from "../../components/LoaderSpinner";
import TopBar from "../../components/TopBar"
import useDiscountInfo from "../../hooks/useDiscountInfo"
import useStoreInfo from "../../hooks/useStoreInfo"
import DiscountCard from "../../components/DiscountCard";
import BottomBar from "../../components/BottomBar";

const Discounts = () => {


    //Hooks
    const { currentStore } = useStoreInfo();
    const navigate = useNavigate();
    const { discounts, discountsLoading } = useDiscountInfo({ currentStore: currentStore });


    return <main>
        {/* Top bar */}
        <TopBar title="Discounts" />

        {/* Content */}
        <div className="max-w-7xl px-5 mx-auto min-h-screen">

            <div className="max-w-[860px] pt-5 mx-auto  mt-[72px] md:mt-0 md:pt-[128px] mb-[72px] md:mb-0">
                {
                    discountsLoading ? <LoaderSpinner shapeWidth="40" shapeHeight="40" shapeColor="#6E717D" /> : discounts?.length <= 0 ? <h3 className="text-center mt-20 text-lg text-gray-500">No discount found!</h3> :
                        <div>

                            <div className="bg-white rounded-[4px] md:rounded-bl-lg md:h-[80vh] md:overflow-hidden py-4 md:pb-5 md:pt-0 md:px-8 px-3">
                                <div >

                                    <div className="mt-6 flex justify-between items-center flex-wrap border-b pb-3">
                                        <h3 className="text-[#232327] font-semibold text-base  md:text-xl leading-[140%]">Discounts</h3>
                                        <button onClick={() => navigate("/discounts/new")} type="button" className="w-fit h-fit rounded-[4px] text-white text-sm font-medium px-3 py-2 leading-[18px] cursor-pointer bg-[#232327] hover:bg-[#000] focus:bg-[#232327]">+ Add discount</button>
                                    </div>

                                    <div className="w-full md: h-[65vh]  md:overflow-auto mt-4">
                                        {
                                            discounts?.map((discount) => <DiscountCard discount={discount} key={discount?._id} />)
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                }
            </div>

        </div>

        {/* Bottom bar */}
        <div className="md:hidden">
            <BottomBar />
        </div>
    </main>
}

export default Discounts