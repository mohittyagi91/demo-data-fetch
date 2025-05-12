import ollama from "ollama";

// app/api/post-data/route.js
export async function POST() {
  try {
    const getResponse = await fetch('http://localhost:3000/api/user/SrBachchan');  // Update the URL if deployed
    
    // Check if the GET request was successful
    if (!getResponse.ok) {
      return new Response('Error calling GET API', { status: getResponse.status });
    }

    const getData = await getResponse.json();
    console.log("response",`summerize ${JSON.stringify(getData)}`)

    const response = await ollama.chat({
      model: "gemma3:1b",
      messages: [{ role: "user", content: "summerize twitter profile data "+`${JSON.stringify(getData)}`} ],
    });
    return new Response(
      JSON.stringify({
        message: response.message.content,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in POST route:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
