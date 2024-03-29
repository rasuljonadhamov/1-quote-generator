const quoteContainer = document.getElementById("quote__container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const newQuoteBtn = document.getElementById("new__quote");
const twetterBtn = document.getElementById("twitter");
const loader = document.getElementById("loader");

let apiQuotes = [];

// Show new quote

function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function completed() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

function newQuote() {
  loading();
  // Pic rundom quote
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  if (quote.text.length > 80) {
    quoteText.classList.add("long__quote");
  } else {
    quoteText.classList.remove("long__quote");
  }

  if (!quote.author) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quote.author;
  }

  quoteText.textContent = quote.text;
  completed();
}

// LOAD QUOTES
async function getQuotes() {
  loading();
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (err) {
    console.log(err);
  }
}

// Tweet on Tweeter

function tweetQuote() {
  const tweetUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(tweetUrl, "_blank");
}

// Event Listeners

newQuoteBtn.addEventListener("click", newQuote);
twetterBtn.addEventListener("click", tweetQuote);

// On Load
getQuotes();
