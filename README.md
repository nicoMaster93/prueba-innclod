INNCLOD

Este proyecto contiene el Backend y el Frontend para la prueba de desarrollo.

INSTALACION PROYECTO

1.  git clone -b develop [url_repositorio] [NOMBRE_FOLDER]

2.  git clone -b develop https://github.com/nicoMaster93/prueba-innclod.git ./prueba-innclod

INSTALACION BACKEND

Pasos Para subir la base de Datos

1. Crear Base de datos con el nombre "pruebas_innclod",

2. Si desea cambiar el nombre de la base de datos por otro o cualquier otro valor de configuracion, debera modificar el archivo .env que está alojado en la raiz del folder "backend"

3. Una vez creada la BD puede:

(Opción 1)

Copiar el contenido de la siguiente ruta "**DIR** ./backend/.scriptsSQL/sql/create-tables.sql" y ejecutarlo en la BD.

(Opción 2)

Abra el archivo "**DIR** ./backend/.scriptsSQL/loadDB.php" y ejecutelo en el navegador ej:

Copy

```
http://localhost/[NOMBRE_FOLDER]/backend/.scriptsSQL/loadDB.php

```

Este script creará las tablas y las alimentará con la informacion basica esencial para el correcto funcionamiento.

4.  Una vez creada la BD y sus tablas ya puede realizar las pruebas de funcionalidad de la aplicación

INSTALACION FRONTEND

1.  Para configurar la ruta correcta en el frontend hacia el backend debe validar los valores de la ruta de confirguracion "**DIR** ./dashboard/src/db/.config/config.js", donde el campo "api" hace referencia a la url de consumo de servicio

2.  Una vez que verifique el valor de "api" en el archivo mencionado anteriormente y apunte correctamente a la ruta del back ya puede hacer iniciar con las pruebas.

CREDENCIALES DE LOGIN

1.  Inicia sesion en el login con los siguientes datos

    Copy

    ```
    Usuario: pruebas
    Contraseña: 987654321

    ```

DOCUMENTACION DE LOS SERVICIOS UTILIZADOS EN EL FRONTEND

1.  Para identificar todos los servicios utilizados en el desarrollo de la aplicacion, Puede acceder en el navegador a la ruta "**DIR** . /backend/docs" ej:

    Copy

    ```
    http://localhost/[NOMBRE_FOLDER]/backend/docs

    ```

DIAGRAMA DE CLASES

1. Esta ubicado en la raiz del proyecto en Formato PDF bajo el nombre de: Diagrama de Clases Prueba Técnica Innclod.pdf
