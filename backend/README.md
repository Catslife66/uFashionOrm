# Sequelize (relational database)

1. install packages
   npm install --save sequelize
   npm install --save pg pg-hstore //(for postgres)

2. connect to database
   npm install --save-dev sequelize-cli
   npx sequelize-cli init >> will generate config/models/migrations/seeders folders in the dir

   in config/config.json > rename config.js
   set up env values and add dialectOptions-ssl-require-true

3. set up models
   to generate model and migration format file: npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string
   connect database in index.js

   !! sequelize instance comes from models/index.js
   !! use sequelize cli command to generate correct format

4. migrate to create tables
   name needs to be detailed the change
   npx sequelize-cli migration:generate --name create-users
   npx sequelize-cli migration:generate --name add-profile-to-users
   npx sequelize-cli db:migrate

5. create controllers (views)

6. create routes (urls)

7. create error handling middleware, authentication middleware and other forms validator middleware
