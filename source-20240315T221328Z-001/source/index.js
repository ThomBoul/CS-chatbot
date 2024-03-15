const chatForm = get("form");
const chatInput = get("input");
const chatBox = get("main");

chatForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const text = chatInput.value;
  if (!text) return;

  query({
    inputs: text,
    parameters: {},
  }).then((response) => {
    appendMessage("bot", response[0].generated_text)
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
