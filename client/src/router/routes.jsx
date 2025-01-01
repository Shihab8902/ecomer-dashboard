import { createBrowserRouter } from "react-router-dom";
import Root from "../layouts/Root";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import PrivateRoute from "../hooks/PrivateRoute";
import CreateStore from "../components/CreateStore";
import ManageStore from "../pages/ManageStore";
import PaymentMethods from "../pages/PaymentMethods";
import RemixTemplate from "../pages/RemixTemplate";
import PaymentRequest from "../pages/PaymentRequest";
import Home from "../pages/Home";
import { OrderTable } from "../components/OrderTable";
import OrderDetails from "../pages/OrderDetails";
import Docs from "../pages/Docs";
import Setup from "../pages/Docs/Setup";
import Integration from "../pages/Docs/Integration";
import Checkout from "../pages/Docs/Checkout";
import StripeCheckout from "../pages/Docs/StripeCheckout";
import Support from "../pages/Docs/Support";
import CustomerEmailTemplate from "../pages/CustomerEmailTemplate";
import OwnerEmailTemplate from "../pages/OwnerEmailTemplate";
import Discounts from "../pages/Discounts/Discounts";
import CreateNewDiscounts from "../pages/Discounts/CreateNewDiscounts";





export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/dashboard",
                element: <PrivateRoute>
                    <Dashboard />
                </PrivateRoute>
            },
            {
                path: "/store/create",
                element: <PrivateRoute>
                    <CreateStore />
                </PrivateRoute>
            },
            {
                path: "/store/manage",
                element: <PrivateRoute>
                    <ManageStore />
                </PrivateRoute>
            },
            {
                path: "/payment",
                element: <PrivateRoute>
                    <PaymentMethods />
                </PrivateRoute>
            },
            {
                path: "/remix",
                element: <PrivateRoute>
                    <RemixTemplate />
                </PrivateRoute>
            },
            {
                path: "/payment/request",
                element: <PrivateRoute>
                    <PaymentRequest />
                </PrivateRoute>
            },
            {
                path: "/orders",
                element: <PrivateRoute>
                    <OrderTable />
                </PrivateRoute>
            },
            {
                path: "/orders/details/:id",
                element: <PrivateRoute>
                    <OrderDetails />
                </PrivateRoute>
            },
            {
                path: "/docs",
                element: <Docs />
            },
            {
                path: "/docs/setup",
                element: <Setup />
            },
            {
                path: "/docs/integration",
                element: <Integration />
            },
            {
                path: "/docs/checkout",
                element: <Checkout />
            },
            {
                path: "/docs/checkout/stripe",
                element: <StripeCheckout />
            },
            {
                path: "/docs/support",
                element: <Support />
            },
            {
                path: "/store/manage/emailTemplates/customer",
                element: <PrivateRoute>
                    <CustomerEmailTemplate />
                </PrivateRoute>
            },
            {
                path: "/store/manage/emailTemplates/owner",
                element: <PrivateRoute>
                    <OwnerEmailTemplate />
                </PrivateRoute>
            },
            {
                path: "/store/manage/discounts",
                element: <PrivateRoute>
                    <Discounts />
                </PrivateRoute>
            },
            {
                path: "/store/manage/discount/new",
                element: <PrivateRoute>
                    <CreateNewDiscounts />
                </PrivateRoute>
            }

        ]
    }
])