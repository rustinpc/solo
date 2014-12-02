var Sequelize = require('sequelize');
var orm = new Sequelize('bestshot', 'root', '');

var Set = orm.define('Set', {
  setname: Sequelize.STRING
});

var Photo = orm.define('Photo', {
  url: Sequelize.STRING,
  rank: Sequelize.INTEGER
});

Set.hasMany(Photo);
Photo.belongsTo(Set);

Set.sync();
Photo.sync();

exports.Set = Set;
exports.Photo = Photo;