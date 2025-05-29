import React, { useState } from 'react';
import { Container, Typography, Box, Button, Paper, Grid, TextField, IconButton } from '@mui/material';
import { Step, StepGroup, JsonTemplate } from './models';
import FlowView from './FlowView.tsx';
import StepConfigEditor from './StepConfigEditor.tsx';

// Botón de importar JSON en la cabecera
const handleImportJson = async (file: File) => {
  try {
    const text = await file.text();
    const data = JSON.parse(text);
    if (data.name && data.steps) {
      // Adaptar a formato interno: stepsByPhase debe ser Record<string, Record<string, Step>>
      const newStepsByPhase: Record<string, Record<string, Step>> = {};
      Object.entries(data.steps).forEach(([phaseId, steps]) => {
        const stepsObj: Record<string, Step> = {};
        Object.entries(steps).forEach(([stepId, config], idx) => {
          stepsObj[stepId] = { id: stepId, type: stepId.split('_').slice(1).join('_'), order: idx + 1, config };
        });
        newStepsByPhase[phaseId] = stepsObj;
      });
      // setStepsByPhase(newStepsByPhase);
      // setSelectedPhase(Object.keys(newStepsByPhase)[0] || '1');
      // setSelectedStepIdx(null);
    } else {
      alert('El archivo JSON no tiene el formato esperado.');
    }
  } catch (err) {
    alert('Error leyendo el archivo JSON.');
  }
};

// Mock de steps/componentes disponibles
const availableComponents = [
  { type: 'checkOracle', label: 'Check Oracle' },
  { type: 'balanceAndPosition', label: 'Balance & Position' },
  { type: 'sendYarc', label: 'Send Yarc' },
  { type: 'manualCrossing', label: 'Manual Crossing' },
  { type: 'alert', label: 'Alert' },
  { type: 'cleanData', label: 'Clean Data' }
];

function App() {
  // Estado para los steps agrupados por fase (steps: Record<string, Step[]>)
  const [stepsByPhase, setStepsByPhase] = useState<Record<string, Record<string, Step>>>({
    '1': {}
  });
  const [selectedPhase, setSelectedPhase] = useState<string>('1');
  const [selectedStepIdx, setSelectedStepIdx] = useState<string | null>(null);
  const [jsonName, setJsonName] = useState<string>('Nuevo JSON de Prueba');

  // Añadir una nueva fase
  const addPhase = () => {
    const phaseIds = Object.keys(stepsByPhase).map(Number);
    const newId = (phaseIds.length > 0 ? Math.max(...phaseIds) + 1 : 1).toString();
    setStepsByPhase({ ...stepsByPhase, [newId]: {} });
    setSelectedPhase(newId);
    setSelectedStepIdx(null);
  };

  // Añadir un nuevo step a la fase seleccionada
  const addStep = (type: string) => {
    const steps = stepsByPhase[selectedPhase] || {};
    // Obtener el siguiente orden y un id único
    const order = Object.values(steps).length > 0 ? Math.max(...Object.values(steps).map(s => s.order)) + 1 : 1;
    const id = `${order.toString().padStart(4, '0')}_${type}`;
    const newStep: Step = { id, type, order, config: {} };
    setStepsByPhase({
      ...stepsByPhase,
      [selectedPhase]: {
        ...steps,
        [id]: newStep
      }
    });
  };

  // Seleccionar step para editar
  const selectStep = (phase: string, stepId: string) => {
    setSelectedPhase(phase);
    setSelectedStepIdx(stepId);
  };

  // Actualizar configuración de un step
  const updateStepConfig = (config: any) => {
    if (!selectedStepIdx) return;
    const steps = stepsByPhase[selectedPhase] || {};
    setStepsByPhase({
      ...stepsByPhase,
      [selectedPhase]: {
        ...steps,
        [selectedStepIdx]: {
          ...steps[selectedStepIdx],
          config
        }
      }
    });
  };

  // Generar JSON final
  const generateJson = (): JsonTemplate => ({
    name: jsonName,
    steps: Object.fromEntries(
      Object.entries(stepsByPhase).map(([phaseId, steps]) => [
        phaseId,
        Object.fromEntries(
          Object.entries(steps).map(([stepId, step]) => [
            stepId,
            step.config // Solo el objeto config plano, sin id/type/order/config
          ])
        )
      ])
    )
  });

  // Handler para importar JSON desde SidebarToolbar
  const handleImportJson = async (file: File) => {
    try {
      const text = await file.text();
      const data = JSON.parse(text);
      if (data.name && data.steps) {
        setJsonName(data.name);
        // Adaptar a formato interno: stepsByPhase debe ser Record<string, Record<string, Step>>
        const newStepsByPhase: Record<string, Record<string, Step>> = {};
        Object.entries(data.steps).forEach(([phaseId, steps]) => {
          const stepsObj: Record<string, Step> = {};
          Object.entries(steps).forEach(([stepId, config], idx) => {
            stepsObj[stepId] = { id: stepId, type: stepId.split('_').slice(1).join('_'), order: idx + 1, config };
          });
          newStepsByPhase[phaseId] = stepsObj;
        });
        setStepsByPhase(newStepsByPhase);
        setSelectedPhase(Object.keys(newStepsByPhase)[0] || '1');
        setSelectedStepIdx(null);
      } else {
        alert('El archivo JSON no tiene el formato esperado.');
      }
    } catch (err) {
      alert('Error leyendo el archivo JSON.');
    }
  };

  return (
    <>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* 1. Título */}
        <Typography variant="h3" align="center" sx={{ fontWeight: 700, mb: 2 }}>
          Generador de JSONs para Pruebas de Integración
        </Typography>
        {/* 2. Importar JSON a la derecha */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mb: 2 }}>
          <input
            accept=".json,application/json"
            style={{ display: 'none' }}
            id="import-json-file"
            type="file"
            onChange={e => {
              const file = e.target.files?.[0];
              if (file) handleImportJson(file);
              e.target.value = '';
            }}
          />
          <label htmlFor="import-json-file">
            <Button variant="contained" color="primary" component="span" startIcon={<span role="img" aria-label="import">📂</span>}>
              Importar JSON
            </Button>
          </label>
        </Box>
        {/* 3. Editar nombre del JSON */}
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 3 }}>
          <TextField
            label="Nombre del JSON"
            value={jsonName}
            onChange={e => setJsonName(e.target.value)}
            variant="outlined"
            sx={{ width: 400 }}
          />
        </Box>
        {/* 4. Acciones/Fases | Editor de Step */}
        <Grid container spacing={3} alignItems="stretch">
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2, height: '100%', borderRadius: 3 }}>
              <Typography variant="h6">Acciones</Typography>
              {availableComponents.map(c => (
                <Button key={c.type} fullWidth variant="outlined" sx={{ my: 1 }} onClick={() => addStep(c.type)}>
                  {c.label}
                </Button>
              ))}
              <Box sx={{ mt: 3 }}>
                <Typography variant="h6">Fases</Typography>
                {Object.keys(stepsByPhase).map(phaseId => (
                  <Box key={phaseId} sx={{ display: 'flex', alignItems: 'center', my: 1 }}>
                    <Button fullWidth variant={selectedPhase === phaseId ? 'contained' : 'outlined'} onClick={() => { setSelectedPhase(phaseId); setSelectedStepIdx(null); }}>
                      {`Fase ${phaseId}`}
                    </Button>
                    {Object.keys(stepsByPhase).length > 1 && (
                      <Button size="small" color="error" sx={{ minWidth: 32, ml: 1 }} onClick={() => {
                        const newStepsByPhase = { ...stepsByPhase };
                        delete newStepsByPhase[phaseId];
                        const phaseKeys = Object.keys(newStepsByPhase);
                        setStepsByPhase(newStepsByPhase);
                        if (selectedPhase === phaseId) {
                          setSelectedPhase(phaseKeys[0] || '1');
                          setSelectedStepIdx(null);
                        }
                      }}>X</Button>
                    )}
                  </Box>
                ))}
                <Button fullWidth variant="contained" color="secondary" sx={{ mt: 2 }} onClick={addPhase}>
                  + Añadir Fase
                </Button>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 2, height: '100%', borderRadius: 3 }}>
  <Typography variant="h6">Editor de Step</Typography>
  {/* Lista de steps de la fase seleccionada */}
  <Box sx={{ mb: 2 }}>
    {Object.keys(stepsByPhase[selectedPhase] || {}).length === 0 ? (
      <Typography color="text.secondary">No hay steps en esta fase</Typography>
    ) : (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {Object.entries(stepsByPhase[selectedPhase] || {})
  .sort(([, a], [, b]) => a.order - b.order)
  .map(([stepId, step]) => (
    <Box key={stepId} sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
      <Button
        variant={selectedStepIdx === stepId ? 'contained' : 'outlined'}
        color={selectedStepIdx === stepId ? 'primary' : 'inherit'}
        size="small"
        sx={{ justifyContent: 'flex-start', flex: 1, textTransform: 'none' }}
        onClick={() => setSelectedStepIdx(stepId)}
      >
        {`${step.order}. ${step.type}`}
      </Button>
      <IconButton
        size="small"
        color="error"
        aria-label="Eliminar Step"
        sx={{ ml: 1 }}
        onClick={() => {
          const newSteps = { ...stepsByPhase[selectedPhase] };
          delete newSteps[stepId];
          setStepsByPhase({ ...stepsByPhase, [selectedPhase]: newSteps });
          if (selectedStepIdx === stepId) setSelectedStepIdx(null);
        }}
      >
        <span style={{ fontWeight: 700, fontSize: 16 }}>✕</span>
      </IconButton>
    </Box>
  ))}
      </Box>
    )}
  </Box>
  {/* Editor del step seleccionado */}
  {!selectedStepIdx ? (
    <Typography color="text.secondary">Selecciona un step para editar</Typography>
  ) : (
    <StepConfigEditor
      type={stepsByPhase[selectedPhase]?.[selectedStepIdx]?.type}
      config={stepsByPhase[selectedPhase]?.[selectedStepIdx]?.config}
      onSave={updateStepConfig}
    />
  )}
</Paper>
          </Grid>
        </Grid>
        {/* 5. Visualizador gráfico de flujo */}
        <Box sx={{ mt: 4 }}>
          <Paper sx={{ p: 3, minHeight: 300, boxShadow: 8, border: '2px solid #1976d2', borderRadius: 4, background: '#f5faff', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
            <Typography variant="h5" sx={{ mb: 2, color: '#1976d2', fontWeight: 700 }}>Visualización gráfica del flujo</Typography>
            <Box sx={{ flex: 1, minHeight: 200 }}>
              <FlowView steps={Object.values(stepsByPhase).flatMap(stepsObj => Object.values(stepsObj))} />
            </Box>
          </Paper>
        </Box>
        {/* 6. Visualizador del JSON */}
        <Box sx={{ mt: 4, mb: 6 }}>
          <Paper sx={{ p: 2, borderRadius: 3, background: '#222', color: '#fff', fontFamily: 'monospace', fontSize: 15 }}>
            <Typography variant="h6" sx={{ mb: 1, color: '#90caf9' }}>JSON generado</Typography>
            <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{JSON.stringify(generateJson(), null, 2)}</pre>
          </Paper>
        </Box>
      </Container>
    </>
  );
};

export default App;
