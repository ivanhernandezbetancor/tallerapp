# 🔧 TallerApp

Sistema de gestión para taller de reparación de vehículos.

**Estado:** En desarrollo (Semana 1/3)

## 📅 Registro de Progreso

### SEMANA 1: Entorno, BD y API Base 

#### LUNES 13/04/2026 
#### ENTORNO DE DESARROLLO + CONFIGURACIÓN BASE
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

#### MARTES 14/04/2026
#### API CRUD: VEHÍCULOS, MECÁNICOS Y DIAGNÓSTICOS
**Tareas completadas:** 

1. Módulo Vehículos — CRUD completo

Permite gestionar los vehículos asociados a clientes.

Validaciones:

cliente_id, matricula, marca, modelo son obligatorios
La matricula debe ser única → devuelve HTTP 409 en caso de duplicado

Características:

Relación con clientes mediante JOIN para mostrar el nombre del propietario

Endpoints:

<img width="812" height="258" alt="edpoints-mecanicos" src="https://github.com/user-attachments/assets/b4e33715-1b64-4688-b468-3c2c65e1df8f" />

2. Módulo Mecánicos — CRUD completo

Permite gestionar los mecánicos del sistema.

Endpoints:

<img width="833" height="337" alt="Captura de pantalla 2026-04-15 101545" src="https://github.com/user-attachments/assets/69e2362b-931e-4680-a389-7012ff790269" />


3. Módulo Diagnósticos — CRUD inicial

Gestiona los diagnósticos asociados a los vehículos.

Estructura de la tabla diagnosticos:

vehiculo_id: FK → vehículo afectado
mecanico_id: FK → mecánico asignado (permite NULL, ON DELETE SET NULL)
problema_declarado: descripción del cliente
diagnostico_tecnico: análisis del mecánico
fotos_entrada: array JSON con URLs de imágenes
estado:  ENUM('pendiente_presupuesto','presupuestado','rechazado')

Endpoints:

<img width="811" height="255" alt="Captura de pantalla 2026-04-15 101904" src="https://github.com/user-attachments/assets/aa006109-3c52-418d-b693-5d5a228ce3fc" />


🔗 Integración de rutas

En el archivo server.js se han conectado los módulos de la siguiente forma:

app.use('/api/vehiculos', vehiculosRoutes);
app.use('/api/mecanicos', mecanicosRoutes);
app.use('/api/diagnosticos', diagnosticosRoutes);

🧪 Datos de prueba

Se han insertado datos iniciales en la base de datos:

4 diagnósticos (2 en estado presupuestado, 2 en pendiente_presupuesto)

## 📁 Archivos creados / editados

Durante el desarrollo de la API se han creado y modificado los siguientes archivos:

* `controllers/vehiculosController.js`
* `routes/vehiculos.js`
* `controllers/mecanicosController.js`
* `routes/mecanicos.js`
* `controllers/diagnosticosController.js`
* `routes/diagnosticos.js`
* `server.js` (configuración y conexión de rutas)

Estos archivos estructuran la aplicación siguiendo una arquitectura modular, separando la lógica de negocio (controladores) de la definición de endpoints (rutas).

## Día 3 — Miércoles 15 de abril de 2026  
### Módulo de Presupuestos y Configuración de ORM Prisma con MariaDB
**Tareas completadas:**
