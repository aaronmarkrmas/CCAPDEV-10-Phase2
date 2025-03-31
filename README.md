**Bloemen Bites**
Bloemen Bites is a site where users can explore various restaurants, read comments, and check ratings from other customers. It serves as a helpful guide for finding the best dining experiences.

**Setup and Installation**
The web application was built using Node.js with Express.js as the backend framework and MongoDB as the database. We structured the project using the MVC (Model-View-Controller) pattern, organizing models in the model/ folder, controllers in controller/, and EJS views in view/. The routes/ directory handles all API endpoints, while public/ stores static assets like CSS and images. We installed Mongoose for database interactions, Multer for file uploads, bcryptjs for password hashing, express-session for authentication, and dotenv to manage environment variables. The frontend uses EJS for templating, allowing dynamic content rendering. Our database schema follows an embedded model, where reviews are stored inside customer documents. The application runs with npm start, and nodemon is used in development for auto-restarting the server.

**Technology Stack**
-Node.js
-MongoDB
-Express
-EJS
-Mongoose
-Multer
-brypt
-dotenv
-Deployed using Render
  - The site was deployed with the following build command and necessary permissions:
    npm install -g node-pre-gyp && npm install --legacy-peer-deps --unsafe-perm=true && npm rebuild bcrypt --build-from-source

**Accessing the Deployed Version**
You can visit the live version of Bloemen Bites at: (https://bloemen-bites.onrender.com/)

Enjoy exploring and finding the best places to eat!

