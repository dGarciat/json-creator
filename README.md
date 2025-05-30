# JSON Creator App

Aplicación web para crear, visualizar y guardar archivos JSON personalizados para pruebas de integración.

## Características principales
- Interfaz gráfica moderna para crear y ordenar steps/componentes
- Permite importar, crear y personalizar componentes
- Guardado de componentes y plantillas como favoritos
- Visualización en tiempo real del JSON generado
- Visualización gráfica tipo flujo de componentes (cajitas conectadas)
- Arquitectura extensible para nuevos tipos de componentes

## Stack tecnológico
- Frontend: React + Material UI + React Flow
- Almacenamiento local (LocalStorage) para favoritos y plantillas

## Estructura de carpetas
- `/src` - Código fuente de la app
- `/public` - Archivos estáticos

## Requisitos
- Node.js >= 16.x (recomendado LTS)
- npm >= 8.x
- Sistema operativo: Windows, macOS o Linux

## Instalación y ejecución
1. Clona el repositorio:
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd json-creator
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Inicia la aplicación en modo desarrollo:
   ```bash
   npm start
   ```
4. Accede a la app en tu navegador en [http://localhost:3000](http://localhost:3000)

---

## Integración con API externa (Importar/Guardar configuraciones)

La app está preparada para integrarse con una API REST que permita importar y guardar configuraciones de steps/componentes. Los botones de importar y guardar en BBDD están listos para consumir estos endpoints.

### Endpoints sugeridos

#### 1. Importar configuración
- **Método:** `GET`
- **Endpoint:** `/api/configs/:stepType`
- **Descripción:** Devuelve la configuración por defecto o guardada para un tipo de step/componente.
- **Ejemplo de request:**
  ```http
  GET /api/configs/email
  ```
- **Ejemplo de respuesta:**
  ```json
  {
    "type": "email",
    "config": {
      "to": "",
      "subject": "",
      "body": ""
    }
  }
  ```

#### 2. Guardar configuración
- **Método:** `POST`
- **Endpoint:** `/api/configs/:stepType`
- **Descripción:** Guarda la configuración personalizada para un tipo de step/componente.
- **Ejemplo de request:**
  ```http
  POST /api/configs/email
  Content-Type: application/json

  {
    "config": {
      "to": "test@ejemplo.com",
      "subject": "Test",
      "body": "Hola mundo"
    }
  }
  ```
- **Ejemplo de respuesta:**
  ```json
  { "success": true }
  ```

### Notas de integración
- Puedes adaptar los endpoints y el formato de los datos según tus necesidades.
- Se recomienda proteger los endpoints si la configuración es sensible.
- El frontend espera recibir y enviar un objeto `config` (puede variar según el tipo de step).
- Los endpoints pueden ser mockeados localmente o implementados en cualquier stack backend (Node, Python, etc).
- Para pruebas rápidas, puedes usar herramientas como [json-server](https://github.com/typicode/json-server) o [Mockoon](https://mockoon.com/).

### Siguiente paso
- Implementa los endpoints y actualiza los handlers de importar/guardar en `StepConfigEditor.tsx` para consumir la API real.

---

## Notas
- La app está pensada para facilitar la incorporación de nuevos componentes custom.
- Los ejemplos de JSON utilizados como referencia están en `/Users/david/Downloads/repoTest`.
