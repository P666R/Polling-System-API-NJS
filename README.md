# <div align="center">Polling-System-API

## <div align="center" >Submitted as part of an assignment</div>

This is a backend api for creating questions and adding options to a specific question. Options can be voted. Questions, options can be deleted and questions can be viewed with all of their options

</div>

# Tech Stack Used:

### 1. NodeJS

### 2. ExpressJS

### 3. MongoDB

### 4. Mongoose ODM

# Tools:

### 1. Postman

## Deployed API Service : https://ecommerce-react-data.onrender.com

# <div align="center">

[![Netlify Status](https://api.netlify.com/api/v1/badges/fa6cc23e-b705-4b2d-b4d0-32171e3c8b85/deploy-status)](https://app.netlify.com/sites/e-commerce-react-p666r/deploys)

## Hosted Link: https://e-commerce-react-p666r.netlify.app/

</div>
</div>

# <div align="center">

## Polling system Features

- Create questions
- Add options to question
- Delete a question
- Delete an option
- Add vote to an option
- View a question with all of its options

## API Endpoints

| HTTP Verbs | Endpoints                     | Action                                |
| ---------- | ----------------------------- | ------------------------------------- |
| POST       | /questions/create             | To create a question                  |
| POST       | /questions/:id/options/create | To add options to a specific question |
| DELETE     | /questions/:id/delete         | To delete a question                  |
| DELETE     | /options/:id/delete           | To delete an option                   |
| PATCH      | /options/:id/add_vote         | To increase the count of votes        |
| GET        | /questions/:id                | To view a question and its options    |

</div>

</hr>

# Folder Structure:

- 📂 **Polling\-System\-API\-NJS**
  - 📂 **controllers**
    - 📄 [errorController.js](controllers/errorController.js)
    - 📄 [handlerFactory.js](controllers/handlerFactory.js)
    - 📄 [optionController.js](controllers/optionController.js)
    - 📄 [questionController.js](controllers/questionController.js)
  - 📂 **models**
    - 📄 [optionModel.js](models/optionModel.js)
    - 📄 [questionModel.js](models/questionModel.js)
  - 📂 **routes**
    - 📄 [optionRoutes.js](routes/optionRoutes.js)
    - 📄 [questionRoutes.js](routes/questionRoutes.js)
  - 📂 **utils**
    - 📄 [appError.js](utils/appError.js)
    - 📄 [catchAsync.js](utils/catchAsync.js)
  - 📄 [app.js](app.js)
  - 📄 [config.env](config.env)
  - 📄 [README.md](README.md)
  - 📄 [package\-lock.json](package-lock.json)
  - 📄 [package.json](package.json)
  - 📄 [server.js](server.js)

<hr/>

# Installation And Usage:

## To run this project run

- git clone https://github.com/P666R/Polling-System-API-NJS.git

## Go to directory

- cd Polling-System-API-NJS

## Install all dependencies

- npm install to install all the dependencies
- Create an .env file in your project root folder and add your variables

## Run Project

- run npm start
- Connect to the API using Postman on port 8000
