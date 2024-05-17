import Header from "./components/Header";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import SignIn from "./pages/SignIn";
import User from "./pages/UserAccount";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/SignIn" element={<SignIn />} />
                <Route path="/User" element={<User />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
};

export default App;
