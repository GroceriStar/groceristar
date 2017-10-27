# GroceriStar 

A tutorial for setting up a basic passport example.
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/76fe5b42fcc04691a06381ed1d26171b)](https://www.codacy.com/app/atherdon/loopback-fb-login?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=atherdon/loopback-fb-login&amp;utm_campaign=Badge_Grade)

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Client ids/secrets from third party](#client-idssecrets-from-third-party)
- [Tutorial - Facebook](#tutorial---facebook)

https://sentry-brand.storage.googleapis.com/sentry-logo-black.png
## Overview
This project is basically clone from Loopback Passport Example.
LoopBack example for [loopback-passport](https://github.com/strongloop/loopback-passport) module. It demonstrates how to use
LoopBack's user/userIdentity/userCredential models and [passport](http://passportjs.org) to interact with other auth providers.

- Log in or sign up to LoopBack using third party providers (aka social logins)
- Link third party accounts with a LoopBack user (for example, a LoopBack user can have associated facebook).



## Prerequisites

Before starting this tutorial, make sure you have the following installed:

- Node
- NPM
- [StrongLoop Controller](https://github.com/strongloop/strongloop)

## Client ids/secrets from third party
You can create your own app here
- [facebook](https://developers.facebook.com/apps)



## Tutorial - Facebook

### 1. Clone the application

```
$ git clone git@github.com:strongloop/loopback-example-passport.git
$ cd loopback-example-passport
$ npm install
```

### 2. Get your client ids/secrets from third party(social logins)


## Facebook authorization on local machine
- register a developer account on developers.facebook.com
- Settings - Site URL - http://localhost:3000/
- Facebook Login - Valid OAuth redirect URIs - http://localhost:3000/
- providers.json : replace "clientID" "clientSecret" in "facebook-link" "facebook-login" with yours in settings

error: Can't Load URL: The domain of this URL isn't included in the app's domains.
Fixed: Facebook Login - Client OAuth Settings - Use Strict Mode for Redirect URIs - No

or 
- To get your app info: [facebook](https://developers.facebook.com/apps)
- Click on My Apps, then on Add a new App
- Pick the platform [iOS, Android, Facebook Canvas, Website]
- Select proper category for your app.
- Write your app name and "Site URL".
- Skip the quick start to get your "App ID" and "App Secret", which is in "Settings"
- Your app may not work if the settings are missing a contact email and/or "Site URL".
- if you are testing locally, you can simply use `localhost:[port#]` as your "Site URL".



### 3. Create providers.json

- Copy providers.json.template to providers.json
- Update providers.json with your own values for `clientID/clientSecret`.

  ```
  "facebook-login": {
    "provider": "facebook",
    "module": "passport-facebook",
    "clientID": "xxxxxxxxxxxxxxx",
    "clientSecret": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "callbackURL": "/auth/facebook/callback",
    "authPath": "/auth/facebook",
    "callbackPath": "/auth/facebook/callback",
    "successRedirect": "/auth/account",
    "failureRedirect": "/login",
    "scope": ["email"],
    "failureFlash": true
  },
  "facebook-link": {
    "provider": "facebook",
    "module": "passport-facebook",
    "clientID": "xxxxxxxxxxxxxxx",
    "clientSecret": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "callbackURL": "/link/facebook/callback",
    "authPath": "/link/facebook",
    "callbackPath": "/link/facebook/callback",
    "successRedirect": "/auth/account",
    "failureRedirect": "/login",
    "scope": ["email", "user_likes"],
    "link": true,
    "failureFlash": true
  }
  ```

### 4. Facebook profile info

In a recent update, Facebook no longer returns all fields by default (email, gender, timezone, etc).
If you need more information, modify the providers template.

The current template contains:
```
"profileFields": ["gender", "link", "locale", "name", "timezone", "verified", "email", "updated_time"],

```
We recommend modifying the fields to suit your needs. For more information regarding the providers template, see http://loopback.io/doc/en/lb2/Configuring-providers.json.html.


### 5. How to setup project on local machine
- Fork the repo
- `npm init` 
- `npm run watch` 
**If you got an issue**
error: "async function something(next) {
^^^^^^^^
SyntaxError: Unexpected token function"
**reason**: node version is not updated. Fixed by re-install updated node and npm.
### Why
Async functions are not supported by Node versions older than version 7.6

At package.json we specified:  node v.8.1.4



### 6. Run the application

```
$ node .
```

or 

```
$ npm run watch
```


- Open your browser to `http://localhost:3000`
- Click on 'Login with Facebook'.



[More LoopBack examples](https://loopback.io/doc/en/lb3/Tutorials-and-examples.html)

:todo move credits to a separate file

## Credits 

### Where we get template data.
Ingredients and departments data, was exported from 
[The Ultimatest Grocery Lists from grocerylists.org](www.grocerylists.org/ultimatest/)
Author of this website(Bill Keaggy) write a cool book "Milk Eggs Vodka: Grocery Lists Lost and Found"
You can purchase [it from Amazon: ](https://www.amazon.com/Milk-Eggs-Vodka-Grocery-Lists/dp/144031201X/)

Build with Loopback 
[The Node.js API Framework](https://loopback.io/)

Ingredients list template based on 
[TodoMVC](https://todomvc.com)


### Free to use fronted tools
[Icons from Font Awesome](http://fontawesome.io)
[Icons from 7 Stroke](http://themes-pixeden.com/font-demos/7-stroke/)
[Google Fonts](https://fonts.google.com/specimen/Roboto)
[Dropdown list from Codrops tutorial](https://tympanus.net/codrops/2014/07/10/inspiration-for-custom-select-elements/)



[Landing page prototype was build with Launchaco ](http://launchaco.com/build/)   
