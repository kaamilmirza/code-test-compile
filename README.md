# Coding platform

To make a Coding platform where participants can solve questions for the problems provided, run the questions using the Sphere Engine, and the admin can add, edit or delete the questions.

## Features

- **Question Management:**
  - [x] Create new questions with details such as title, description, and difficulty level.
  - [x] Edit existing questions to update their information.
  - [x] Delete questions that are no longer needed.
  - [x] Retrieve a list of all available questions.

- **Test Case Management:**
  - [x] Add test cases to questions to validate participants' solutions.
  - [x] Edit test cases associated with questions.
  - [x] Delete test cases that need modification or are no longer relevant.

- **Authentication and Authorization:**
  - [x] Sign up functionality to register new participants.
  - [x] Login functionality to authenticate users.
  - [x] Role-based access control to ensure appropriate permissions for specific actions.

- **Code Submission and Evaluation:**
  - [x] Participants can submit their solutions to specific questions.
  - [x] Solutions are evaluated using the Sphere Engine, ensuring accurate assessment of correctness and performance.

- **API Documentation:**
  - [x] Detailed API documentation describing all available endpoints and their functionalities.

- **Infrastructure and Deployment:**
  - [x] Hosted the Node.js server on Vercel for scalability and accessibility.
## Installation

1. Clone the repository.
2. Install the dependencies using the package manager of your choice (npm or yarn).

```shell
npm install
```

or

```shell
yarn install
```

## Configuration

Create a `.env` file in the root directory of the project and add the following environment variables:

```
MONGODB_URI=<your_MongoDB_connection_string>
JWT_SECRET=<your_JWT_secret_key>
SPHERE_ENGINE_ACCESS_TOKEN=<your_Sphere_Engine_access_token>
SPHERE_ENGINE_ENDPOINT=<your_Sphere_Engine_endpoint>
```

## Usage

1. Start the server:

```shell
npm start
```

or

```shell
yarn start
```

2. Access the API endpoints using the base URL: `http://localhost:3000/api`

## API Endpoints

### Authentication

- POST /api/signup
- POST /api/login

### Questions

- POST /api/questions
- PUT /api/questions/:questionId
- GET /api/questions
- DELETE /api/questions/:questionId
- POST /api/questions/:questionId/testcases
- POST /api/questions/:questionId/submit
### Submitting a Solution

To submit a solution for a question, make a POST request to the following endpoint:

```
POST /api/questions/:questionId/submit
```

- Requires authentication: Yes
- Role required: Any authenticated user

Request Body:

```json
{
  "data": "<your_source_code>"
}
```

- Replace `:questionId` in the endpoint with the ID of the question you want to submit the solution for.
- Provide your source code in the `data` field of the request body.

Example:

```shell
curl -X POST -H "Authorization: Bearer <your_token>" -H "Content-Type: application/json" -d '{ "data": "console.log('Hello, World!');" }' http://localhost:3000/api/questions/:questionId/submit
```

Replace `<your_token>` with a valid JWT token for authentication and `:questionId` with the ID of the question.


Refer to the code for detailed endpoint descriptions.

```
Please replace `<your_MongoDB_connection_string>`, `<your_JWT_secret_key>`, `<your_Sphere_Engine_access_token>`, and `<your_Sphere_Engine_endpoint>` with the actual values in your .env file.
```
Feel free to modify the API endpoints and their descriptions as needed.
Note: Please remember to replace `<your_MongoDB_connection_string>`, `<your_JWT_secret_key>`, `<your_Sphere_Engine_access_token>`, and `<your_Sphere_Engine_endpoint>` with the actual values in your `.env` file.

### Reference images 

![image](https://github.com/kaamilmirza/cometlabs-backend/assets/64482251/a379e7ec-e29f-437f-b4f1-dc4d0bc65951)
This screenshots gives a glimpse of what adding questions may look like.
![image](https://github.com/kaamilmirza/cometlabs-backend/assets/64482251/296d36f5-d34c-4760-8cc7-16cc18394fce)
This image shows how login may work creating access token
![image](https://github.com/kaamilmirza/cometlabs-backend/assets/64482251/1488d04e-4f4c-4055-b066-e3ef89b9b4c5)
This image shows how we can add detailed questions it completely scalable
![image](https://github.com/kaamilmirza/cometlabs-backend/assets/64482251/798d8a59-07c2-4a8e-8fe6-8163b92c3485)
This is how we can use pagination to get more data to the user/admin.
![image](https://github.com/kaamilmirza/cometlabs-backend/assets/64482251/fc71f02e-3449-4e19-aec5-736b6a5e3ca4)
Mongo's database.
![image](https://github.com/kaamilmirza/cometlabs-backend/assets/64482251/6da41a87-51da-484c-9859-99d950e2f675)
We can submit and check our solution here
![image](https://github.com/kaamilmirza/cometlabs-backend/assets/64482251/7e615758-69b9-4bbd-bd00-2a0f2ebb2b3c)Here is how we can delete the questions.



