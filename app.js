const searchForm = document.querySelector('form');
const searchInput = document.querySelector('.input-field');

searchForm.addEventListener('submit', handleSubmit);

function handleSubmit(e) {
  e.preventDefault();

  const searchQuery = searchInput.value.trim();
  fetchWikipediaData(searchQuery);
}

function fetchWikipediaData(searchQuery) {
  let url = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${searchQuery}`;

  fetch(url, {
    headers: {
      'Accept': 'application/json'
    }
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let results = data;
    //   console.log(results);
	displaySearchResults(results)
    })
    .catch((err) => {
      console.error(err);
	  alert('Failed to search wikipedia');
    });
}

//function for displaying reults
function displaySearchResults(results){
	let resultsList = document.querySelector('.results');
	resultsList.innerHTML = '';

//The search property is where the search results are placed,
//to access that array of objects nested inside the query use results.query.search.
	results.query.search.forEach(result =>{
		const url = `https://en.wikipedia.org/?curid=${result.pageid}`;
		
		resultsList.insertAdjacentHTML(
			'beforeend',
			`<div class="result-item">
        <h3 class="result-title">
          <a href="${url}" target="_blank" rel="noopener">${result.title}</a>
        </h3>
        <a href="${url}" class="result-link" target="_blank" rel="noopener">${url}</a>
        <span class="result-snippet">${result.snippet}</span><br>
      </div>`
		)
	
	})

}
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