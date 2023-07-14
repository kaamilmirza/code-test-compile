const Question = require("../models/question");
const TestCase = require("../models/testCase");
const Solution = require("../models/solution");
const dotenv = require("dotenv");

async function addQuestion(req, res) {
  try {
    const { title, description, difficulty } = req.body;

    const question = new Question({
      title,
      description,
      difficulty,
    });

    await question.save();
    // Send the response with the _id field included
    res.json({ _id: question._id, ...question.toObject() });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function editQuestion(req, res) {
  try {
    const { questionId } = req.params;
    const { title, description, difficulty } = req.body;

    const question = await Question.findByIdAndUpdate(
      questionId,
      { title, description, difficulty },
      { new: true }
    );

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    res.json(question);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function deleteQuestion(req, res) {
  try {
    const { questionId } = req.params;

    const question = await Question.findByIdAndDelete(questionId);

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    res.json({ message: "Question deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function addTestCase(req, res) {
  try {
    const { questionId } = req.params;
    const { input, output } = req.body;

    const testCase = new TestCase({
      question: questionId,
      input,
      output,
    });

    await testCase.save();

    res.json(testCase);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getQuestions(req, res) {
    try {
      const { page, limit } = req.query; // Get the page number and limit from the query parameters
  
      const options = {
        page: parseInt(page, 10) || 1, // Convert the page number to an integer (default to 1 if not provided)
        limit: parseInt(limit, 10) || 10, // Convert the limit to an integer (default to 10 if not provided)
      };
  
      const questions = await Question.paginate({}, options); // Use the paginate method provided by a pagination library (e.g., mongoose-paginate-v2)
  
      res.json(questions);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  
const axios = require("axios");

async function submitSolution(req, res) {
    try {
      const { data } = req.body;
      //get testcases from mongodb 
      const testCases = await TestCase.find({ question: req.params.questionId });
      const expectedOutput = "hello world";

      const accessToken = process.env.SPHERE_ENGINE_ACCESS_TOKEN;
      const endpoint = process.env.SPHERE_ENGINE_ENDPOINT;
  
      // Define request parameters
      const submissionData = {
        source: data,
        compilerId: 116,
        input: "",
        access_token: accessToken,
      };
  
       // Send request to create a new submission
       let response;
  
       try {
          response = await axios.post(
            `https://${endpoint}/api/v4/submissions?access_token=${accessToken}`,
            submissionData
          );
       } catch (error) {
           console.error("An error occurred while creating a new submission:", error);
           return res.status(500).json({ error: "An error occurred" });
       }
  
       // Retrieve the submission ID from the response
       const submissionId = response.data.id;
  
       // Wait for status change from compiling to compiled
       try {
         await waitForCompiledStatus(submissionId, accessToken, endpoint);
         console.log("Compilation completed");
       } catch (error) {
         console.error("An error occurred while waiting for compiled status:", error);
         return res.status(500).json({ error: "An error occurred" });
       }
  
     // Poll for submission results after it is compiled
     let result;
  
     try {
        result = await pollSubmission(submissionId, accessToken, endpoint);
        // console.log(result.generatedOutput);
  
        // Get generated output from URI
        const outputResponse = await axios.get(result.generatedOutput);
        
        // Trim whitespace characters from generated output string 
        const generatedOutput = outputResponse.data.trim();
  
        // console.log(generatedOutput);
        // console.log(expectedOutput);
  
        // Compare the generated output with the expected output
        const isCorrect = generatedOutput === expectedOutput;
  
        // Add the isCorrect field to the result object
        result.isCorrect = isCorrect;
        
     } catch (error) {
       console.error("An error occurred while polling submission:", error);
       return res.status(500).json({ error: "An error occurred" });
     }
  
     // Send success or accepted solution based on comparison
     if (result.isCorrect) {
      return res.json({ message: "Success! Generated output matches expected output.", result });
    } else {
      return res.json({ message: "Accepted solution, but generated output does not match expected output.", result });
    }
      
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      // Send an error response
      return res.status(500).json({ error: "An unexpected error occurred" });
    }
  }

async function waitForCompiledStatus(submissionId, accessToken, endpoint) {
    try {
      let currentStatus;
      do {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        // Get submission status
        currentStatus = await getSubmissionStatus(
          submissionId,
          accessToken,
          endpoint
        );
      } while (currentStatus === "false"); 
  
      return currentStatus; // Return final status after compiling completes
    } catch (error) {
      console.error(
        "An error occurred while waiting for compiled status:",
        error.message
      );
      throw error;
    }
  }

async function getSubmissionStatus(submissionId, accessToken, endpoint) {
  try {
    const response = await axios.get(
      `https://${endpoint}/api/v4/submissions/${submissionId}`,
      { params: { access_token: accessToken } }
    );
    return response.data.executing;
  } catch (error) {
    console.error(
      "An error occurred while getting submission status:",
      error.message
    );
    throw error;
  }
}

async function pollSubmission(submissionId, accessToken, endpoint) {
  try {
    // Retrieve submission data
    const response = await axios.get(
      `https://${endpoint}/api/v4/submissions/${submissionId}`,
      {
        params: { access_token: accessToken },
      }
    );

    // console.log(response.data.result);
    // Extract relevant data from the response
    const result = {
      generatedOutput: response.data.result.streams.output.uri,
    };

    return result;
  } catch (error) {
    console.error("An error occurred while polling submission:", error.message);
    throw error;
  }
}

module.exports = {
  addQuestion,
  editQuestion,
  deleteQuestion,
  addTestCase,
  submitSolution,
  getQuestions,
};
