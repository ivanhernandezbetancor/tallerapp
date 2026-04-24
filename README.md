# 🔧 TallerApp — Sistema de Gestión de Taller

> Proyecto académico 
> TallerApp nace como una solución integral diseñada específicamente para sistematizar las operaciones diarias de un taller de reparación de vehículos. El objetivo
principal es migrar de una gestión en papel hacia un entorno digital completo. Con esta herramienta, el taller podrá registrar clientes (tanto particulares como empresas),
gestionar inventarios, crear presupuestos formales, controlar el avance de las órdenes de reparación y emitir facturas definitivas en una única plataforma unificada.


---

## 🚀 Stack Tecnológico

| Capa | Tecnología |
|------|-----------|
| **Backend** | Node.js + Express 5 + MySQL2 (Pool) |
| **ORM** | Prisma (MariaDB/MySQL) |
| **Auth** | JWT + bcrypt |
| **BD** | MySQL 8 / MariaDB — `tallerapp_db` |

---

## 📁 Estructura del Proyecto






##  📅 Registro de Progreso

### SEMANA 1 — Backend Base y BD
* **Día 1 (Lunes 13/04):** Inicialización del entorno, dependencias Node.js, esquema MySQL base y CRUD Clientes.
* **Día 2 (Martes 14/04):** Diseño relacional final y creación de endpoints de Vehículos, Mecánicos y Diagnósticos iniciales.
* **Día 3 (Miércoles 15/04):** Integración de ORM Prisma y desarrollo de la lógica matemática de Presupuestos.
* **Día 4 (Jueves 16/04):** Inventariado de recambios (Stock con alarmas) y Módulo de emisión automática de Facturas correlativas.
* **Día 5 (Viernes 17/04):** Máquina de estados para convertir Presupuestos a Órdenes, transacciones ACID para descontar stock y testing global de la API.

### SEMANA 2 — Frontend React, Arquitectura y Rutas
* **Día 6 (Martes 21/04):** Configuración del Frontend con Vite, React 19 y Tailwind CSS (paleta industrial oscura), más estructuración MVC.
* **Día 7 (Míercoles 22/04):** Capa de servicios con Axios, Interceptores JWT y abstracción de estado mediante Custom Hooks.
* **Día 8 (Jueves 23/04):** Implementación de seguridad en rutas (`ProtectedRoute`), estados globales con AuthContext y notificaciones.
* **Día 9 (Viernes 24/04):** Diseño de la interfaz de usuario (UI) estructural, incluyendo la creación de un dashboard orientado a la visualización de KPIs, así como el desarrollo de componentes principales como la barra lateral (sidebar), la pantalla de inicio de sesión (login) y la barra de navegación (navbar), todos enfocados al entorno administrativo.



