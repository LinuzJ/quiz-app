Multiple choice, quiz app.

To run locally:
Either create .env file and enter the following data into it:

HOSTNAMEWSD =
DATABASEWSD =
USERNAMEWSD =
PASSWORDWSD =

OR

you input the database data manually in the file database/database.js.

Test can be run with the command deno test --allow-net --unstable after the database has been configured

After configuring the database the app can be run locally with the command:
deno run --allow-net --allow-read --allow-env --allow-write --unstable run-locally.js

Enjoy!
