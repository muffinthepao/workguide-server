challenges
- depending on which Sequelize method you use, the response can vary
- if you .findByPk() if record is not present, it will return NULL
- if you use .findAll() without WHERE parameter, it returns an OBJECT
- if you use .findAll() with WHERE parameter, it returns an ARRAY and further wrapped in a "dataValues" OBJECT

seeding data
- using sequelize
- createdAt and UpdatedAt cannot be null. You have to see the date to `new Date()`