/* For parsing file input */
const fileInput = document.getElementById('dataset'); 
const warning = document.getElementById('warning_output'); 
var CSVARRAY;
var content = "";

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
var createdTable = false;

function createTable() {
    var array = CSVARRAY;
    array.forEach(function(row) {
        content += "<tr>";
        row.forEach(function(cell) {
            content += "<td>" + cell + "</td>" ;
        });
        content += "</tr>";
    });
    dataTable.innerHTML = content;

    createdTable = true;
    if (createdTable) {
      updateNewInquiries();
      document.getElementById("default-blank-table").remove();
    }
}

function onOpen() {
  if (content == "") {
    botSpeech("Please upload a dataset first."); 
    return;
  } else {
    const popup = window.open();
    var html = "<!DOCTYPE html><html lang='en'><head><meta charset='UTF-8'><meta name='viewport' content='width=device-width, initial-scale=1.0'><meta http-equiv='X-UA-Compatible' content='ie=edge'><title>Datatable</title><style>table, th, td {border: 1px solid black;border-collapse: collapse;}</style></head><body><div class='main'><table id='datatable' aria-hidden ='false' tabindex = 3>" + content + "</table></div><script src='./query_scripts.js'></script></body></html>";
    popup.document.body.innerHTML = html;
  }
}

var niNum = 0;
const niContainer = document.getElementsByClassName("flex-child new-inquiries");

function createNewInquiry(text) {
  let newInquiry = document.createElement("button");
  let inquiryPos = document.createElement("p");
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
      replaceQueryRecommendation(input);
    }
  });
});

function replaceQueryRecommendation(val) {
  var buttons = document.querySelectorAll("button");
  for (var i = 0;i<buttons.length;i++) {
    if (buttons[i].innerHTML == val) {
      buttons[i].remove();
      var randomCol = Math.floor(Math.random() * dataTable.rows[0].cells.length);
      createNewInquiry("Find maximum in " + dataTable.rows[0].cells[randomCol].innerHTML);
    }
  }
}

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

const speech = new SpeechSynthesisUtterance();

function botSpeech(input) {
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
