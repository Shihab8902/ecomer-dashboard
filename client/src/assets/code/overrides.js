const overrides = {
    boilerplate: {
        id: 1,
        code: ` 
import type { ComponentType } from "react"
import { createStore } from "https://framer.com/m/framer/store.js@^1.0.0"
import { useEffect, useState } from "react"
import { v4 as uuidv4 } from "uuid"

//Capture store id
const STORE_ID = localStorage.getItem("ecommer-store-id")

//Data store
const useStore = createStore({
                productId: "",
                productName: "",
                quantity: 1,
                price: 0,
                image: "",
        })

//Main code here`

    },
    productName: {
        id: 2,
        code: `//For collecting product name
export function forProductName(Component): ComponentType {
return (props) => {
    const [store, setStore] = useStore()
    useEffect(() => {
        const captureProductName = () => {
            setStore({ productName: props.text })
        }

        captureProductName()
        const pollingInterval = setInterval(() => {
            captureProductName()
        }, 500) //Updates every 500ms

        return () => {
            clearInterval(pollingInterval)
            setStore({ productName: "" })
        }
    }, [])

    return <Component {...props} />
    }
}`
    },
    productId: {
        id: 3,
        code: `//For collecting product id
export function forProductId(Component): ComponentType {
    return (props) => {
        const [store, setStore] = useStore()

        useEffect(() => {
            const captureProductName = () => {
                setStore({
                    productId: props.text,
                })
            }

            captureProductName()
            const pollingInterval = setInterval(() => {
                captureProductName()
            }, 500) //Updates every 500ms

            return () => {
                clearInterval(pollingInterval)
                setStore({ productId: "" })
            }
        }, [])

        return <Component {...props} />
    }
}`
    },
    productPrice: {
        id: 4,
        nonCommaSeparatedCode: `export function forProductPrice(Component): ComponentType {
    return (props) => {
        const [store, setStore] = useStore()
        const [currencyPosition, setCurrencyPosition] = useState(null)
        const [currencySymbol, setCurrencySymbol] = useState("")

        useEffect(() => {
            setStore({ price: parseFloat(props.text) })
            //Currency preference
            setCurrencyPosition(
                JSON.parse(localStorage.getItem("currency-position"))
            )
            setCurrencySymbol(localStorage.getItem("currency-symbol"))

            return () => {
                setStore({ price: "", quantity: 1 })
            }
        }, [])
        return (
            <Component
                {...props}
                  text={
                    currencyPosition
                        ? \`\${currencySymbol || "\\$"}\${props.text}\`
                        : \`\${props.text}\${currencySymbol}\`
                }
            />
        )
    }
}`,
        commaSeparatedCode: `
export function forProductPrice(Component): ComponentType {
    return (props) => {
        const [store, setStore] = useStore()
        const [currencyPosition, setCurrencyPosition] = useState(null)
        const [currencySymbol, setCurrencySymbol] = useState("")

        useEffect(() => {
            setStore({ price: parseFloat(props.text?.replace(/,/g, "")) })
            //Currency preference
            setCurrencyPosition(
                JSON.parse(localStorage.getItem("currency-position"))
            )
            setCurrencySymbol(localStorage.getItem("currency-symbol"))

            return () => {
                setStore({ price: "", quantity: 1 })
            }
        }, [])
        return (
            <Component
                {...props}
                 text={
                    currencyPosition
                        ? \`\${currencySymbol || "\\$"}\${props.text}\`
                        : \`\${props.text}\${currencySymbol}\`
                }
            />
        )
    }
}
`,
        currencySymbol: `//For giving currency symbol
export function forCurrencySymbol(Component): ComponentType {
    return (props) => {
        const priceValue = props?.text
        const [price, setPrice] = useState(priceValue)

        //Preferred currency data
        useEffect(() => {
            const currencySymbol = localStorage.getItem("currency-symbol")
            const currencyPosition = JSON.parse(
                localStorage.getItem("currency-position")
            )
            if (currencyPosition) {
                setPrice(currencySymbol + priceValue)
            } else {
                setPrice(priceValue + currencySymbol)
            }
        }, [])

        return <Component {...props} text={price} />
    }
}`
    },
    productImage: {
        id: 5,
        singleImageCode: `//For collecting single image
export function forProductImage(Component): ComponentType {
    return (props) => {
        const [store, setStore] = useStore()

        useEffect(() => {
            const captureProductName = () => {
                setStore({
                    image: props?.background?.src,
                })
            }
            captureProductName()
            const pollingInterval = setInterval(() => {
                captureProductName()
            }, 500) //Updates every 500ms

            return () => {
                clearInterval(pollingInterval)
                setStore({ image: "" })
            }
        }, [])

        return <Component {...props} />
    }
}`,
        sliderImageCode: `//For collecting image from slideshow
export function forProductImage(Component): ComponentType {
    return (props) => {
        const [store, setStore] = useStore()

        useEffect(() => {
            const captureProductName = () => {
                setStore({
                    image: props?.slots?.[0]?.props?.background?.src,
                })
            }
            captureProductName()
            const pollingInterval = setInterval(() => {
                captureProductName()
            }, 500) //Updates every 500ms

            return () => {
                clearInterval(pollingInterval)
                setStore({ image: "" })
            }
        }, [])

        return <Component {...props} />
    }
}`
    },
    orderQuantity: {
        id: 6,
        increaseButtonCode: `//Increase quantity
export function forIncreaseQuantity(Component): ComponentType {
    return (props) => {
        const [store, setStore] = useStore()
        return (
            <Component
                {...props}
                onClick={() => {
                    if (store.quantity < 10) {
                        setStore({
                            quantity: store.quantity + 1,
                        })
                    }
                }}
            />
        )
    }
}`,
        decreaseButtonCode: `//Decrease quantitiy
export function forDecreaseQuantity(Component): ComponentType {
    return (props) => {
        const [store, setStore] = useStore()
        return (
            <Component
                {...props}
                onClick={() => {
                    if (store.quantity > 1) {
                        setStore({
                            quantity: store.quantity - 1,
                        })
                    }
                }}
            />
        )
    }
}`,
        displayValueCode: `// Display updated quantity
export function forDisplayUpdatedQuantity(Component): ComponentType {
    return (props) => {
        const [store, setStore] = useStore();
        return <Component {...props} text={\`\${store.quantity} \`} />;
    };
}`
    },
    addToCartButton: {
        id: 7,
        code: `//For add to cart functionality
export function forAddToCartButton(Component): ComponentType {
    return (props) => {
        const [store, setStore] = useStore()

        //Handle add to cart operation
        const handleAddToCart = () => {
            //Get existing saved data
            const savedData =
                JSON.parse(localStorage.getItem("cart-items")) || []

            //Check if the item exist
            const isItemExist = savedData.find(
                (item) => item.productId === store.productId
            )

            if (isItemExist) {
                const item = savedData.find(
                    (item) => item.productId === store.productId
                )
                //Update product state
                let newTotalPrice
                if (item.quantity > 99) {
                    newTotalPrice = parseFloat(item.totalPrice)
                } else if (item.quantity + store.quantity > 99) {
                    newTotalPrice =
                        parseFloat(item.totalPrice) +
                        store.price * (99 - item.quantity)
                } else {
                    newTotalPrice =
                        parseFloat(item.totalPrice) +
                        store.price * store.quantity
                }

                item.quantity =
                    item.quantity + store.quantity > 99
                        ? 99
                        : item.quantity + store.quantity

                item.totalPrice = newTotalPrice.toFixed(2)
                localStorage.setItem("cart-items", JSON.stringify(savedData))
            } else {
               
                if (store.productId) {
                    const newItem = {
                        productId: store.productId,
                        productName: store.productName,
                        image: store.image,
                        price: store.price,
                        quantity: store.quantity,
                        totalPrice: parseFloat(
                            (store.price * store.quantity).toFixed(2)
                        ),
                        uid: uuidv4(),
                        storeId: STORE_ID,
                    }
                    localStorage.setItem(
                        "cart-items",
                        JSON.stringify([...savedData, newItem])
                    )
                }
            }
        }

        return <Component {...props} onClick={handleAddToCart} />
    }
}`
    },
    displaySubtotal: {
        id: 8,
        code: `//For display subtotal on cart
export function forSubtotalAmountDisplay(Component): ComponentType {
    return (props) => {
        const [store, setStore] = useStore()
        const [price, setPrice] = useState(0)

        useEffect(() => {
            const updateSubtotalFromStorage = () => {
                const savedData =
                    JSON.parse(localStorage.getItem("cart-items")) || []
                const subtotal = savedData.reduce(
                    (acc, item) => acc + parseFloat(item.totalPrice),
                    0
                )
                setPrice(subtotal.toFixed(2))
                setStore({ products: savedData })
            }
            updateSubtotalFromStorage()

            const pollingInterval = setInterval(() => {
                updateSubtotalFromStorage()
            }, 500) // Update every 500ms

            return () => {
                clearInterval(pollingInterval)
            }
        }, [])

        useEffect(() => {
            setStore({ subtotal: parseFloat(price) })
        }, [price])

        return <Component {...props} text={\`$\${price.toString()} \`}  />
    }
}`
    },
    displayCartTotal: {
        id: 9,
        code: `//For displaying total cart items

export function forCartItemDisplay(Component): ComponentType {
    return (props) => {
        const [totalProducts, setTotalProducts] = useState(0)

        useEffect(() => {
            const updateItemsFromStorage = () => {
                const savedData =
                    JSON.parse(localStorage.getItem("cart-items")) || []
                setTotalProducts(savedData.length)
            }

            updateItemsFromStorage()

            const pollingInterval = setInterval(() => {
                updateItemsFromStorage()
            }, 1000)

            return () => {
                clearInterval(pollingInterval)
            }
        }, [])

        return <Component {...props} text={totalProducts.toString()} />
    }
}`
    },
    hideUI: {
        id: 10,
        code: `//Conditional render UI elements
export function forRenderingCheckoutElementsOnCondition(Component): ComponentType {
    return (props) => {
        const [store, setStore] = useStore()

        const [isProductsExist, setIsproductExist] = useState(false)

        useEffect(() => {
            const updateItemsFromStorage = () => {
                const savedData =
                    JSON.parse(localStorage.getItem("cart-items")) || []
                if (savedData.length > 0) {
                    setIsproductExist(true)
                }
            }

            updateItemsFromStorage()

            const pollingInterval = setInterval(() => {
                updateItemsFromStorage()
            }, 1000)

            return () => {
                clearInterval(pollingInterval)
            }
        }, [])

        return isProductsExist && <Component {...props} />
    }
}`
    },
    codCheckout: {
        id: 11,
        code: `//For checkout form button
import type { ComponentType } from "react";
import { useEffect, useCallback, useState } from "react";

const STORE_ID = localStorage.getItem("ecommer-store-id");

export function forPlaceOrderButton(Component: ComponentType): ComponentType {
    return (props) => {
        const [hasClicked, setHasClicked] = useState(false);
        const handleFormSubmit = useCallback((e: Event) => {
            e.preventDefault();
            setHasClicked(true);
            const savedData = JSON.parse(localStorage.getItem("cart-items")) || [];
            const form = e.target as HTMLFormElement;

            if (savedData) {
                const data = {
                    shipping_details: {
                        email: form.email.value,
                        name: e.target.name.value,
                        address: {
                            city: form.city.value,
                            country: form.country.value,
                            additionalData: [
                                { Line1: form.line1.value },
                                { Line2: form.line2.value },
                            ],
                            postal_code: form.postal_code.value,
                            state: form.state.value,
                        },
                    },
                    
                    //Important object field (Do not remove)
                    products: savedData,
                    storeId: STORE_ID,
                };

                fetch("https://ecomer-dashboard.vercel.app/checkout/cod", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                })
                    .then((response) => response.json())
                    .then((res) => {
                        if (res?.message === "success") {
                            window?.location?.replace("/thank-you");
                            localStorage.removeItem("cart-items");
                        }
                    })
                    .catch(() => {
                        window?.location?.replace("/cancel");
                    });
            }
        }, []);

        useEffect(() => {
            const formElement = document.querySelector("#checkoutform");
            if (formElement) {
                formElement.addEventListener("submit", handleFormSubmit);
            }

            // Cleanup function to remove the event listener
            return () => {
                if (formElement) {
                    formElement.removeEventListener("submit", handleFormSubmit);
                    setHasClicked(false);
                }
            };
        }, [handleFormSubmit]);

        return <Component {...props} disabled={hasClicked} />;
    };
}
`
    },
    stripeCheckout: {
        id: 12,
        code: `
    // For Stripe checkout initialization.
    import type { ComponentType } from "react";
    
    const STORE_ID = localStorage.getItem("ecommer-store-id");
    
    export function forCheckoutWithStripeButton(Component): ComponentType {
        return (props) => {
            const handleCheckout = () => {
                const savedData = JSON.parse(localStorage.getItem("cart-items")) || [];
    
                if (savedData) {
                    fetch(
                        \`https://ecomer-dashboard.vercel.app/checkout/stripe?storeId=\${STORE_ID}\`,
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(savedData),
                        }
                    )
                        .then((response) => response.json())
                        .then((res) => {
                            if (res) {
                                window.location.assign(res);
                                // Clear the cart items
                                localStorage.removeItem("cart-items");
                            }
                        })
                        .catch((error) => {
                            console.error("Error during checkout:", error);
                        });
                }
            };
    
            return <Component {...props} onClick={handleCheckout} />;
        };
    }`
    }

}


export default overrides;