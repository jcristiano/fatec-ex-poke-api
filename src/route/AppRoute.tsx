import { Route, Routes } from "react-router-dom";
import { ParticipantesPage, PokemonDetails, PokemonList } from "../pages";

const AppRoute: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<PokemonList />} />
            <Route path="/pokemon/:id" element={<PokemonDetails />} />
            <Route path="/participantes" element={<ParticipantesPage />} />
        </Routes>
    );
};

export default AppRoute;