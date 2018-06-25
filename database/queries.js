const dotenv = require('dotenv').config()
var promise = require('bluebird');
var options = {
  // Initialization Options
  promiseLib: promise
};
var pgp = require('pg-promise')(options);
var connectionString = process.env.DATABASE_URL+'?ssl=true';
var db = pgp(connectionString);

module.exports = {
  getAllUsers: getAllUsers,
  getSingleUser: getSingleUser,
  createUser: createUser,
  updateUser: updateUser,
  removeUser: removeUser,
  getAllQuestions: getAllQuestions,
  getSingleQuestion: getSingleQuestion,
  createQuestion: createQuestion,
  updateQuestion: updateQuestion,
  removeQuestion: removeQuestion,
  getAllTrivias: getAllTrivias,
  getSingleTrivia: getSingleTrivia,
  createTrivia: createTrivia,
  updateTrivia: updateTrivia,
  removeTrivia: removeTrivia,
  getAllQuestionTrivias: getAllQuestionTrivias,
  getSingleQuestionTrivia: getSingleQuestionTrivia,
  createQuestionTrivia: createQuestionTrivia,
  removeQuestionTrivia: removeQuestionTrivia,
  getAllUserTrivias: getAllUserTrivias,
  getSingleUserTrivia: getSingleUserTrivia,
  createUserTrivia: createUserTrivia,
  updateUserTrivia: updateUserTrivia,
  removeUserTrivia: removeUserTrivia,
  getAllQuestionsInTrivia: getAllQuestionsInTrivia,
  getAllQuestionsInTrivias: getAllQuestionsInTrivias
};

function getAllUsers(req, res, next) {
  db.any('select * from usuarios')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL users'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getSingleUser(req, res, next) {
  var usrsID = parseInt(req.params.id);
  db.one('select * from usuarios where id = $1', usrsID)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ONE user'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}
function createUser(req, res, next) {
  db.none('insert into usuarios(nombre,genero, correo, contrasena, avatar, tipo)' +
      'values(${nombre}, ${genero}, ${correo}, ${contrasena}, ${avatar}, ${tipo})',
    req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one user'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}
function updateUser(req, res, next) {
  db.none('update usuarios set nombre=$1, genero=$2, correo=$3, contrasena=$4, avatar=$5, tipo=$6 where id=$7',
    [req.body.nombre, req.body.genero, req.body.correo,
      req.body.contrasena, req.body.avatar, req.body.tipo, parseInt(req.params.id)])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated User'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}
function removeUser(req, res, next) {
  var usrID = parseInt(req.params.id);
  db.result('delete from usuarios where id = $1', usrID)
    .then(function (result) {
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} User`
        });
      /* jshint ignore:end */
    })
    .catch(function (err) {
      return next(err);
    });
}

function getAllQuestions(req, res, next) {
  db.any('select * from preguntas')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL questions'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getSingleQuestion(req, res, next) {
  var usrsID = parseInt(req.params.id);
  db.one('select * from preguntas where id = $1', usrsID)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ONE question'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}
function createQuestion(req, res, next) {
  
  db.none('insert into preguntas(pregunta, nivel, tiempo, respuesta_uno, respuesta_dos, respuesta_tres, respuesta_cuatro, correcta)' +
      'values(${pregunta}, ${nivel}, ${tiempo}, ${respuesta_uno}, ${respuesta_dos}, ${respuesta_tres}, ${respuesta_cuatro}, ${correcta})',
    req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one question'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}
function updateQuestion(req, res, next) {
  db.none('update preguntas set pregunta=$1, nivel=$2, tiempo=$3, respuesta_uno=$4, respuesta_dos=$5,'+
      'respuesta_tres=$6, respuesta_cuatro=$7, correcta = $8 where id=$9',
    [req.body.pregunta, parseInt(req.params.nivel), parseInt(req.params.tiempo), req.body.respuesta_uno,
      req.body.respueta_dos, req.body.respuesta_tres, req.body.respuesta_cuatro, parseInt(req.params.correcta), 
      parseInt(req.params.id)])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated Question'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}
function removeQuestion(req, res, next) {
  var usrID = parseInt(req.params.id);
  db.result('delete from preguntas where id = $1', usrID)
    .then(function (result) {
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} Question`
        });
      /* jshint ignore:end */
    })
    .catch(function (err) {
      return next(err);
    });
}

function getAllTrivias(req, res, next) {
  db.any('select * from trivia')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL trivias'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getSingleTrivia(req, res, next) {
  var usrsID = parseInt(req.params.id);
  db.one('select * from trivia where id = $1', usrsID)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ONE trivia'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}
function createTrivia(req, res, next) {
  db.none('insert into trivia(tiempo_maximo)' +
      'values(${tiempo_maximo})',
    req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one trivias'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}
function updateTrivia(req, res, next) {
  db.none('update trivia set tiempo_maximo=$1 where id=$2',
    [ parseInt(req.body.tiempo_maximo), parseInt(req.params.id)])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated User'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}
function removeTrivia(req, res, next) {
  var usrID = parseInt(req.params.id);
  db.result('delete from trivia where id = $1', usrID)
    .then(function (result) {
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} trivia`
        });
      /* jshint ignore:end */
    })
    .catch(function (err) {
      return next(err);
    });
}
function getAllQuestionTrivias(req, res, next) {
  db.any('select * from pregunta_trivia')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL questions in trivias'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getSingleQuestionTrivia(req, res, next) {
  var quesID = parseInt(req.params.id_question);
  var trivID = parseInt(req.params.id_trivia);
  db.one('select * from pregunta_trivia where id_pregunta = $1', quesID,' and id_trivia = $2', trivID)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ONE question in trivia'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}
function getAllQuestionsInTrivias(req, res, next) {
  db.any('SELECT * FROM public."PreguntasDeTrivia"')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ONE trivia with questions'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}
function getAllQuestionsInTrivia(req, res, next) {
  var trivID = parseInt(req.params.id_trivia);  
  db.any('SELECT * FROM public."PreguntasDeTrivia" WHERE id_trivia = $1', trivID)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ONE trivia with questions'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}
function createQuestionTrivia(req, res, next) {
  db.none('insert into pregunta_trivia(id_pregunta, id_trivia)' +
      'values(${id_question}, ${id_trivia})',
    req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one trivias'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}
function removeQuestionTrivia(req, res, next) {
  var quesID = parseInt(req.params.id_question);
  var trivID = parseInt(req.params.id_trivia);
  db.result('delete from pregunta_trivia where id_question = $1', quesID, 'and id_trivia = $2', trivID)
    .then(function (result) {
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} trivia`
        });
      /* jshint ignore:end */
    })
    .catch(function (err) {
      return next(err);
    });
}
function getAllUserTrivias(req, res, next) {
  db.any('select * from usuario_trivia')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL users trivias'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getSingleUserTrivia(req, res, next) {
  var usrsID = parseInt(req.params.id_user);
  var trivID = parseInt(req.params.id_trivia);
  db.one('select * from usuario_trivia where id_usuario = $1', usrsID, ' and id_trivia = $2', trivID)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ONE user trivia'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}
function createUserTrivia(req, res, next) {
  var id_trivia = parseInt(req.params.id_trivia);
  var id_usuario = parseInt(req.params.id_usuario);
  var tiempo_utilizado = parseInt(req.params.tiempo_utilizado);
  var intentos = parseInt(req.params.intentos);
  db.none('insert into usuario_trivia (id_trivia, id_usuario, tiempo_utilizado, intentos)' +
      'values(${id_trivia}, ${id_usuario}, ${tiempo_utilizado}, ${intentos})',
    req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one user trivia'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}
function updateUserTrivia(req, res, next) {
  db.none('update usuario_trivia set tiempo_utilizado=$1, intentos=$2, where id_trivia=$3 and id_usuario=$4',
    [parseInt(req.body.tiempo_utilizado), parseInt(req.body.intentos), parseInt(req.body.id_trivia),
      parseInt(req.body.id_user)])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated User trivia'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}
function removeUserTrivia(req, res, next) {
  var triID = parseInt(req.params.id_trivia);
  var usrID = parseInt(req.params.id_usuario);
  db.result('delete from usuarios where id_usuario = $1', usrID, ' and id_trivia = $2', triID)
    .then(function (result) {
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} User trivia`
        });
      /* jshint ignore:end */
    })
    .catch(function (err) {
      return next(err);
    });
}
