



var InitializeApp = function(){

	var api = {};

	/*
		What happens when the app initializes.
	*/
	api.init = function(){
		console.log('App was intialized.')

	};


	api.loadApi = function(url, callback){
		responseText = api.performHttpRequest(url,'GET',callback)

	}


	api.createStockNewsElementsFromJSONData = function(JSONData){

		// Find parent element to populate.
		var stockPanel = document.getElementById('stockpanel');

		console.log("Creating stock news elements" + JSON.stringify(JSONData));

		var itemArray = JSONData['results']
		for (var i = 0; i < itemArray.length; i++) {
			var item = itemArray[i];

			// Create the Parent element.
			var newsItemElement = document.createElement("NewsItem");


			// Create Title element
			var h3Element = document.createElement("H3");
			h3Element.className = "news_item_title";
			h3Element.innerHTML = item['title'];
			newsItemElement.appendChild(h3Element);


			// Create Date element
			var dateandAuthorElement = document.createElement("span");
			dateandAuthorElement.className = "news_item_dateauthor";
			dateandAuthorElement.innerHTML = item['published_utc'] + ' by ' + item['author'];
			newsItemElement.appendChild(dateandAuthorElement);

			// Create description element
			var descriptionElement = document.createElement("p");
			descriptionElement.className = "news_item_description";
			descriptionElement.innerHTML = item['description'];
			newsItemElement.appendChild(descriptionElement);

			// Create link to news item
			var linkElement = document.createElement("A");
			linkElement.className = "news_item_sourceurl";
			linkElement.innerHTML = "Read more<br> <br>";
			linkElement.href = item['article_url'];
			newsItemElement.appendChild(linkElement);

			// Create link to name of publisher  item
			var sourceLabelElement = document.createElement("span");
			sourceLabelElement.className = "news_item_sourcelabel";
			sourceLabelElement.innerHTML = "Source: " + item['publisher']['name'];
			newsItemElement.appendChild(sourceLabelElement);


			

		

			stockPanel.appendChild(newsItemElement)

		}


	}


	api.performHttpRequest = function(url, method, callback){

		var responseText = '{}';

		function responseHandler(event){
			console.log(event.currentTarget.responseText);
			callback(event.currentTarget.responseText);
		};

		var XhrObject = new XMLHttpRequest();
		XhrObject.addEventListener("load",responseHandler);
		XhrObject.open(method, url);
		XhrObject.send();

		
	}

	api.init();
	return api;
}();


document.addEventListener('DOMContentLoaded', function(){
 	
 	/*	
		Loading in the mini-framework I wrote.
		And expose it to a variable that I chose the name of, in this case MyApp.
 	*/
	var MyApp = InitializeApp;
	var localApiKey = 'aK30fL63R0jQuLY_U7UEdrGpT7eJCjf8';

	/*
		Using a function from the API.
	*/
	MyApp.loadApi('https://api.polygon.io/v2/reference/news?limit=10&order=descending&sort=published_utc&ticker=AAPL&published_utc.gte=2021-04-26&apiKey='+localApiKey,function(responseText){
			console.log('Api was loaded');
			console.log('Data from the Response as string: ' + responseText);

			var JSONData = JSON.parse(responseText);
			MyApp.createStockNewsElementsFromJSONData(JSONData);

		});


});