import { createBrowserRouter } from "react-router-dom";
import Root from "../layouts/Root";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import PrivateRoute from "../hooks/PrivateRoute";
import CreateStore from "../components/CreateStore";
import ManageStore from "../pages/ManageStore";
import PaymentMethods from "../pages/PaymentMethods";
import RemixTemplate from "../pages/RemixTemplate";
import Documentation from "../pages/Documentation";
import PaymentRequest from "../pages/PaymentRequest";
import OrderTable from "../components/OrderTable";


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
                path: "/setup",
                element: <Documentation />
            },
            {
                path: "/payments/request",
                element: <PrivateRoute>
                    <PaymentRequest />
                </PrivateRoute>
            },
            {
                path: "/orders",
                element: <PrivateRoute>
                    <OrderTable />
                </PrivateRoute>
            }
        ]
    }
])