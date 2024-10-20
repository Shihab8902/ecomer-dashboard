import Store from "./Store"


const TopBar = ({ title }) => {
    return (
        <div className="pt-6 flex justify-between items-center border-b pb-6 ">
            <h3 className="text-[32px] text-[#232327] font-semibold">{title}</h3>
            <Store />
        </div>
    )
}

export default TopBar