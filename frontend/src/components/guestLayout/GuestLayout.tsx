import { Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function GuestLayout() {
    const queryclient = new QueryClient;
    return (
        <div id="guestLayout">
            <QueryClientProvider client={queryclient}>
                <Outlet />
            </QueryClientProvider>
        </div>
    );
}
export default GuestLayout;
