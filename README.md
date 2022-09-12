<h1 align="center">NodeShop - Multi-Page Version - A Node.js-inspired online shop, built with Node.js (Express.js).</h1>
<p align="center">
  <img src="images/android-chrome-512x512.png" alt="NodeShop-logo" width="120px" height="120px"/>
  <br>
  <i>This website is an example/demonstration of the sort of online shops that can be built 
    <br>with Node.js backends configured for traditional page serving (multiple HTML pages, templating engines such as EJS).</i>
  <br>
</p>

<p align="center">
  <a href="https://nodeshop-br-ejs.herokuapp.com"><strong>https://nodeshop-br-ejs.herokuapp.com</strong></a>
  <br>
</p>




## Introduction

![NodeShop](snapshot/NodeShop1.png)


![NodeShop](snapshot/NodeShop2.png)

A Multi-Page Application (multiple HTML files, page reloads) built without any JavaScript frontend framework (Angular, ReactJS, Vue.js). The site's design, hexagon-inspired, was based on [Node.js's logo](https://nodejs.org/static/images/logos/nodejs-new-pantone-black.svg). Flexbox and media queries were used for the responsive design (attempting to cater to multiple device types, both desktop and mobile, with different resolutions). The app was also "translated" to a Single-Page, ReactJS version, which can be found [here](https://github.com/nothingnothings/NodeShopRestAPI).

For deployment, the chosen platform was Heroku, with its dynamic backend hosting capabilities (Node.js, Python, PHP, Go).

The backend of the app, as its name suggests, utilizes Node.js (with the Express.js framework). The serverside code can be found on the `master` branch.


 
## Technologies 
 
 Some of the Languages and Libraries employed:
 
 - Node Package Manager (for bootstrapping and managing the Node.js/Express.js serverside App)
 - Node.js
 - Express.js
 - EJS (templating engine used to dynamically serve the HTML/.ejs/view files to the user)
 - MVC (Model-View-Controller) approach (view-serving)
 - HTML5 
 - CSS3 (animations, Flexbox, media queries)
 - Vanilla JavaScript
 - Bootstrap (mainly for parts of the Footer component)
 - Heroku (dynamic backend hosting solution)
 - MongoDB (noSQL database storage solution; storage of user, product and order objects into collections in a remote MongoDB Atlas database)
 - Font Awesome
 
 
## Project Directory Structure


```
.\
│
├── config\
│   ├── keys.js
│   └── prod.js
│
├── controllers\
│   ├── admin.js
│   ├── auth.js
│   ├── error.js
│   └── shop.js
│
├── faturas\
│   ├── fatura-62e04d5c7ae0d991d83b1323.pdf
│   ├── fatura-62e18ad75511c94e87929855.pdf
│   ├── fatura-62e1a06e5511c94e87929fa4.pdf
│   ├── fatura-62e1a1e05511c94e8792a071.pdf
│   ├── fatura-62eb1fa9e4c7306961ced46b.pdf
│   ├── fatura-62fd18d0d5b3ded6079d3e0d.pdf
│   └── fatura-62fd9b7a3ff693a3cac15ac0.pdf
│
├── images\
│   ├── 1658431838529-Bike.png
│   ├── 1658432590831-Boat.png
│   ├── 1658433107407-Pencil.png
│   ├── 1658433305838-Skateboard.png
│   ├── 1658433495040-keyboard.png
│   ├── 1658434189280-A set of tires.png
│   ├── 1658434649972-Boomerang.png
│   ├── 1658435067043-Drums.png
│   ├── 1658435608982-Violin.png
│   ├── NodeShopBlack.png
│   ├── android-chrome-192x192.png
│   ├── android-chrome-512x512.png
│   ├── apple-touch-icon.png
│   ├── browserconfig.xml
│   ├── favicon-16x16.png
│   ├── favicon-32x32.png
│   ├── favicon.ico
│   ├── mstile-150x150.png
│   └── site.webmanifest
│
├── middleware\
│   └── isAuth.js
│
├── models\
│   ├── order.js
│   ├── product.js
│   └── user.js
│
├── public\
│   │
│   ├── css\
│   │   ├── auth.css
│   │   ├── cart.css
│   │   ├── edit-product.css
│   │   ├── footer.css
│   │   ├── index.css
│   │   ├── main.css
│   │   ├── orders.css
│   │   └── product.css
│   │
│   └── js\
│       ├── admin.js
│       ├── forms.js
│       └── main.js
│
│
├── routes\
│   ├── admin.js
│   ├── auth.js
│   └── shop.js
│
├── snapshot\
│   ├── NodeShop1.png
│   └── NodeShop2.png
│
├── util\
│   └── path.js
│
├── views\
│   │
│   ├── admin\
│   │   ├── edit-product.ejs
│   │   └── product-list-admin.ejs
│   │
│   ├── auth\
│   │   ├── login.ejs
│   │   └── signup.ejs
│   │
│   ├── includes\
│   │   ├── end.ejs
│   │   ├── footer.ejs
│   │   ├── head.ejs
│   │   ├── navigation.ejs
│   │   └── pagination.ejs
│   │
│   ├── shop\
│   │   ├── cart.ejs
│   │   ├── checkout.ejs
│   │   ├── index.ejs
│   │   ├── orders.ejs
│   │   ├── product-detail.ejs
│   │   └── product-list.ejs
│   │
│   ├── 404.ejs
│   └── 500.ejs
│
├── .gitignore
├── Procfile
├── README.md
├── app.js
├── package-lock.json
└── package.json

```



## Project Configuration Files (package.json)

The package.json file used in the project:

```
{
  "name": "nodeshop-ejs",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node app.js"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "font-awesome": "^4.7.0"
  },
  "dependencies": {
    "bcryptjs": "^2.4.3",
    "body-parser": "^1.19.0",
    "connect-flash": "^0.1.1",
    "connect-mongodb-session": "^3.1.1",
    "csurf": "^1.11.0",
    "ejs": "^3.1.6",
    "express": "^4.17.1",
    "express-session": "^1.17.2",
    "express-validator": "^6.13.0",
    "mongodb": "^4.1.3",
    "mongoose": "^6.0.12",
    "multer": "^1.4.3",
    "pdfkit": "^0.13.0",
    "stripe": "^8.191.0"
  }
}
```

## Setup 


To use this project, clone it using Git:

1. Run `git clone` to clone the project into your local Git repository
2. Run `npm install` to install all dependencies (`express`, `express-session`, `express-validator`,`bcryptjs`, `body-parser`, `mongodb`)
3. Run `npm start` to spin up the node app
4. Serve the production files locally (with packages like `nodemon`) or on the web, with the help of a hosting provider 
5. For the purposes of this demo, on the "Get Started" (Authentication) page, input the credentials `exemplo@exemplo.com` (email) and `exemplo` (password) to access the apps's various features


## Features 

- Multi-Page Application, page reloads, multiple views handled by the EJS templating engine.
- Hexagon-inspired design, created with CSS
- CSS-animated SVG logo on landing page
- Responsive design (adaptive, mobile and desktop support) created with Flexbox and media queries
- Usage of GitHub with Heroku. Upon the git push command, GitHub transfers the contents of the master branch into the Heroku project,  which then deploys the app at https://nodeshop-br-ejs.herokuapp.com.
- For deployment demonstration purposes, only a single user is enabled/created on the serverside, with the credentials `exemplo@exemplo.com` (email field) and `exemplo` (password field). Creation of additional users (the "Sign Up" page) is possible in the complete app (in this demo app, the account creation endpoints are disabled). Furthermore, the "Orders" made by the user are reset every 60 minutes (MongoDB "Time to Live Index" feature), and the products added to the "Cart", every 8 hours (MongoDB "Scheduled Trigger" feature)
- Communication of the served HTML pages with the Node.js (Express.js) backend, which manages the "User", "Product", "Order" and "Cart" objects, stored on a MongoDB database (MongoDB Atlas service); the Node.js server and MongoDB database also handle the authentication logic (login/signup) implemented on the app
- Working "Shopping Cart" feature ("Add" and "Remove" products feature, with interactive "number of items" icon, implemented by the integration of the backend with the frontend, `res.render()` calls), created as a subdocument of the `user` objects stored in the mongoDB database
- Simple pagination logic for the list of products
- Simple authentication logic, implemented with "express-session" (session-based authentication), "bcryptjs" and "connect-mongodb-session" (storage of sessions on noSQL database)
- Dummy representation of the possible integration of shop apps with Stripe
- Viewing of each order's invoices/faturas in .pdf files, produced by the backend (`pdfkit` package)
- Form validation logic with vanilla JavaScript
- Traditional form submission approach ("button" element inside of a "form"; login data sent to `/login` endpoint on backend) and serverside "email" and "password" field validation (`express-validator` package, methods such as "isEmail()" and "isAlphanumeric()")


## Inspiration

This app was based on the applications seen on the "NodeJS - The Complete Guide (MVC, REST APIs, GraphQL, Deno)" course by Maximilian Schwarzmüller.
