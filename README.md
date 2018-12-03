## Excellence HR System (```v 2.0.0```)
Upgraded To create-react-app framework

## Getting Started


```bash
$ git clone https://github.com/reactexcel/ReactReduxHR.git
$ cd ReactReduxHR
$ npm install                   # Install project dependencies
```
#### Setup enviornment with any one of the below methods.

1. If you want to run the app on port with development APIs and deploy with live APIs then add two files `.env.development` & `.env.production`. and set the env variables as below.
  ###### .env.development
  ```
  REACT_APP_HOST_ENV=development
  REACT_APP_BASE_URL=development_api_base_url     # i.e. http://dev.hr.excellencetechnologies.in/hr
  ```
  ###### .env.production
  ```
  REACT_APP_HOST_ENV=production
  REACT_APP_BASE_URL=live_api_base_url    # i.e. https://hr.excellencetechnologies.in
  ```

2. if you want to run and build both with the same APIs then just add a `.env` file and set the env variables as below.
 ```
  REACT_APP_HOST_ENV=production
  REACT_APP_BASE_URL=api_base_url     # any either development or production base url
  ```

Enviornment setup is finished. Now run the app with below command

### Running Application
```
$ npm start                # Compile and launch
```
It will launch the browser automatically, but if not,  Then open `http://127.0.0.1:3000` in browser.

### Build project 
Build process will compile and create bundles as per enviornment setup done above. It also optimizes the build for the best performance
It will pick the APIs base url from enviornment variable you defined.

```bash
$ npm run build
```
Now you have the /build folder at project root. You can move the build where ever you want to deploy and run in browser.

### Deploy on development server 
  Follow the steps below to deploy on development server

  1. Commit and push the changes on git repository.
  
  2. Do the ssh login to the dev server in terminal.
  
  3. Remove the existing build in `~/public_html/hr/cra/` directory.
```bash
$ cd ~/public_html/hr/cra/
$ rm -rf *
```

  4. Go to the project directory and build the app
```bash
$ cd ~/public_html/ReactReduxHR
$ git pull origin dev      # take pull from updated branch which you want to deploy (must be CRA framework)
$ npm run build            # Before build make sure is has .env file and base url(`REACT_APP_BASE_URL`) set in it . 
$ mv ./build/*  ~/public_html/hr/cra/   # move the build to the server directory.
```

  It's done !
  You can now run the dev server `http://dev.hr.excellencetechnologies.in/hr/cra/#/` in your browser.

  NOTE: if `ReactReduxHR` not exist, then you have first clone the project and then follow the above steps.


### Run Cypress Tests

```
$ npm run cypress
```

## Application Structure

The application structure presented below is to be strictly followed while developing the application. Functionalities are grouped in to modules based on its features, and routes falls under similar category. The same module structure is to be followed inside **components**, **redux**, **style** which contains related content modulewise.

```
.

├── public                   # Public folder which contains html file for the project
│   ├── favicon.ico          # page favicon
│   ├── index.html           # Project's html file
│   └── manifest.json        # Create-react-app auto generated file
├──cypress                   # Cypress Unit Test files
|   └── integration          # contains .js files that comes in Cypress UI to run tests
├── src                      # Application source code
│   ├── modules              # Reusable Container Components
│   │   └── auth             # Route definitions and async split points
│   │       ├── components   # Presentational React Components related to respactive modules
│   │       └── containers   # The root components for the route comes here
│   ├── components           # Reusable Presentational Components
│   │   └── auth             # Module dir for the dumb components
│   ├── styles               # Application-wide styles (generally settings)
│   │   ├── main.scss        # Imports all scss form the diffrent module wise scss
│   │   └── auth             # Contains scss for the respective modules
│   ├── redux                # Reducers and action for each module inside this dir
│   │   ├── auth             # Container for module wise actions & reducer
│   │   │   ├── actions      # Module wise actions
│   │   │   └── reducers     # Module wise reducer
│   │   ├── actions.js       # Actions are defined here that are being imported to dispatch any api call & response
│   │   ├── constants.js     # Defines constants for the actions
│   │   ├── reducers.js      # Imports all reducers of diffrent modules and combine it
│   │   └── update.js        # Manual commands defined to update the reducers
│   ├── config               # common configuration used in source code
│   ├── static               # Static assets (not imported anywhere in source code)
│   ├── saga.js              # Root of saga middleware
│   ├── store.js             # Create redux store using reducers and meddilwares
│   └── index.js             # Application bootstrap, routes and renderin
├── .env.development         # Set enviornment variable for development
├── .env.production          # Set enviornment variable for production
├── .env                     # Set a common enviornment variable for both development & production  (remove .env.production and .env.development)
├── readmd.md                # Project's package.json file
│
:
```

## Styles

We are using `.scss` to style this application. We emphasize not to use inline as much possible and use class instead. Module structure should be followed to create a `.scss` file for a component.
### example of styles for **auth** module

```
src
├─ styles                    # Application-wide styles (generally settings)
│  ├─ main.scss               # Imports all scss form the diffrent modules (i.e. 'import 'auth/index.scss'')
│  └─ auth                    # Contains scss for the respective modules
│     ├─ index.scss           # Import all scss files for this module (i.e. login.scss, forgotPassword.scss, logout.scss ) │and also define common styles here
│     ├─ login.scss           # Define styles for login container and its successive components
│     ├─ forgotPassword.scss  # Define styles for forgot password container and its successive components
│     └─ logout.scss          # Define styles for logout container and its successive components

```
### example of styles for **auth** module

To add a class to `.scss`, first we create the same module stucture to which we are supposed to write a class.
Lets take example to add some style to login page. If `.scss` for login doesn't exist than we create it `style/auth/login.scss`. Find the location carefully because it defines the relation between `.scss` and your components. Here in example `style` is the directory which contains all `.scss` files. `auth` is the module directory, it contains all `.scss` files for `auth` module. `login.scss` indicates that it contains all styles for login page.

`style/auth/login.scss`

```
/*
  Styles only for container login and its successive components
*/

.logo-container {
  background-color: #284665;
  padding: 30px 40px 30px 40px;
  width: 300px;
  margin-left: 5px;
  border-radius: 6px;
  padding-bottom: 20px;
}
```

`style/auth/forgotPassword.scss`

```
/*
  Styles only for container forgotPassword and its successive components
*/

.btn-flat {
  background: #284665;
}
```

`style/auth/logout.scss`

```
/*
  Styles only for container logout and its successive components
*/
.timeline {
  margin: 0;
  padding: 0;
}
```

module directory also contains one `index.scss` file which imports all `.scss` files for respective module (here `auth` module in example). This `index.scss` file also contains styles that is common to that module.



```
/*
  `style/auth/index.scss`
  Imports .scss files for this module
*/
@import "login";
@import "logout";
@import "forgotPassword";

/*
  Styles common to all container of this modules and its successive components
*/
.input-auth-padding {
  padding: 5px;
}
```
### main.scss

There would be a `main.scss` file which import scss files from all modules. This main.scss file is imported to the project's root file `main.js`. So no need to add any other `scss` file to anywhere in the application but only need to import in `main.scss`.



```
/*
  `style/main.scss`
  Imports index.scss file from the modules
*/
@import "auth/index";
@import "inventory/index";
@import "auth/index";

/*
  style comes here which is common to all modules  
*/
body{
  font-family: "Roboto", "Helvetica Neue", Helvetica, Arial, sans-serif;
}
```

### Error while npm install

```
ERROR in ./~/css-loader!./~/sass-loader!./~/postcss-loader!./src/styles/main.scss
Module build failed: Error: ENOENT: no such file or directory, scandir '/var/www/html/UpworkTest/ReactReduxHR/node_modules/node-sass/vendor'
```  
In case of this error run the `npm rebuild node-sass --force`. 

### Cypress Unit Testing

```
It is to test every page(route) as a user by Automation testing.
run test through UI in default browser.

```
**NOTE:** Every Time a PR is created circleci must pass the test.
