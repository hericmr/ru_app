import React from 'react';
import {
    Card,
    CardContent,
    Typography,
    Box,
    Divider,
    Chip,
    Stack
} from '@mui/material';
import {
    Utensils,
    Leaf,
    IceCream,
    Salad,
    Drumstick
} from 'lucide-react';
import { motion } from 'framer-motion';
import { formatMenuString, formatMenuList } from '../utils/formatters';

const SectionItem = ({ icon: Icon, label, value, color }) => (
    <Box sx={{ mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
            <Icon size={18} style={{ marginRight: 8, color: color || '#b0b0b0' }} />
            <Typography variant="caption" color="textSecondary" sx={{ textTransform: 'uppercase', letterSpacing: 1 }}>
                {label}
            </Typography>
        </Box>
        <Typography variant="body1" sx={{ ml: 3.2, fontWeight: 500 }}>
            {value || 'Não informado'}
        </Typography>
    </Box>
);

const MenuCard = ({ mealData, type }) => {
    if (!mealData || !mealData.itens) {
        return (
            <Card sx={{ minHeight: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography color="textSecondary">Nenhum dado disponível para este período.</Typography>
            </Card>
        );
    }

    const { itens } = mealData;
    const isMonday = mealData.dia_semana?.toUpperCase() === 'SEG';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Card sx={{ overflow: 'hidden', position: 'relative' }}>
                <Box sx={{
                    p: 2,
                    background: isMonday
                        ? 'linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%)'
                        : (type === 'lunch' ? 'linear-gradient(135deg, #FF9800 0%, #F44336 100%)' : 'linear-gradient(135deg, #3F51B5 0%, #2196F3 100%)'),
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <Typography variant="h6" sx={{ color: 'white', fontWeight: 700 }}>
                        {isMonday ? 'Segunda Vegetariana' : (type === 'lunch' ? 'Almoço' : 'Jantar')}
                    </Typography>
                    <Chip
                        label={mealData.dia_semana}
                        size="small"
                        sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white', fontWeight: 600 }}
                    />
                </Box>

                <CardContent sx={{ p: 3 }}>
                    <SectionItem
                        icon={isMonday ? Leaf : Drumstick}
                        label="Prato Principal"
                        value={formatMenuString(itens.prato_principal)}
                        color={isMonday ? "#81C784" : "#FF5252"}
                    />

                    <SectionItem
                        icon={isMonday ? Utensils : Leaf}
                        label={isMonday ? "Opções do Dia" : "Opção Vegetariana"}
                        value={formatMenuString(itens.opcao_vegetariana)}
                        color={isMonday ? "#4CAF50" : "#4CAF50"}
                    />

                    <Divider sx={{ my: 2, opacity: 0.1 }} />

                    <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap' }}>
                        <Box sx={{ flex: 1, minWidth: '120px' }}>
                            <SectionItem
                                icon={Utensils}
                                label="Base"
                                value={`${formatMenuString(itens.arroz)} & ${formatMenuString(itens.feijao)}`}
                            />
                        </Box>
                        <Box sx={{ flex: 1, minWidth: '120px' }}>
                            <SectionItem
                                icon={Salad}
                                label="Guarnição"
                                value={formatMenuString(itens.guarnicao)}
                            />
                        </Box>
                    </Stack>

                    <SectionItem
                        icon={Salad}
                        label="Saladas"
                        value={formatMenuList(itens.saladas)}
                    />

                    <Divider sx={{ my: 2, opacity: 0.1 }} />

                    <SectionItem
                        icon={IceCream}
                        label="Sobremesa"
                        value={formatMenuString(itens.sobremesa)}
                        color="#E91E63"
                    />
                </CardContent>
            </Card>
        </motion.div>
    );
};


export default MenuCard;
