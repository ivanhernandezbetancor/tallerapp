# 🔧 TallerApp

Sistema de gestión para taller de reparación de vehículos.

**Estado:** En desarrollo (Semana 1/3)

## 📅 Registro de Progreso

### SEMANA 1: Entorno, BD y API Base 

## Día 1 — Lunes 13 de abril de 2026
### ENTORNO DE DESARROLLO + CONFIGURACIÓN BASE
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

 ## 📁 Archivos creados
  * `package.json`
  * `server.js`
  * `config/database.js`
  * `controllers/clientesController.js`
  * `routes/clientes.js`
  * `.env`
  * ` .gitignore`

**Problemas resueltos:**
- Error de contraseña MySQL (solucionado con DB_PASSWORD=1234)
- Conflicto de ramas Git (solucionado con git pull --allow-unrelated-histories)

## Día 2 — Martes 14 de abril de 2026  
### API CRUD: VEHÍCULOS, MECÁNICOS Y DIAGNÓSTICOS
**Tareas completadas:** 

1. Módulo Vehículos — CRUD completo

Permite gestionar los vehículos asociados a clientes.

Validaciones:

cliente_id, matricula, marca, modelo son obligatorios
La matricula debe ser única → devuelve HTTP 409 en caso de duplicado

Características:

Relación con clientes mediante JOIN para mostrar el nombre del propietario

Endpoints:

## 🚗 Endpoints de Vehículos

| Método | Endpoint               | Función |
|--------|------------------------|--------|
| GET    | `/api/vehiculos`       | Lista con nombre del cliente (JOIN) |
| GET    | `/api/vehiculos/:id`   | Detalle vehículo |
| POST   | `/api/vehiculos`       | Crear vinculado a cliente |
| PUT    | `/api/vehiculos/:id`   | Actualizar datos técnicos |
| DELETE | `/api/vehiculos/:id`   | Eliminar registro |

2. Módulo Mecánicos — CRUD completo

Permite gestionar los mecánicos del sistema.

Endpoints:

## 🔧 Endpoints de Mecánicos

| Método | Endpoint               | Función |
|--------|------------------------|--------|
| GET    | `/api/mecanicos`       | Listar mecánicos activos |
| GET    | `/api/mecanicos/:id`   | Detalle mecánico |
| POST   | `/api/mecanicos`       | Crear mecánico |
| PUT    | `/api/mecanicos/:id`   | Actualizar datos |
| DELETE | `/api/mecanicos/:id`   | Baja lógica |


3. Módulo Diagnósticos — CRUD inicial

Gestiona los diagnósticos asociados a los vehículos.

Creando la Tabla diagnóticos 


## 🩺 Endpoints de Diagnósticos

| Método | Endpoint                   | Función |
|--------|---------------------------|--------|
| GET    | `/api/diagnosticos`       | Listar todos |
| GET    | `/api/diagnosticos/:id`   | Detalle |
| POST   | `/api/diagnosticos`       | Crear nueva entrada de vehículo |
| PUT    | `/api/diagnosticos/:id`   | Actualizar diagnóstico técnico |

🔗 Integración de rutas

En el archivo server.js se han conectado los módulos de la siguiente forma:

* `app.use('/api/vehiculos', vehiculosRoutes);`
* `app.use('/api/mecanicos', mecanicosRoutes);`
* `app.use('/api/diagnosticos', diagnosticosRoutes);`

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

1. Configuración de Prisma ORM
* Instalación de dependencias: npm install prisma --save-dev y npm install @prisma/client.
* Inicialización del ORM para MariaDB: npx prisma init --datasource-provider mysql.
* Configuración de conexión en .env:
* DATABASE_URL="mysql://root:1234@localhost:3306/tallerapp_db".
* Introspección de la base de datos tallerapp_db.sql: npx prisma db pull.
* Generación del cliente: npx prisma generate.

2. Nuevas tablas de base de datos + Lógica de cálculo automático de presupuesto :
* Presupuestos
* lineas_presupuesto
* En presupuestosController.js → generarPresupuesto()

3. Endpoints de Presupuestos

## 💰 Endpoints de Presupuestos

| Método | Endpoint                          | Función |
|--------|----------------------------------|--------|
| GET    | `/api/presupuestos`              | Listar con JOIN a diagnóstico + vehículo |
| POST   | `/api/presupuestos`              | Generar presupuesto con líneas (transacción) |
| PATCH  | `/api/presupuestos/:id/estado`   | Aprobar / Rechazar (CU-04) |

La aprobación guarda firma_cliente y fecha_firma=NOW().
Al aprobar, cambia el estado del diagnóstico a presupuestado

4. Datos de prueba insertados

2 presupuestos aprobados con firma del cliente
8 líneas de presupuesto ( 4 líneas por presupuesto : piezas + mano de obra )

## 📁 Archivos creados / editados

Los siguientes archivos han sido añadidos o modificados para implementar la funcionalidad de presupuestos:

* `controllers/presupuestosController.js`
* `routes/presupuestos.js`
* `database/tallerapp_db.sql (incluye tablas y datos de presupuestos)`
* `prisma/schema.prisma`
* `.env`


## DÍA 4 — Jueves 16/04/2026
### INVENTARIO DE STOCK Y MÓDULO DE FACTURAS
**Tareas completadas:**
