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

## Notas
- La app está pensada para facilitar la incorporación de nuevos componentes custom.
- Los ejemplos de JSON utilizados como referencia están en `/Users/david/Downloads/repoTest`.
