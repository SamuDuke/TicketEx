# TicketEx
Trabajo de Final de Ciclo Formativo de Grado Superior de Desarrollo de Aplicaciones Web diseñado y desarrollado integramente por Samuel Duque Yañez.
Ticketex es una aplicación de gestión de eventos y entradas, cuya función principal es facilitar la compra-venta de las diferentes entradas a los eventos entre los usuarios de la aplicación.

## Tecnologias utilizadas en el proyecto
- Para el diseño y prototipado de la app he utilizado Figma.
- Para la Base de Datos he utilizado mySQL.
- Para el backend he realizado una Rest API con SpringBoot.
- Para el frontend he utilizado Angular17 con Sass y Bootstrap para el diseño responsivo.
- Para el despliegue de la app he realizar un servidor local mediante Xampp usando Tomcat para alojar el backend, Apache para alojar el front y MySQL para la base de datos.

## Proceso de inicialización del proyecto
Para inicializar el proyecto serán ncesarios los siguientes pasos:
1. Tener instalado Xampp para hacer que nuestro ordenador haga de servidor.
2. Ejecutar "esquema.sql" en nuestro sistema gestor de base de datos dentro de nuestro servidor.
3. Realizar una estructura de directorio dentro de nuestro servidor como esta:
    - htdocs
        - ticketex-repo
            - backend
            - frontend
            - img
            - subirImg.php
            - subirImgCat.php
            - subirImgEv.php
4. Copiar el proyecto de "backend" en la carpeta correspondiente de nuestro servidor.
5. Inicializar un proyecto nuevo de Angular mediante npm (instalación previa de nodeJS y angularCli) con el nombre "frontend".
6. Copiar el src en el proyecto de Angular instalado previamente.
7. Copiar la carpeta "img" en la carpeta correspondiente de nuestro servidor.
8. Copiar los archivos php en la carpeta correspondiente de nuestro servidor.
9. Realizar la instalación de los paquetes necesario especificados en el siguiente punto.

## Comandos utilizados para instalar paquetes
Instalación de Bootstrap en el proyecto

    npm i bootstrap

Instalación del repositorio de Google Maps de Angular

    npm i @angular/google-maps

Instalación de CryptoJS en el proyecto, una librería que cuanta con diversos métodos de encriptación de datos, creandome un servicio para encriptar y desencriptar las contraseñas

    npm install crypto-js
    npm i --save-dev @types/crypto-js

## Proceso de despliegue del proyecto
Para desplegar la aplicación una vez inicializado todo correctamente vamos a seguir los siguientes pasos:
1. Realizar el build de nuestro proyecto de Angular medinate el siguiente comando
        ng build --base-href=/ticketex/
2. Una vez realizado se creará la carpeta dist de la que cogeremos todos los archivos que esten dentro de la carpeta "browser" y los pegaremos en una nueva carpeta de htdocs llamada "ticketex".
3. Copiar el archivo .htaccess dentro de nuestro servidor "ticketex", contiene la configuración para el redireccionamiento de los "Deep-links" para Angular.

## Contacto
Puedes contactar conmigo a traves de mi correo electronico "samuel.dq@gmail.com" o a través de mi [LinkedIn][linkedin]

[linkedin]: https://www.linkedin.com/in/samuel-duque-ya%C3%B1ez/
