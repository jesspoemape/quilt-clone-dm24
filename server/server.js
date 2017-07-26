const express = require('express'),
     session = require('express-session'),
     bodyParser = require('body-parser'),
     massive = require('massive'),
     passport = require('passport'),
     Auth0Strategy = require('passport-auth0'),
     config = require('./../config'),
     sc = require('./../controllers/setController'),
     cors = require('cors');

const app = module.exports = express();
app.use(cors({origin: 'http://localhost:3000'}));


app.use(bodyParser.json());
app.use(session({
  resave: true, 
  saveUninitialized: true, 
  secret: config.sessionSecret,
  cookie: {maxAge: 24*60*60*1000, secure: false}
}))
app.use(passport.initialize());
app.use(passport.session());

massive(config.connectionString).then(dbInstance => {
    app.set('db', dbInstance)

    passport.use(new Auth0Strategy({
        domain: config.auth0.domain,
        clientID: config.auth0.clientID,
        clientSecret: config.auth0.clientSecret,
        callbackURL: config.auth0.callbackUrl
    },
    function(accessToken, refreshToken, extraParams, profile, done) {
        // make database calls here to check for user
        dbInstance.users.findOne({id: profile.identities[0].user_id}, {columns: ['username', 'id', 'profileimage']}).then(user => {
            if (user) {
                done(null, user);
            } else {
                dbInstance.create_user([profile.identities[0].user_id, (profile._json.screen_name || profile._json.given_name), profile._json.picture]).then( user => {
                    done(null, user).catch(console.error, 'Error');
                });
            };
        });


        // const user = dbInstance.users.findOne({id: profile.identities[0].user_id}, {columns: ['username', 'id', 'profileimage']}).then(userInfo => {
        //     if (userInfo) {
        //         console.log(`welcome, ${userInfo.username}`);
        //     }
        //     else {
        //         dbInstance.users.insert({id: profile.identities[0].user_id, username: profile._json.screen_name || `${profile._json.given_name} ${profile._json.family_name}`, profileimage: profile._json.picture}).then(res => res).catch(console.error, 'Error');
        // }}).catch(console.error, 'Error');

        // done(null, user);
    }
    ));
});


passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});

// =========== ENDPOINTS ===========
// app.get('/api/sets/:id', sc.getSets);
// app.post('/api/sets', sc.addSets);

// for auth
app.get('/auth', passport.authenticate('auth0')); // authenticate the user
app.get('/auth/callback', passport.authenticate('auth0', {successRedirect: 'http://localhost:3000/activity'})); //callback and redirect user
app.get('/auth/me', (req, res) => { // check if someone is logged in 
    if (!req.user) return res.status(200).send('no user');
    res.status(200).send(req.user);
})
app.get('/auth/logout', (req, res) => { // log the user out and destroy the session
    console.log('in server');
    req.logout();
    res.redirect('http://localhost:3000/');
});

// for UI
app.post('/api/add-set/:userid', sc.addSet);
app.get('/api/get-set-info/:id', sc.getSetInfo);
app.get('/api/get-cards/:id', sc.getCards);
app.get('/api/user-info/:id', sc.getUserInfo);
app.delete('/api/delete-own-set/:setid/:userid', sc.deleteOwnSet);
app.post('/api/remove-set/:setid/:userid', sc.removeSet);
app.get('/api/full-search/:search', sc.fullSearch);
app.post('/api/add-to-users-sets/:setid/:userid', sc.addNotOwnSet);

app.listen(3001, () => console.log("Listening on port 3001"));