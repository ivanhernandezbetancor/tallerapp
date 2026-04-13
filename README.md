# 🔧 TallerApp

Sistema de gestión para taller de reparación de vehículos.

**Estado:** En desarrollo (Semana 1/3)

## 📅 Registro de Progreso

### SEMANA 1: Entorno, BD y API Base 

#### LUNES 13/04/2026 

**Tareas completadas:**

Repositorio GitHub creado y sincronizado  
Proyecto Node.js inicializado con npm  
Dependencias instaladas:
  - express
  - mysql2
  - cors
  - dotenv
  - nodemon

Estructura de carpetas creada:
  - config/
  - controllers/
  - routes/
  - public/
  - database/

Configuración inicial:
  - .env con variables de entorno
  - config/database.js (conexión MySQL)
  - server.js (servidor Express)

Base de datos MySQL:
  - Base de datos: tallerapp_db
  - Tabla: clientes (particulares y empresas)
  - Tabla: mecanicos
  - Tabla: vehiculos
  - Datos de prueba insertados (2 clientes, 2 mecánicos, 2 vehículos)



 API REST - Clientes:
  - controllers/clientesController.js (funciones CRUD)
  - routes/clientes.js (rutas)
  - Validaciones según tipo (particular/empresa)
  - GET /api/clientes 
  - GET /api/clientes/:id 
  - POST /api/clientes 
  - PUT /api/clientes/:id 
  - DELETE /api/clientes/:id 

 Servidor funcionando:
  - Puerto: 3000
  - http://localhost:3000 
  - http://localhost:3000/api/clientes 

 Control de versiones:
  - 3 commits en GitHub
  - Rama main sincronizada
  - .gitignore configurado

 Archivos creados:
  - package.json
  - server.js
  - config/database.js
  - controllers/clientesController.js
  - routes/clientes.js
  - .env
  - .gitignore

**Problemas resueltos:**
- Error de contraseña MySQL (solucionado con DB_PASSWORD=1234)
- Conflicto de ramas Git (solucionado con git pull --allow-unrelated-histories)

