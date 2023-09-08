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

// 	resultsList.innerHTML = '';

// //The search property is where the search results are placed,
// //to access that array of objects nested inside the query use results.query.search.
// 	results.query.search.forEach(result =>{
// 		const url = `https://en.wikipedia.org/?curid=${result.pageid}`;
		
// 		resultsList.insertAdjacentHTML(
// 			'beforeend',
// 			`<article class="result-item">
//         <h3 class="result-title">
//           <a href="${url}" target="_blank" rel="noopener">${result.title}</a>
//         </h3>
//         <span class="result-snippet">${result.snippet}</span><br>
//       </article>`
// 		)
	
// 	})

// }
// let resultsList =  document.querySelector('results');
// let searchForm =  document.querySelector('form');
// let searchInput =  document.querySelector('.input-field');


// searchForm.addEventListener('submit', (e)=> {
// 	e.preventDefault();
// 	const userInput = searchInput.value;
// 	displaySearchResults(userInput);
// })


// function displaySearchResults(userInput){
	
	// let url = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${userInput}`;
// 	console.log(url);
	
// 	fetch(url, {
// 		headers:{
// 			'Accept': 'application/json'
// 		}
// 	}).then((response) => {
// 		return response.json();
//   		})
//   		.then((data) =>{
//   			let resultsArray = data.query.search;
//   			resultsOnPage(resultsArray);
//   		})
//   		.catch(function () {
//    			console.log('An error occured');
// 		});
// }


// function resultsOnPage(myArray){

// 	resultsList.innerHTML = " ";
// 	resultsList.insertAdjacentHTML('beforeend', `<h2>Search Results for ${userInput} </h2>`);


// 	myArray.forEach(function(item){
// 		let itemTitle = item.title;
// 		let itemSnippet = item.snippet;
// 		let itemUrl = encodeURI(`https://en.wikipedia.org/wiki/${item.title}`);
		
// 		resultsList.insertAdjacentHTML('beforeend',
//       	`<div class="resultItem">
//          <h3 class="resultTitle">
//           <a href="${itemUrl}" target="_blank" rel="noopener">${itemTitle}</a>
//          </h3>
//          <p class="resultSnippet"><a href="${itemUrl}"  target="_blank" rel="noopener">
//          ${itemSnippet}</a></p>
//         </div>`
//     	);

// 	})

// }