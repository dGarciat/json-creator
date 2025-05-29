// Modelos TypeScript para steps, componentes y plantillas

export type StepConfig = {
  [key: string]: any; // Configuración dinámica para cada tipo de componente
};

export interface Step {
  id: string; // Ej: '0011_checkOracle'
  type: string; // Ej: 'checkOracle'
  order: number; // Ej: 11
  config: StepConfig;
}

export interface StepGroup {
  id: string; // Ej: '1', '2', ...
  name?: string; // Nombre editable del grupo (opcional)
  steps: Record<string, Step>; // Cada fase es un objeto indexado por id de step
}

export interface JsonTemplate {
  name: string;
  steps: Record<string, Record<string, StepConfig>>; // Las fases/grupos son claves string, cada valor es un objeto plano de configuración (StepConfig) por step
}

export interface FavoriteComponent {
  name: string;
  type: string;
  config: StepConfig;
}

export interface FavoriteTemplate {
  name: string;
  steps: Step[];
}
