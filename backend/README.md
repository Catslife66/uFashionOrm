# Sequelize (relational database)

1. install packages
   npm install --save sequelize
   npm install --save pg pg-hstore //(for postgres)

2. connect to database
   npm install --save-dev sequelize-cli
   npx sequelize-cli init >> will generate config/models/migrations/seeders folders in the dir

in config/config.json > rename config.js
set up env values and add dialectOptions-ssl-require-true

in config/db.js
initiate Sequelize > import into server.js > verify the connection

3. set up models
   each model has its file >>
   avoid direct require module, use quotes to refer a model >>
   define the foreign key relationship by declare xxx.associations before exports
   keep index.js default setup

4. migrate to create tables
   in migrations folder create migration files for each model.
   orders of migrations matter. foreign key relationship needs dependency table get created first.
   every time the model is modified, create a new migration files to run migrate.

name needs to be detailed the change
npx sequelize-cli migration:generate --name create-users
npx sequelize-cli migration:generate --name add-profile-to-users
npx sequelize-cli db:migrate

5. create controllers (views)

6. create routes (urls)

7. create error handling middleware, authentication middleware and other forms validator middleware
