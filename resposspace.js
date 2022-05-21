'use strict';

var mysql = require('mysql');

class Repository {
  constructor(connectionSettings) {
    this.connectionSettings = connectionSettings;
    this.connection = mysql.createConnection(this.connectionSettings);
  }

  getUsers() {
    return new Promise((resolve, reject) => {

      this.connection.query('SELECTemail, username,nom_du_film,annee_de_sortie_du_film,duree_du_film,genre_du_film,histoire_du_film FROM directory', (err, results) => {
        if(err) {
          return reject(new Error('An error occured getting the users: ' + err));
        }

        resolve((results || []).map((user) => {
          return {
            email: user.email,
            usernamer: user.username,
            nom_du_film: user.nom_du_film,
            annee_de_sortie_du_film: user.annee_de_sortie_du_film,
            duree_du_film:  user.duree_du_film,
            genre_de_film: user.genre_de_film,
            histoire_du_film: user.histoire_du_film,
          };
        }));
      });

    });
  }

  getUserByEmail(email) {

    return new Promise((resolve, reject) => {

      //  Fetch the customer.
      this.connection.query('SELECT email, username,nom_du_film,annee_de_sortie_du_film,duree_du_film,genre_du_film,histoire_du_film FROM directory WHERE username = ?', [username], (err, results) => {

        if(err) {
          return reject(new Error('An error occured getting the user: ' + err));
        }

        if(results.length === 0) {
          resolve(undefined);
        } else {
          resolve({
            email: results[0].email,
            usernamer: results[0].username,
            nom_du_film: results[0].nom_du_film,
            annee_de_sortie_du_film: results[0].annee_de_sortie_du_film,
            duree_du_film:  results[0].duree_du_film,
            genre_de_film: results[0].genre_de_film,
            histoire_du_film: results[0].histoire_du_film,
          });
        }

      });

    });
  }

  disconnect() {
    this.connection.end();
  }
}

module.exports.connect = (connectionSettings) => {
  return new Promise((resolve, reject) => {
    if(!connectionSettings.host) throw new Error("A host must be specified.");
    if(!connectionSettings.user) throw new Error("A user must be specified.");
    if(!connectionSettings.password) throw new Error("A password must be specified.");
    if(!connectionSettings.port) throw new Error("A port must be specified.");

    resolve(new Repository(connectionSettings));
  });
};