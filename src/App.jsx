import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  ToggleButton,
  ToggleButtonGroup,
  Alert,
  IconButton,
  Tooltip,
  Link
} from '@mui/material';
import { RefreshCw, Info } from 'lucide-react';
import { getMenu } from './services/api';
import MenuCard from './components/MenuCard';
import DaySelector from './components/DaySelector';

function App() {
  const [menu, setMenu] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDay, setSelectedDay] = useState(new Date().getDate());
  const [mealType, setMealType] = useState('lunch');

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getMenu();
      setMenu(data);

      // Se o dia atual não tiver cardápio, seleciona o primeiro dia disponível
      const days = [...new Set([...data.almoco.map(d => d.dia), ...data.jantar.map(d => d.dia)])].sort((a, b) => a - b);
      if (!days.includes(selectedDay) && days.length > 0) {
        setSelectedDay(days[0]);
      }
    } catch (err) {
      setError('Falha ao carregar o cardápio. Verifique se o servidor API está rodando.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleMealChange = (event, newMeal) => {
    if (newMeal !== null) {
      setMealType(newMeal);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', gap: 2 }}>
        <CircularProgress color="primary" />
        <Typography variant="body1" color="textSecondary">Carregando cardápio...</Typography>
      </Box>
    );
  }

  const days = menu ? [...new Set([...menu.almoco.map(d => d.dia), ...menu.jantar.map(d => d.dia)])].sort((a, b) => a - b) : [];
  const selectedDayData = menu ? {
    lunch: menu.almoco.find(d => d.dia === selectedDay),
    dinner: menu.jantar.find(d => d.dia === selectedDay)
  } : null;

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 800, color: 'primary.main' }}>
            RU APP
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Cardápio Universitário - Campus Baixada Santista
          </Typography>
        </Box>
        <Box>
          <Tooltip title="Atualizar">
            <IconButton onClick={fetchData} size="medium">
              <RefreshCw size={20} />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {error ? (
        <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>
      ) : (
        <>
          <DaySelector
            days={days}
            selectedDay={selectedDay}
            onSelectDay={setSelectedDay}
          />

          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
            <ToggleButtonGroup
              value={mealType}
              exclusive
              onChange={handleMealChange}
              aria-label="tipo de refeição"
              sx={{ bgcolor: 'background.paper', p: 0.5, borderRadius: 3 }}
            >
              <ToggleButton value="lunch" sx={{ px: 4, borderRadius: 2.5 }}>
                Almoço
              </ToggleButton>
              <ToggleButton value="dinner" sx={{ px: 4, borderRadius: 2.5 }}>
                Jantar
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>

          <MenuCard
            mealData={selectedDayData ? selectedDayData[mealType] : null}
            type={mealType}
          />

          <Box sx={{ mt: 4, p: 2, bgcolor: 'rgba(255,255,255,0.03)', borderRadius: 2, display: 'flex', gap: 2, alignItems: 'start' }}>
            <Info size={20} style={{ color: '#03dac6', marginTop: 2, flexShrink: 0 }} />
            <Typography variant="caption" color="textSecondary">
              Os cardápios estão sujeitos a alterações sem aviso prévio. Acompanhe as atualizações diárias no campus.
            </Typography>
          </Box>
        </>
      )}

      <Box sx={{ mt: 6, textAlign: 'center' }}>
        <Typography variant="caption" color="textSecondary">
          © {new Date().getFullYear()} - Desenvolvido por{' '}
          <Link
            href="http://hericmr.github.io/me"
            target="_blank"
            rel="noopener noreferrer"
            color="inherit"
            sx={{ textDecoration: 'underline', opacity: 0.8, '&:hover': { opacity: 1 } }}
          >
            hericmr
          </Link>
        </Typography>
      </Box>

      {/* Decorative Background Image */}
      <Box
        component="img"
        src="/unnamed-removebg-preview(1).png"
        sx={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          maxWidth: '500px',
          opacity: 0.05,
          zIndex: -2,
          pointerEvents: 'none',
          filter: 'grayscale(100%) blur(2px)',
          transition: 'all 0.5s ease',
        }}
      />
    </Container>
  );
}

export default App;
