<?php 
        /**
         * Automatically generated script 
         * Created Date: 2023-11-12 23:13
         * Autor: Nicolás Hernandez <nico.hernandez093@gmail.com>
         * version:1
         * App: Prueba Técnica
         * Informacion: 
         * Esta interfaz implementa los servicios que se exponen y la documentacion de cada uno usando la sintaxis de apiDoc
         * Url Documentation apiDoc : https://apidocjs.com
         **/
        
        interface DocumentosControllerInterfaces {
            /**
             * @api {GET} Documentos/getAllDocumentos Obtener
             * @apiName Get Documentos
             * @apiGroup Documentos
             * @apiDescription Descripcion del servicio
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
            public function getAllDocumentos($select="t.*");
            /**
             * @api {POST} Documentos/createDocumentos Insertar
             * @apiName Insert
             * @apiGroup Documentos
             * @apiDescription Inserta nuevo documento
             *
             * @apiParam {String} nombre_doc Nombre del documento
             * @apiParam {String} tipo_doc Id del tipo de documento
             * @apiParam {String} proceso_doc Id del Proceso del documento
             * @apiParam {String} contenido_doc Contenido del documento
             
             *
             
             * @apiSuccessExample {json} Respuesta Exitosa:
             *     HTTP/1.1 200 OK
             *     {
             *        "code": 200,
             *        "message": "Se registró correctamente",
             *        "result": []
             *      }
             * 
             * @apiErrorExample {json} Respuesta de Error:
             *     HTTP/1.1 500 Internal Server Error
             *     {
             *        "code": 500,
             *        "message": "Error al insertar el nuevo registro",
             *        "result": []
             *      }
            */
            public function createDocumentos($required=[]);
            /**
             * @api {POST} Documentos/updateDocumentos Actualizar
             * @apiName Update
             * @apiGroup Documentos
             * @apiDescription Actualiza el documento
             *
             * @apiParam {String} nombre_doc Nombre del documento
             * @apiParam {String} tipo_doc Id del tipo de documento
             * @apiParam {String} proceso_doc Id del Proceso del documento
             * @apiParam {String} contenido_doc Contenido del documento
             * @apiParam {Number} docId Id del Documento
             *
             
             * @apiSuccessExample {json} Respuesta Exitosa:
             *     HTTP/1.1 200 OK
             *     {
             *        "code": 200,
             *        "message": "Se actualizó correctamente",
             *        "result": []
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
            public function updateDocumentos();
            /**
             * @api {DELETE} Documentos/deleteDocumentos Eliminar
             * @apiName Eliminar
             * @apiGroup Documentos
             * @apiDescription Eliminacion de Documentos
             *
             * @apiParam {Numbre} id Documento ID 
             *
             
             * @apiSuccessExample {json} Respuesta Exitosa:
             *     HTTP/1.1 200 OK
             *     {
             *        "code": 200,
             *        "message": "Se eliminó el registro correctamente",
             *        "result": []
             *      }
             * 
             * @apiErrorExample {json} Respuesta de Error:
             *     HTTP/1.1 500 Internal Server Error
             *     {
             *        "code": 500,
             *        "message": "Error al eliminar el registro",
             *        "result": []
             *      }
            */
            public function deleteDocumentos();
            /**
             * @api {GET} Documentos/getAllTipoDocs Obtener tipo de documentos
             * @apiName Get getAllTipoDocs
             * @apiGroup Documentos
             * @apiDescription Obtiene el listado de Tipos de Documentos
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
             *        "message": "Error al obtener datos",
             *        "result": []
             *      }
            */
            public function getAllTipoDocs($select="t.*");
        }
         ?>