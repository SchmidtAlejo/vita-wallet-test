# Sistema de Intercambios - Vita Wallet

Este proyecto es una aplicación de sistema de intercambios desarrollada en React, empleando React Context para gestionar el estado global, basada en el diseño proporcionado por Vita Wallet y las instrucciones incluidas en la prueba técnica.

## Tabla de Contenidos

1. [Características](#características)
2. [Requisitos Previos](#requisitos-previos)
3. [Instalación](#instalación)
4. [Configuración](#configuración)
5. [Ejecución](#ejecución)
6. [Estructura del Proyecto](#estructura-del-proyecto)
7. [Pruebas](#pruebas)
8. [Endpoints Utilizados](#endpoints-utilizados)
9. [Observaciones](#observaciones)

## Características

- **Inicio de sesión**: Autenticación con credenciales provistas, gestionando la sesión de usuario.
- **Visualización de balance**: Pantalla principal que muestra el balance del usuario, transacciones recientes e información personal.
- **Intercambio de activos**: Realiza intercambios, validando balances y tasas de cambio actuales.
- **Actualización periódica**: Llama a los endpoints de precios de manera regular para garantizar datos de intercambio precisos.

## Requisitos Previos

- Node.js
- npm
- React

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/SchmidtAlejo/vita-wallet-test
   cd vita-wallet
   npm install
   ```

## Configuración

1. Crea un archivo `.env` en la raíz del proyecto y agrega las variables necesarias, tales como la URL base de la API y cualquier clave requerida.
2. Configuración de variables de entorno:
   ```bash
   VITE_APP_NAME = ANGIE
   VITE_API_URL= https://api.qa.vitawallet.io/api
   ```

## Ejecución

Para iniciar la aplicación en desarrollo:

```bash
    npm run dev
```

Para iniciar la compilación de estilos:

```bash
    npm run sass:watch
```

## Endpoints Utilizados

1. Inicio de sesión: `/api/auth/sign_in`
2. Perfil de usuario: `/api/profile`
3. Precios de criptomonedas: `/api/users/get_crypto_multi_prices`
4. Transacciones del usuario: `/api/transactions`
5. Intercambio de activos: `/api/transactions/exchange`

## Observaciones

- La autenticación se maneja con las credenciales proporcionadas.
- La aplicación asegura que los precios estén actualizados antes de cada transacción de intercambio.
- El correo electrónico del usuario es: `prospecto@vitawallet.io`
- la contraseña del usuario es: `Vita.1212`
