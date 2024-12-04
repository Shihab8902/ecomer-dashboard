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
        nonCommaSeparatedCode: `//For collecting non-comma separated price
export function forProductPrice(Component): ComponentType {
    return (props) => {
        const [store, setStore] = useStore()

        useEffect(() => {
            const captureProductName = () => {
                setStore({ price: parseFloat(props.text.split("$")[1]) })
            }

            captureProductName()
            const pollingInterval = setInterval(() => {
                captureProductName()
            }, 500) //Updates every 500ms

            return () => {
                clearInterval(pollingInterval)
                setStore({ price: 0 })
            }
        }, [])

        return <Component {...props} />
    }
}`,
        commaSeparatedCode: `
//For collecting comma-separated prices
export function forCurrentProductPrice(Component): ComponentType {
    return (props) => {
        const [store, setStore] = useStore()

        useEffect(() => {
            const captureProductName = () => {
                setStore({
                    price: parseInt(
                        props?.text?.split("$")?.[1]?.replace(/,/g, "")
                    ),
                })
            }

            captureProductName()
            const pollingInterval = setInterval(() => {
                captureProductName()
            }, 500) //Updates every 500ms

            return () => {
                clearInterval(pollingInterval)
                setStore({ price: 0 })
            }
        }, [])

        return <Component {...props} />
    }
}
`
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
    }
}


export default overrides;