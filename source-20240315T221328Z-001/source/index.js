const chatForm = get("form");
const chatInput = get("input");
const chatBox = get("main");

const introText =
  "Hello, I am a medical bot that can help you determine the severity and actions to take reagarding a medical problem.";
const medInfo =
  "Please provide me the following informations regarding your medical situation:Age, Sex, Pre-existing conditions as well as current condition";

appendMessage("bot", introText);
appendMessage("bot", medInfo);

chatForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const text = chatInput.value;
  if (!text) return;

  query({
    inputs:
      "Context: " +
      "You should either Ask me more infos on myself to help diagnose my condition, give recommendations on medications, give a diagnosis, lead me towards the right specialist instead of just doctor if necessary. I want a complete diagnosis so ask questions as much as you want" +
      " " +
      "Question:" +
      text +
      "Answer:",
    // inputs: 'Question:' + text + 'How critical is my condition and whats actions should i take?' + 'Answer:',
    parameters: {
      max_new_tokens: 150,
    },
  }).then((response) => {
    appendMessage("bot", response[0].generated_text);
  });

  appendMessage("user", text);
  chatInput.value = "";
});

function appendMessage(side, text) {
  const bubble = `
    <div class="msg -${side}">
        <div class="bubble">${text}</div>
    </div>`;
  chatBox.insertAdjacentHTML("beforeend", bubble);
  chatBox.scrollTop += 500;
}

// Utils
function get(selector, root = document) {
  return root.querySelector(selector);
}

async function query(data) {
  const response = await fetch(
    "https://xevhza5rhd1jhkq8.us-east-1.aws.endpoints.huggingface.cloud",
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    }
  );
  const result = await response.json();
  return result;
}
