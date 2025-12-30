import React from 'react';
import { Box, Button, Typography, Stack } from '@mui/material';
import { motion } from 'framer-motion';

const DaySelector = ({ days, selectedDay, onSelectDay }) => {
    return (
        <Box sx={{
            overflowX: 'auto',
            py: 2,
            mb: 3,
            '&::-webkit-scrollbar': { height: 4 },
            '&::-webkit-scrollbar-thumb': { bgcolor: 'rgba(255,255,255,0.1)', borderRadius: 2 }
        }}>
            <Stack direction="row" spacing={1.5} sx={{ px: 1 }}>
                {days.map((day) => (
                    <motion.div
                        key={day}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Button
                            variant={selectedDay === day ? 'contained' : 'outlined'}
                            onClick={() => onSelectDay(day)}
                            sx={{
                                minWidth: 60,
                                height: 60,
                                borderRadius: '12px',
                                display: 'flex',
                                flexDirection: 'column',
                                borderColor: selectedDay === day ? 'primary.main' : 'rgba(255,255,255,0.1)',
                                bgcolor: selectedDay === day ? 'primary.main' : 'transparent',
                                color: selectedDay === day ? 'white' : 'text.secondary',
                            }}
                        >
                            <Typography variant="caption" sx={{ fontSize: '0.65rem', opacity: 0.8 }}>
                                DIA
                            </Typography>
                            <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1 }}>
                                {day}
                            </Typography>
                        </Button>
                    </motion.div>
                ))}
            </Stack>
        </Box>
    );
};

export default DaySelector;
