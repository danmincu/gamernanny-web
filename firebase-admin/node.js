
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');

 

});


var admin = require("firebase-admin");

var serviceAccount = require("./gamer-nanny.json");

var defaultApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://gamer-nanny.firebaseio.com"
});
console.log(`default app name ${defaultApp.name}`);

var defaultAuth = admin.auth();
var defaultDatabase = admin.database();
//console.log(defaultApp);
//console.log(defaultDatabase);

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });


// defaultAuth.getUserByEmail("danmincu@gmail.com").then((user)=> {
//     console.log(JSON.stringify(user));
// }).then(() => process.exit());

/** LIST ALL USERS */
function listAllUsers(nextPageToken) {
    // List batch of users, 1000 at a time.
    admin.auth().listUsers(1000, nextPageToken)
      .then(function(listUsersResult) {
        listUsersResult.users.forEach(function(userRecord) {
          console.log('user', userRecord.toJSON());
        });
        if (listUsersResult.pageToken) {
          // List next batch of users.
          listAllUsers(listUsersResult.pageToken);
        }
      })
      .catch(function(error) {
        console.log('Error listing users:', error);
      });
  }
  // Start listing users from the beginning, 1000 at a time.
//  listAllUsers();


async function grantActiveSubscriptionRole(email) {
    const user = await admin.auth().getUserByEmail(email); // 1
    if (user.customClaims && user.customClaims.activeSubscriptiton === true) {
        return;
    } // 2
    return admin.auth().setCustomUserClaims(user.uid, {
        activeSubscriptiton: true
    }); // 3
}

grantActiveSubscriptionRole('danmincu@gmail.com').then( () =>
 {
        defaultAuth.getUserByEmail("danmincu@gmail.com").then((user)=> {
            console.log(JSON.stringify(user));
        }).then(() => process.exit());
 });