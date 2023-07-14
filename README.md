# CometLabs Backend challenge

To make a Coding platform where participants can solve questions for the problems provided, run the questions using the Sphere Engine, and the admin can add, edit or delete the questions.

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
![image](https://github.com/kaamilmirza/cometlabs-backend/assets/64482251/296d36f5-d34c-4760-8cc7-16cc18394fce)
![image](https://github.com/kaamilmirza/cometlabs-backend/assets/64482251/1488d04e-4f4c-4055-b066-e3ef89b9b4c5)
![image](https://github.com/kaamilmirza/cometlabs-backend/assets/64482251/798d8a59-07c2-4a8e-8fe6-8163b92c3485)
![image](https://github.com/kaamilmirza/cometlabs-backend/assets/64482251/fc71f02e-3449-4e19-aec5-736b6a5e3ca4)
![image](https://github.com/kaamilmirza/cometlabs-backend/assets/64482251/6da41a87-51da-484c-9859-99d950e2f675)
![image](https://github.com/kaamilmirza/cometlabs-backend/assets/64482251/7e615758-69b9-4bbd-bd00-2a0f2ebb2b3c)
![image](https://github.com/kaamilmirza/cometlabs-backend/assets/64482251/8fee5be9-46da-4880-8ce5-163bf96466b0)


