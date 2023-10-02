# Task Management System

[Loom Video Link](https://www.loom.com/share/df013bdf52dc4382ba9a64dd5e358c9a?sid=4a33ecb4-2177-42b1-98ee-40e32672296f)

## Prerequisites

List any software and tools that need to be installed before running your
project, such as .NET SDK, Node.js, PostgreSQL , and npm.

- [.NET SDK](https://dotnet.microsoft.com/download)
- [Node.js](https://nodejs.org/en/download/)
- [npm](https://www.npmjs.com/get-npm)
- [PostgreSQL](https://www.postgresql.org/download/)

## Getting Started

### Installation

1. Clone the repo

   `git clone git@github.com:david-dev12/taskmanagement.git`

2. Navigate to the server project directory

   `cd taskmanagement/webapi`

3. Restore the .NET dependencies

   `dotnet restore`

4. Adding an Entity Framework Core migration

   `dotnet tool install --global dotnet-ef`

   `dotnet ef migrations add InitialCreate`

   `dotnet ef database update`

5. Navigate to the client project directory

   `cd ../reactapp`

6. Install NPM packages

   `npm install`

7. Change appsetting.json

   - Change database config

     `"DefaultConnection": "Host=localhost;Database=taskManagement;Username=postgres;Password=123456"`

   - Change jwt key

     "Key": "ThisIsASecretKey",

     "Issuer": "YourIssuer"

### Running the Application

1. Start the server from the server project directory

   `dotnet run`

2. Start the client from the client project directory

   `npm start`
