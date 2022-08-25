/* For parsing file input */
const fileInput = document.getElementById('dataset'); 
const warning = document.getElementById('warning_output'); 
var CSVARRAY;

fileInput.addEventListener('change', function() {
  var reader = new FileReader();
  var f = fileInput.files[0];

  warning.textContent = '';

  if (f.type != 'text/csv') {
    warning.textContent += 'Please select a csv file';

  } else {
    reader.onload = function(e) {
      console.log(e.target.result);
      CSVARRAY = parseResult(e.target.result); //this is where the csv array will be
    };
    reader.readAsText(f);
  }
});

function parseResult(result) {
    var resultArray = [];
    result.split("\n").forEach(function(row) {
        var rowArray = [];
        row.split(",").forEach(function(cell) {
            rowArray.push(cell);
        });
        resultArray.push(rowArray);
    });
    return resultArray;
}

const dataTable = document.getElementById("datatable");

function createTable() {
    var array = CSVARRAY;
    var content = "";
    array.forEach(function(row) {
        content += "<tr>";
        row.forEach(function(cell) {
            content += "<td>" + cell + "</td>" ;
        });
        content += "</tr>";
    });
    dataTable.innerHTML = content;
  
    updateNewInquiries();
}

var niNum = 0;
const niContainer = document.getElementsByClassName("flex-child new-inquiries");

function createNewInquiry(text) {
  let newInquiry = document.createElement("button");
  let inquiryPos = document.createElement("p");
  // newInquiry.innerText = "Find average of " + dataTable.rows[0].cells[3].innerHTML;
  newInquiry.innerText = text;
  newInquiry.setAttribute("id", `newInquiry${niNum}`);
  newInquiry.setAttribute("aria-hidden", "false");
  newInquiry.setAttribute("tableindex", "0");
  newInquiry.setAttribute("onclick",`pushToChatbox("newInquiry${niNum}")`);
  niContainer[0].appendChild(inquiryPos);
  niContainer[0].appendChild(newInquiry);
  niNum++;
}

function updateNewInquiries() {
  // clear the default message
  document.getElementById("default-new-inquiry").remove();

  // add new inquiries
  createNewInquiry("Find average of " + dataTable.rows[0].cells[3].innerHTML);
  createNewInquiry("Return the County with the highest Economy score");
  createNewInquiry("Sort by Public Safety ascending");
}

/* For processing messages */
const inputField = document.getElementById("chat_text_input"); 

document.addEventListener("DOMContentLoaded", function() {
  document.querySelector("#chat_text_input").addEventListener("keydown", function(e) {
    if (e.code === "Enter") {
      let input = inputField.value; // store the value
      inputField.value = ""; // clear the text input
      outputEntry(input); // print out the output 
    }
  });
});

function botResponse(input) {
  let text = input.toLowerCase().replace(/[^\w\s\d]/gi, "");

  // if (!input) { //before users pose any questions
  //   return "Below is a summary of the big trends of this dataset:\n1) ...\n2) ....";
  // }
  
  let result = "I'm sorry, I do not understand your question.\nPlease input another question.";

  var keywords = ["summary", "trend", "statistics", "pattern"];
  if (keywords.indexOf(text) != -1) {
    result = "Below is a summary of the big trends of this dataset:\n1) ...\n2) ....";
  }

  if (text.includes("min") || text.includes("minimum") 
    || text.includes("least") || text.includes("smallest")) {
    result = "The smallest value is 9.";
  } 
  if (text.includes("max") || text.includes("maximum") 
    || text.includes("biggest") || text.includes("greatest") || text.includes("largest")) {
    result = "The largest value is 9000.";
  } 

  return result;
}

function botSpeech(input) {
  const speech = new SpeechSynthesisUtterance();
  speech.text = input;
  speech.volume = 1;
  speech.rate = 1;
  speech.pitch = 1;
  window.speechSynthesis.speak(speech);
}

function addUserInput(input) {
  let userDiv = document.createElement("div");
  userDiv.className = "user_message";
  userDiv.innerHTML = `${input}`;
  return userDiv;
}

function addBotInput(input) {
  let botDiv = document.createElement("div");
  let botText = document.createElement("span");
  botDiv.className = "bot_message";
  botText.innerText = botResponse(input);
  botSpeech(botText.innerText);
  botDiv.appendChild(botText);
  return botDiv;
}

function outputEntry(input) {
  const messagesContainer = document.getElementById("chat_body");

  messagesContainer.appendChild(addUserInput(input));
  messagesContainer.appendChild(addBotInput(input));

  messagesContainer.scrollTop =
    messagesContainer.scrollHeight - messagesContainer.clientHeight;
}

function voiceToText() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recorder = new SpeechRecognition();

  recorder.onspeechend = () => {
    recorder.stop();
  }
  
  recorder.onresult = (event) => {
    const resultIndex = event.resultIndex;
    const transcript = event.results[resultIndex][0].transcript;
    inputField.value = transcript;
  }

  recorder.start();
}

//below is Cat's test code for semi-static suggestion buttons

function pushToChatbox(val) {
	inputField.value = document.getElementById(val).innerHTML;
}
