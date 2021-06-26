// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  serverAuthentication: 'http://35.222.176.39/api/authentication',
  serverAddBook: 'http://34.67.7.63:3001/api/addbooks',
  serverEditBook: 'http://34.67.7.63:3002/api/editbooks',
  serverViewBooks: 'http://34.67.7.63:3003/api/viewbooks',
  serverCatalogo: 'http://35.222.176.39/api/catalogos',
  serverCompras: 'http://34.67.7.63:3005/api/compras',
  serverEditorial: 'http://34.67.7.63:3006/api/editorial',
  serverBitacoraBooks: 'http://34.67.7.63:3007/api/bitacora',
  serverSolicitud: 'http://35.222.176.39/api/solicitud'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
