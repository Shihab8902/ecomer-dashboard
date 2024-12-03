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
            }
        ]
    }
])