import React, { useState } from 'react';
import { Box, Typography, TextField, Button, MenuItem } from '@mui/material';
import JsonEditorField from './JsonEditorField.tsx';
import ArrayChipInput from './ArrayChipInput.tsx';
import BooleanSwitch from './BooleanSwitch.tsx';
import { StepConfig } from './models';

interface StepConfigEditorProps {
  type: string;
  config: StepConfig;
  onSave: (config: StepConfig) => void;
}

// Campos por tipo de acción/component
const configFields: Record<string, Array<{ name: string; label: string; type?: string; options?: string[]; tooltip?: string }>> = {
  checkOracle: [
    { name: '_comment', label: 'Comentario', type: 'multiline', tooltip: 'Campo de comentario interno' },
    { name: 'table', label: 'Tabla', tooltip: 'Tabla de consulta en la base de datos' },
    { name: 'replace', label: 'Replace (JSON)', type: 'json', tooltip: 'Objeto de reemplazo de variables' },
    { name: 'replaceDate', label: 'Replace Date (Array)', type: 'array', tooltip: 'Formatos de fecha para reemplazo' },
    { name: 'relativeDate', label: 'Fecha relativa', tooltip: 'Expresión de fecha relativa (ej: 1_wednesday)' },
    { name: 'query', label: 'Query', type: 'multiline', tooltip: 'Consulta SQL' },
    { name: 'findOne', label: 'Find One (JSON)', type: 'json', tooltip: 'Condición para encontrar un registro' }
  ],
  balanceAndPosition: [
    { name: '_comment', label: 'Comentario', type: 'multiline', tooltip: 'Campo de comentario interno' },
    { name: 'init', label: 'Init (boolean)', type: 'boolean', tooltip: '¿Es consulta inicial?' },
    { name: 'relativeDate', label: 'Fecha relativa', tooltip: 'Expresión de fecha relativa' },
    { name: 'entity', label: 'Entidad', tooltip: 'Código de entidad' },
    { name: 'currency', label: 'Moneda', tooltip: 'Código de moneda' },
    { name: 'type', label: 'Tipo', tooltip: 'Tipo de consulta (ej: D)' },
    { name: 'dateType', label: 'Tipo de Fecha', tooltip: 'V=valor, P=posición' },
    { name: 'TRC_CTA_COD', label: 'TRC_CTA_COD', tooltip: 'Código de cuenta' },
    { name: 'contingency', label: 'Contingencia', tooltip: 'Valor de contingencia' },
    { name: 'checkPosition', label: 'Check Position (JSON)', type: 'json', tooltip: 'Validaciones de posición' },
    { name: 'checkBalance', label: 'Check Balance (JSON)', type: 'json', tooltip: 'Validaciones de saldo' }
  ],
  sendYarc: [
    { name: '_comment', label: 'Comentario', type: 'multiline', tooltip: 'Campo de comentario interno' },
    { name: 'endPoint', label: 'EndPoint', tooltip: 'Destino del mensaje' },
    { name: 'replace', label: 'Replace (JSON)', type: 'json', tooltip: 'Variables a reemplazar en el mensaje' },
    { name: 'relativeDate', label: 'Fecha relativa', tooltip: 'Expresión de fecha relativa' },
    { name: 'replaceDate', label: 'Replace Date (Array)', type: 'array', tooltip: 'Formatos de fecha para reemplazo' },
    { name: 'message', label: 'Mensaje', type: 'multiline', tooltip: 'Mensaje a enviar, puede ser XML' },
    { name: 'sleep', label: 'Sleep (ms)', type: 'number', tooltip: 'Retraso en milisegundos' }
  ],
  manualCrossing: [
    { name: '_comment', label: 'Comentario', type: 'multiline', tooltip: 'Campo de comentario interno' },
    { name: 'typeCrossing', label: 'Tipo de cruce', tooltip: 'Tipo de cruce (forcedMatch, etc)' },
    { name: 'previsiones', label: 'Previsiones (Array)', type: 'array', tooltip: 'Lista de previsiones' },
    { name: 'ejecuciones', label: 'Ejecuciones (Array)', type: 'array', tooltip: 'Lista de ejecuciones' },
    { name: 'tipoCruce', label: 'Tipo Cruce', tooltip: 'Tipo de cruce (B, etc)' }
  ],
  alert: [
    { name: '_comment', label: 'Comentario', type: 'multiline', tooltip: 'Campo de comentario interno' },
    { name: 'type', label: 'Tipo', tooltip: 'Tipo de alerta (force, etc)' },
    { name: 'forecasts', label: 'Forecasts (Array)', type: 'array', tooltip: 'Previsiones asociadas' },
    { name: 'executions', label: 'Executions (Array)', type: 'array', tooltip: 'Ejecuciones asociadas' }
  ],
  cleanData: [
    { name: 'type', label: 'Tipo limpieza', options: ['cleanAll', 'cleanPartial'], tooltip: 'Tipo de limpieza a realizar' },
    { name: 'replaceDate', label: 'Replace Date (Array)', type: 'array', tooltip: 'Formatos de fecha para reemplazo' },
    { name: 'relativeDate', label: 'Fecha relativa', tooltip: 'Expresión de fecha relativa' },
    { name: 'query', label: 'Query', type: 'multiline', tooltip: 'Consulta SQL de limpieza' }
  ]
};

const StepConfigEditor: React.FC<StepConfigEditorProps> = ({ type, config, onSave }) => {
  const [localConfig, setLocalConfig] = useState<StepConfig>(config || {});
  const fields = configFields[type] || [];

  const handleChange = (name: string, value: any) => {
    setLocalConfig(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(localConfig);
  };

  return (
    <Box>
      <Typography>ID: {type}</Typography>
      {fields.length === 0 && <Typography color="text.secondary">No hay configuración específica para este tipo.</Typography>}
      {fields.map(field => (
        <Box key={field.name} sx={{ my: 2, p: 1, borderRadius: 2, bgcolor: 'background.paper', boxShadow: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="subtitle2">{field.label}</Typography>
            {field.tooltip && (
              <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                {field.tooltip}
              </Typography>
            )}
          </Box>

          {field.options ? (
            <TextField
              select
              label={field.label}
              value={localConfig[field.name] || ''}
              onChange={e => handleChange(field.name, e.target.value)}
              fullWidth
              size="small"
            >
              {field.options.map(opt => (
                <MenuItem key={opt} value={opt}>{opt}</MenuItem>
              ))}
            </TextField>
          ) : field.type === 'multiline' ? (
            <TextField
              label={field.label}
              value={localConfig[field.name] || ''}
              onChange={e => handleChange(field.name, e.target.value)}
              fullWidth
              multiline
              minRows={3}
              size="small"
            />
          ) : field.type === 'json' ? (
            <JsonEditorField
              label={field.label}
              value={localConfig[field.name] || {}}
              onChange={val => handleChange(field.name, val)}
            />
          ) : field.type === 'array' ? (
            <ArrayChipInput
              label={field.label}
              value={Array.isArray(localConfig[field.name]) ? localConfig[field.name] : []}
              onChange={arr => handleChange(field.name, arr)}
            />
          ) : field.type === 'boolean' ? (
            <BooleanSwitch
              label={field.label}
              checked={!!localConfig[field.name]}
              onChange={val => handleChange(field.name, val)}
            />
          ) : field.type === 'number' ? (
            <TextField
              label={field.label}
              type="number"
              value={localConfig[field.name] ?? ''}
              onChange={e => handleChange(field.name, e.target.value === '' ? undefined : Number(e.target.value))}
              fullWidth
              size="small"
            />
          ) : (
            <TextField
              label={field.label}
              value={localConfig[field.name] || ''}
              onChange={e => handleChange(field.name, e.target.value)}
              fullWidth
              size="small"
            />
          )}
        </Box>
      ))}
      <Button sx={{ mt: 2 }} variant="contained" onClick={handleSave}>
        Guardar cambios
      </Button>
    </Box>
  );
};

export default StepConfigEditor;
