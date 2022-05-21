'use strict';


module.exports = (app, options) => {

  app.get('/users', (req, res, next) => {
    options.repository.getUsers().then((users) => {
      res.status(200).send(users.map((user) => { return {
          email: user.email,
          usernamer: user.username,
          nom_du_film: user.nom_du_film,
          annee_de_sortie_du_film: user.annee_de_sortie_du_film,
          duree_du_film:  user.duree_du_film,
          genre_de_film: user.genre_de_film,
          histoire_du_film: user.histoire_du_film,
        };
      }));
    })
    .catch(next);
  });

  app.get('/search', (req, res, next) => {

    //  Get the username.
    var username = req.query.username;
    if (!username) {
      throw new Error("When searching for a user, the email must be specified, e.g: '/search?email=homer@thesimpsons.com'.");
    }

    //  Get the user from the repo.
    options.repository.getUserByUsername(username).then((user) => {

      if(!user) { 
        res.status(404).send('User not found.');
      } else {
        res.status(200).send({
            email: user.email,
            usernamer: user.username,
            nom_du_film: user.nom_du_film,
            annee_de_sortie_du_film: user.annee_de_sortie_du_film,
            duree_du_film:  user.duree_du_film,
            genre_de_film: user.genre_de_film,
            histoire_du_film: user.histoire_du_film,
        });
      }
    })
    .catch(next);

  });
};