import "dotenv/config";

// Function to get response from OpenRouter API and return the content.
const getOpenRouterAPIResponse = async (messages) => {
  const options = {
    method: "POST",
    // Set up headers and body for the API request
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
    },
    body: JSON.stringify({
      model: "meta-llama/llama-3.1-8b-instruct",
      /* model: "meta-llama/llama-3-8b-instruct:free" */ //This is the totally free one.
      messages: [
        {
          role: "user", // Role of the message sender
          content: messages, // Get the message from the request body
        },
      ],
    }),
  };

  // Make the API request to OpenRouter
  try {
    //fetch() call to OpenRouter API and get the response and send it back to the client.
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      options
    );

    const data = await response.json();
    return data.choices[0].message.content; // Return the response content
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export default getOpenRouterAPIResponse;
