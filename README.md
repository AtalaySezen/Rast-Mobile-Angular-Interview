<a id="readme-top"></a>
<div align="center">
  <h1 align="center">Rast Mobile Angular Interview</h1>
  <p align="center">
    <a href="demolink.com.tr">View Demo</a>
  </p>
</div>
<ol>
  <li>
    <a href="#about-the-project">About The Project</a>
    <ul>
      <li><a href="#built-with">Built With</a></li>
    </ul>
  </li>
  <li>
    <a href="#getting-started">Getting Started</a>
    <ul>
      <li><a href="#prerequisites">Prerequisites</a></li>
    </ul>
    <ul>
      <li><a href="#backend-setup-nodejs">Backend Setup (Node.js)</a></li>
      <li><a href="#frontend-setup-angular">Frontend Setup (Angular)</a></li>
    </ul>
  </li>
  <li>
    <a href="#troubleshooting">Troubleshooting</a>
    <ul>
      <li><a href="#backend-issues">Backend Issues</a></li>
    </ul>
    <ul>
      <li><a href="#frontend-issues">Frontend Issues</a></li>
    </ul>
  </li>
  <li><a href="#frontend-features">Frontend Features</a></li>
  <li><a href="#styles">Styles</a></li>
  <li><a href="#usage">Usage</a></li>
  <li><a href="#frontend-project-structure">Frontend Project Structure</a></li>
  <li><a href="#backend-features">Backend Features</a></li>
  <li><a href="#backend-project-structure">Backend Project Structure</a></li>
</ol>


## About The Project
This project includes a backend built with Node.js and MongoDB, and a frontend developed using Angular 18. Users can manage their social media data, including adding, editing, and deleting entries.
<br>
<br>
User accounts are linked to their own social media data in the database. Upon login, a JWT is generated. If "Remember Me" is selected, the token is stored in localStorage; otherwise, it is saved in sessionStorage.
<br>
<br>
As users navigate the application, the token is sent with each HTTP request and validated by the backend. The frontend uses `auth.guard.ts` to manage authentication, redirecting users to the homepage if the token is invalid.
<br>
<br>
The frontend follows the repository pattern, organizing components, services, pipes, directives, models, and HTTP requests for cleaner code management.
<br>
<br>
<img src="https://github.com/user-attachments/assets/51868986-f325-4892-bf4b-2509482e2fd7">
<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With
* [![Angular][Angular.io]][Angular-url]
* ![JavaScript]
* ![TypeScript]
* [![Node.js][Node.js]][node.js-url]
* [![MongoDB][MongoDB]][MongoDB-url]
* ![ExpressJS]
* ![NodeMon]
* ![JWT]
* SCSS

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

Before you begin, ensure you have the following installed:

Node.js (18.13 or later)
npm (Node.js package manager, included with Node.js)
Angular CLI (for Angular project management)

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
  ```sh
  npm install npm@latest -g
  ```

### Backend Setup (Node.js)

1. Clone the repo
   ```sh
   git clone https://github.com/AtalaySezen/Rast-Mobile-Angular-Interview.git
   cd Rast-Mobile-Angular-Interview
   ```
2. Install Dependencies
   ```sh
   cd backend
   npm install
   ```
3. Configure Environment Variables
Create a .env file in the backend directory and add the following configuration:
   ```sh
   MONGODB_URI=mongodb://localhost:27017/your-database-name
   JWT_SECRET=your-jwt-secret
   ```
4. Start the backend server:
   ```sh
   npm start
   For development you can use npm run dev
   ```
<br>
The Node.js application will be accessible at http://localhost:3000 by default.
   
### Frontend Setup (Angular)

1. Navigate to the Frontend Directory
   ```sh
     cd frontend
    ```
2. Install Dependencies
   ```sh
    npm install
    ```
4. Run the Angular Application
   ```sh
   ng serve
   ```
<br>
The Angular application will be accessible at http://localhost:4200 by default.

## Troubleshooting

### Backend Issues:
- Check the server logs for errors.
- Ensure MongoDB is running.
- Verify that the backend server is running on the correct port. By default, it is set to `http://localhost:3000`. If your backend is running on a different port (e.g., `http://localhost:5000`), make sure to update the port in your Angular project's `src/environments/environment.development.ts` file to match the backend server's port.

### Frontend Issues:
- Check the browser console for errors.
- Ensure the backend server is running.
- Verify that the `apiUrl` in `src/environments/environment.development.ts` matches the backend server's address. If the backend is running on a different port or URL, update it accordingly.
  
<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Issues
If you encounter any problems or issues, please report them by [opening a new issue here](https://github.com/AtalaySezen/Rast-Mobile-Angular-Interview/issues/new).

## Frontend Features
**Interceptor**: 
<br>
Handles HTTP request and response transformations. It allows for centralized handling of HTTP requests, such as adding authentication tokens, logging, and error handling.
<br>
**Loader Management**: In this project, the loader screen is managed through the interceptor.
<br>
Example:
```js
const  authRepo  =  inject(AuthRepository);
const  token  =  authRepo.token;

if (!request.url.includes('auth/login') && !request.url.includes('auth/register')) {
    if (token) {
        loaderService.setLoading(true, request.url);// Show the loader when starting an API request
        request = request.clone({
            setHeaders: { Authorization: `Bearer ${token}` }
        });
    }
} else {
    if (!/^(http|https):/i.test(request.url)) {
        request = request.clone({
            url: environment.apiUrl + request.url,
        });
    }
}
}
```
**Repository Pattern** : 
<br>
Contains database operations and data access logic. It performs HTTP requests through this class to retrieve, update, add, and delete data.
<br>
Example:
```js
    DeleteSocialMediaData(id: string) {
        this.DataService.DeleteSocialMedia(id).subscribe({
            next: (data: General<SocialMediaModel>) => {
                if (data.status == 'success') {
                    this.toastrService.show(data.message, ToastType.Success);
                    this.currentPage = 1;
                    this.GetSocialMediaDatas();
                } else {
                    this.toastrService.show(data.message, ToastType.Error);
                }
            },
            error: (err) => {
                console.error(err);
                this.toastrService.show(err.message, ToastType.Error);
            }
        })
    }
```
<br />

**Services** : 
<br>
Services manage business logic and data access in Angular applications. They handle HTTP requests, manage data, and provide reusable functionality across components. Services are used to centralize data management and application logic, making the code more organized and maintainable.
<br>
Example:
```js
GetSocialMedias():Observable<General<SocialMediaData>> {
return this.http.get<General<SocialMediaData>>(environment.apiUrl  +  'socialMedia');
}
```
<br>

**Pipes** : 
<br>
Transform data in Angular templates. They allow you to format, filter, and modify data for display purposes. 
<br>
Example:
```js
transform(value:  string):  string {
if (!value) return  value;
return value.toLowerCase().split(' ').map(word  =>  word.charAt(0).toUpperCase() +  word.slice(1)).join(' ');
}
```
This application includes two custom pipes:
<br>
-   **`TitleCasePipe`**: Transforms text to title case, where the first letter of each word is capitalized.
-   **`DateAgoPipe`**: Formats dates into a relative "time ago" format, providing a human-readable description of the time elapsed since a given date.

Example Usage:
```sh
	<td class="table-data">{{  row.name|titleCase}}</td>
	<p class="text-accordion-time">{{item.date|dateAgo}}</p>
}
```
<br>

**Directives** : 
<br>
In Angular, **directives** are used to extend HTML with custom behavior. They manipulate the DOM and provide additional functionality to HTML elements and components.
<br>

This application includes a custom directive:

**`TooltipDirective`**: Provides tooltip functionality for elements. When a user hovers over an element, the directive displays a tooltip with custom text.
<br>
Example Usage:
```sh
<button appTooltip="Düzenle" (click)="editSocialMediaData(row._id)">
<div class="icon-edit"></div>
</button>
```
**Resolvers** : 
<br>
In Angular, **resolvers** are used to pre-fetch data before navigating to a route. They help ensure that the required data is available when a route is activated, improving the user experience by preventing delays or loading states when the route is displayed.
<br>

Example:
```js
resolve(route:  ActivatedRouteSnapshot):  Observable<any> {
return this.dataService.GetSocialMediaWithID(route.paramMap.get('id')!).pipe(
catchError((error) => {console.log(error)
this.toastrService.show('Hata Oluştu', ToastType.Error);
this.router.navigate(['/home']);
return  of(null);
}));}
```
Example Usage:
```js
{path:'edit/:id',resolve: { socialMediaEdit:  socialMediaResolver},
component:SocialMediaEditComponent,title:"Düzenleme",canActivate: [authGuard]}}
```

## Styles:
<br>
**Responsive Design:** Adapts to various screen sizes for optimal viewing on any device.
<br />
**Modular SCSS:** Organized SCSS files for easy maintenance and scalability.
<br>
**Icon Support:** Built-in mixins for various icon sizes.
<br>
<br>

**Typography**

The `typography.scss` file contains mixins for different text styles. 
Example:
```scss

@mixin header-font {
    @include font-roboto();
    font-size: 18px;
    font-weight: 500;
    line-height: 21px;
    color: $white-color;
    
    @media (max-width: 900px) {
        font-size: 13px;
    }
```
<br />

**Variables**
<br />
Define your color scheme in variables.scss for easy theme customization:

Example:
```scss
$mainHeader: #7545ff;
$bodyBackground: #f3f3f3;
$card-background: #ffffff;
```

**Icons**
<br />
Use the mixins in icons.scss to add icons to your project.

Example:
```scss
  @mixin icon {
    background-repeat: no-repeat;
    background-size: cover;
    width: 24px;
    height: 24px;
}

@mixin icon-xl {
    background-repeat: no-repeat;
    background-size: cover;
    width: 32px;
    height: 32px;
}

Example Usage
.example-icon {
    @include icon;
    background-image: url('path/to/icon.svg');
}
```
## Usage

1. **Login and Register Pages**:
   - **Login**: Users can log in using their credentials on the Login page.
   - **Register**: New users can create an account on the Register page.

2. **Home Page**:
   - The Home page is the main interface users are directed to after logging in.

3. **Data Table**:
   - **View Data**: Displays a table of social media data.
   - **Add New User**: Click the "Add New User" button in the top right corner to add a new user to the table.
   - **Edit**: Use the "Edit" button to modify existing entries in the table.
   - **Delete**: Remove entries using the "Delete" button.

4. **Visited Links Component**:
   - Located at the bottom left of the screen, this component shows a list of recently visited links.
   - The component can be closed by clicking the "x" button.

These features provide a comprehensive interface for managing user data and viewing recent activity within the application.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Frontend Project Structure

```scss
/frontend
│
├── .angular                   # Angular CLI configuration files
├── public                     # Static files served by the application
├── src                        # Source code
│   ├── /app                   # Core application folder
│   │   ├── /pages             # Page components
│   │   │   ├── /about-us      # About Us page
│   │   │   ├── /home          # Home page
│   │   │   ├── /login         # Login page
│   │   │   ├── /register      # Register page
│   │   │   └── /social-media-edit # Social Media Edit page
│   │   ├── /shared            # Shared components, directives, pipes
│   │   │   ├── /components    # Reusable UI components
│   │   │   │   ├── /dialog
│   │   │   │   ├── /header
│   │   │   │   ├── /not-found-message
│   │   │   │   ├── /pagination
│   │   │   │   ├── /table
│   │   │   │   ├── /toastr
│   │   │   │   └── /visited-links
│   │   │   ├── /directives     # Custom directives
│   │   │   │   └── tooltip.directive.ts
│   │   │   ├── /models         # TypeScript interfaces and models
│   │   │   │   ├── auth.model.ts
│   │   │   │   ├── generals.model.ts
│   │   │   │   └── socialMedia.model.ts
│   │   │   ├── /pipes          # Custom pipes
│   │   │   │   ├── date-ago.pipe.ts
│   │   │   │   └── titlecase.pipe.ts
│   │   │   ├── /repositories    # Data repositories
│   │   │   │   ├── auth.repository.ts
│   │   │   │   ├── edit.repository.ts
│   │   │   │   └── home.repository.ts
│   │   │   ├── /resolvers       # Route resolvers
│   │   │   │   └── social-media.resolver.ts
│   │   │   ├── /services        # Service
│   │   │   │   ├── auth.service.ts
│   │   │   │   ├── data.service.ts
│   │   │   │   ├── loader.service.ts
│   │   │   │   └── toastr.service.ts
│   │   ├── app.component.html   # Main app component template
│   │   ├── app.component.scss   # Main app component styles
│   │   ├── app.component.spec.ts # Main app component unit tests
│   │   ├── app.component.ts     # Main app component TypeScript
│   │   ├── app.config.ts        # App configuration settings
│   │   └── app.routes.ts        # Application routing
│   ├── /environments            # Environment-specific configuration
│   │   ├── environment.development.ts # Development environment settings
│   │   └── environment.ts       # Default environment settings
│   ├── /styles                  # Global styles
│   │   ├── /components          # Component-specific styles
│   │   │   └── button.scss      # Styles for button component
│   │   ├── _var.scss            # Variables
│   │   ├── icons.scss           # Icon styles
│   │   ├── tooltip.directive.scss # Tooltip directive styles
│   │   ├── typography.scss      # Typography styles
│   │   └── utils.scss           # Utility styles
├── .editorconfig                # Editor configuration
├── .gitignore                   # Git ignore file
├── angular.json                 # Angular CLI configuration
├── package-lock.json            # Lock file for npm dependencies
├── package.json                 # Project dependencies and scripts
├── tsconfig.app.json            # TypeScript configuration for the application
├── tsconfig.json                # Base TypeScript configuration
└── tsconfig.spec.json           # TypeScript configuration for tests
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Backend Features

- **Express Framework**: Utilizes Express.js for routing and middleware management.
- **CORS Support**: Configured CORS to handle cross-origin requests.
- **MongoDB Connection**: Integrated MongoDB for database operations.
- **User Authentication**: User registration and login with JWT-based authentication.
- **Authorization Middleware**: Secures routes with JWT authentication middleware.
- **CRUD Operations**: Implements Create, Read, Update, and Delete operations for social media entities.
- **Data Validation**: Validates user inputs and data for social media entities.
- **Error Handling**: Centralized error handling for consistent API responses.
- **Token Validation**: Endpoint to verify if a JWT token is valid.
- **Environment Variables**: Manages configuration with environment variables using `dotenv`.

## Backend Project Structure
```scss
backend/
│
├── config/
│   └── db.json               # Configuration for database connection
│
├── middleware/
│   └── authMiddleware.js     # Middleware for JWT authentication
│
├── models/
│   ├── SocialMedia.js        # Mongoose model for social media data
│   └── User.js               # Mongoose model for user data
│
├── routes/
│   ├── auth.js               # Routes for user authentication (register, login)
│   ├── socialMedia.js        # Routes for managing social media records
│   └── token.js              # Routes for token validation
│
├── .gitignore                # Specifies files and directories to be ignored by Git
├── package.json              # Project metadata and dependencies
├── package-lock.json         # Exact versions of project dependencies
└── server.js                 # Main entry point for the application

```
<!-- IMAGES -->
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Node.js]:https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white
[JavaScript]:https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E
[JWT]:https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens
[ExpressJS]:https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB
[NodeMon]:https://img.shields.io/badge/NODEMON-%23323330.svg?style=for-the-badge&logo=nodemon&logoColor=%BBDEAD
[TypeScript]:https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white
[MongoDB]:https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white
[MongoDB-url]:https://www.mongodb.com/docs/
[Node.js-url]:https://nodejs.org/en
