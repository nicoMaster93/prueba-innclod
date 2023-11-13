<?php 
        /**
         * Automatically generated script 
         * Created Date: 2023-11-12 23:09
         * Autor: Nicolás Hernandez <nico.hernandez093@gmail.com>
         * version:1
         * App: Prueba Técnica
         * Informacion: 
         * Esta interfaz implementa los servicios que se exponen y la documentacion de cada uno usando la sintaxis de apiDoc
         * Url Documentation apiDoc : https://apidocjs.com
         **/
        
        interface UsuariosControllerInterfaces {
            /**
             * @api {GET} Usuarios/getAllUsuarios Login
             * @apiName Login
             * @apiGroup Usuarios
             * @apiDescription Login de acceso
             *
             *
             * @apiParam {String} usr Usuario 
             * @apiParam {Numbre} pwd Contraseña 
             *
             
             * @apiSuccessExample {json} Respuesta Exitosa:
             *     HTTP/1.1 200 OK
             *     {
             *        "code": 200,
             *        "message": "",
             *        "result": [...]
             *      }
             * 
             * @apiErrorExample {json} Respuesta de Error:
             *     HTTP/1.1 500 Internal Server Error
             *     {
             *        "code": 500,
             *        "message": "Error en el servidor.",
             *        "result": []
             *      }
            */
            public function login($select="t.*");
        }
         ?>