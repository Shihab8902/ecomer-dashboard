import useStoreInfo from "../hooks/useStoreInfo";

const CustomerEmailTemplate = () => {
    const { currentStore } = useStoreInfo();


    let parsedHTML = null;
    try {
        parsedHTML = currentStore?.customerEmailTemplate
            ? JSON.parse(currentStore.customerEmailTemplate)
            : null;
    } catch (error) {
        console.error("Error parsing JSON:", error);
        parsedHTML = null;
    }

  

    return (
        currentStore && (
            <div
                dangerouslySetInnerHTML={{
                    __html: currentStore?.customerEmailTemplate || ""
                }}
            ></div>
        )
    );
};

export default CustomerEmailTemplate;
