import { Route, Routes } from "react-router-dom";
import { PokemonDetails, PokemonList } from "../pages";

const AppRoute: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<PokemonList />} />
            <Route path="/pokemon/:id" element={<PokemonDetails />} />
        </Routes>
    );
};

export default AppRoute;