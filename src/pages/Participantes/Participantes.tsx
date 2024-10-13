// src/components/StudentForm.tsx
import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { 
  Alert,
  Box, 
  Button, 
  Container, 
  Grid, 
  MenuItem, 
  Select, 
  SelectChangeEvent, 
  Snackbar, 
  TextField, 
  Typography 
} from '@mui/material';

const cursos = [
  'AMS - Análise e Desenvolvimento de Sistemas',
  'Análise e Desenvolvimento de Sistemas',
  'Eletrônica Automotiva',    
  'Gestão de Recursos Humanos',
  'Gestão Empresarial - EAD',
];

const semestres = [
  '1º Semestre', 
  '2º Semestre', 
  '3º Semestre', 
  '4º Semestre', 
  '5º Semestre',
  '6º Semestre'
];

const ParticipantesPage: React.FC = () => {
  const [student, setStudent] = useState({
    matricula: '',
    nomeCompleto: '',
    curso: '',
    semestre: ''
  });
  
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  const handleTextFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setStudent((prevStudent) => ({
      ...prevStudent,
      [name]: value,
    }));
  };

  
  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setStudent((prevStudent) => ({
      ...prevStudent,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Adicionando um aluno à coleção "students"
      await addDoc(collection(db, 'students'), {
        matricula: student.matricula,
        nomeCompleto: student.nomeCompleto,
        curso: student.curso,
        semestre: student.semestre,
      });

      setStudent({
        matricula: '',
        nomeCompleto: '',
        curso: '',
        semestre: ''
      });

      setSnackbarMessage('Aluno cadastrado com sucesso!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Erro ao cadastrar aluno: ', error);
      setSnackbarMessage('Erro ao cadastrar aluno. Tente novamente.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ marginTop: 4, padding: 4, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Cadastro de Aluno
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* Campo Matrícula */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Matrícula"
                name="matricula"
                value={student.matricula}
                onChange={handleTextFieldChange}
                required
              />
            </Grid>

            {/* Campo Nome Completo */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nome Completo"
                name="nomeCompleto"
                value={student.nomeCompleto}
                onChange={handleTextFieldChange}
                required
              />
            </Grid>

            {/* Campo Curso */}
            <Grid item xs={12}>
              <Select
                fullWidth
                name="curso"
                value={student.curso}
                onChange={handleSelectChange}
                displayEmpty
                required
              >
                <MenuItem value="" disabled>
                  Selecione o Curso
                </MenuItem>
                {cursos.map((course) => (
                  <MenuItem key={course} value={course}>
                    {course}
                  </MenuItem>
                ))}
              </Select>
            </Grid>

            {/* Campo Semestre */}
            <Grid item xs={12}>
              <Select
                fullWidth
                name="semestre"
                value={student.semestre}
                onChange={handleSelectChange}
                displayEmpty
                required
              >
                <MenuItem value="" disabled>
                  Selecione o Semestre
                </MenuItem>
                {semestres.map((semester) => (
                  <MenuItem key={semester} value={semester}>
                    {semester}
                  </MenuItem>
                ))}
              </Select>
            </Grid>

            {/* Botão de Cadastro */}
            <Grid item xs={12}>
              <Button 
                fullWidth 
                variant="contained" 
                color="primary" 
                type="submit" 
                sx={{ marginTop: 2 }}
              >
                Cadastrar Aluno
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
      <Snackbar
        open={snackbarOpen} 
        autoHideDuration={6000} 
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ParticipantesPage;
