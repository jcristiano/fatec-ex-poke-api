import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Paper,
  Grid,
} from '@mui/material';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { Link } from 'react-router-dom';

const ParticipantesList: React.FC = () => {
  const [participants, setParticipants] = useState<any[]>([]);

  useEffect(() => {
    const fetchParticipants = async () => {
      const querySnapshot = await getDocs(collection(db, 'students'));
      const participantsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setParticipants(participantsData);
    };

    fetchParticipants();
  }, []);

  const handleExport = () => {
    const data = participants.map((participant) => `ID: ${participant.id}, Matricula: ${participant.matricula}, Nome: ${participant.nomeCompleto}, Curso: ${participant.curso}, Semestre: ${participant.semestre}`);
    const fileContent = data.join('\n');
    const blob = new Blob([fileContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'participantes.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <Container maxWidth="lg" sx={{ marginTop: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Lista de Participantes
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Matricula</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Curso</TableCell>
              <TableCell>Semestre</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {participants.map((participant) => (
              <TableRow key={participant.id}>
                <TableCell>{participant.matricula}</TableCell>
                <TableCell>{participant.nomeCompleto}</TableCell>
                <TableCell>{participant.curso}</TableCell>
                <TableCell>{participant.semestre}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={handleExport}
          >
            Exportar para TXT
          </Button>
        </Grid>
        <Grid item>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Button
              variant="outlined"
              color="secondary"
            >
              Voltar para a Home
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ParticipantesList;
