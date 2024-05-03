import Header from "./components/Header";
import Footer from "./components/Footer";
import Hero from "./pages/Hero";
import SignIn from "./pages/SignIn";
import User from "./pages/User";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Hero />} />
                <Route path="/SignIn" element={<SignIn />} />
                <Route path="/User" element={<User />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
};

export default App;
