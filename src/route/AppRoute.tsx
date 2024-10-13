import { Route, Routes } from "react-router-dom";
import { ParticipantesList, ParticipantesPage, PokemonDetails, PokemonList } from "../pages";

const AppRoute: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<PokemonList />} />
            <Route path="/pokemon/:id" element={<PokemonDetails />} />
            <Route path="/participantes" element={<ParticipantesPage />} />
            <Route path="/participantes/listar" element={<ParticipantesList />} />
        </Routes>
    );
};

export default AppRoute;