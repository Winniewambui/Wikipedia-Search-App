const url =
  'https://en.wikipedia.org/w/api.php?action=query&list=search&srlimit=20&format=json&origin=*&srsearch=';

const searchForm = document.querySelector('form');
const searchInput = document.querySelector('.input-field');
let resultsList = document.querySelector('.results');

searchForm.addEventListener('submit', handleSubmit);

function handleSubmit(e) {
  e.preventDefault();

  const searchQuery = searchInput.value.trim();

  if(!searchQuery){
    resultsList.innerHTML = 
    `<div class= "error"> please enter a valid search term</div>`;

    return;
  }
  fetchWikipediaData(searchQuery);
}

const fetchWikipediaData = (searchQuery) => {
  fetch(`${url}${searchQuery}`,{
    headers: {
      'Accept': 'application/json'
    }
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const results = data.query.search;
      // console.log(results);

      if(results.length < 1){
        resultsList.innerHTML = 
        `
        <div class="error"> no matching results.Please try again</div>;
        `
        return;
      }
	displaySearchResults(results)
    })
    .catch((err) => {
      console.error(err);
	  alert('Failed to search wikipedia');
    });
}

// const displaySearchResults = ()=>{

// }
// function for displaying results
function displaySearchResults(results){
  const resultHTML = results.map((item)=>{
     const {title, snippet, pageid} = item;
    return`
    <a href=http://en.wikipedia.org/?curid=${pageid} target="_blank">
    <h4>${title}</h4>
    <p>${snippet}</p>
    </a>
    `;
  }).join('');
  resultsList.innerHTML = `<div class="articles">
  ${resultHTML}
</div>`;
}

