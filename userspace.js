var request = require('supertest');
var should = require('should');
var server = require('../server/server');

describe('Users API', () => {

  
  var app = null;
  var testUsers = [{
        email: 'hughes_mayer@zilencio.cr',
        username: 'hughes24',
            nom_du_film:"Sonic 2, le film ",
            annee_de_sortie_du_film:'2022',
            duree_du_film:'101 min',
            genre_de_film:' Animation , Action ,Adventure',
            histoire_du_film:'When the manic Dr Robotnik returns to Earth with a new ally, Knuckles the Echidna, Sonic and his new friend Tails is all that stands in their way.'},];
  var testRepo = {
    getUsers: () => { 
      return Promise.resolve(testUsers);
    },
    getUserByUsername: (username) => { 
      return Promise.resolve(testUsers.find((user) => {
        return user.username === username;
      }));
    }
  };
  
  beforeEach(() => {
    return server.start({
      port: 1234,
      repository: testRepo
    }).then(function (svr) {
      app = svr;
    });
  });

  afterEach(() => {
    app.close();
    app = null;
  });

  it('can return all users', (done) => {

    request(app)
      .get('/users')
      .expect(function(res) {
        res.body.should.containEql({
            email: 'terry_lynn@progenex.mt',
            username: 'terry94',
                nom_du_film:'Encanto , la fantastique famille Madrigal ',
                annee_de_sortie_du_film:'2021',
                duree_du_film:'102 min',
                genre_de_film: 'Animation, Comedy, Family',
                histoire_du_film:'A Colombian teenage girl has to face the frustration of being the only member of her family without magical powers.'
        });
      res.body.should.containEql({
        email: 'marisa_wilkins@vendblend.archi',
        username: 'marisa90',
            nom_du_film:'Tous en scène 2',
            annee_de_sortie_du_film:'2021',
            duree_du_film:'110 min',
            genre_de_film:'Animation, Adventure, Comedy',
            histoire_du_film:'Buster Moon and his friends must persuade reclusive rock star Clay Calloway to join them for the opening of a new show.'
        });
      })
      .expect(200, done);

  });

  it('returns a 404 for an unknown user', (done) => {

    request(app)
      .get('/search?email=terry_lynn@progenex.mt')
      .expect(404, done);
  });

  it('returns a 200 for a known user', (done) => {

    request(app)
      .get('/search?email=marisa_wilkins@vendblend.archi')
      .expect(200, done);
  });

});