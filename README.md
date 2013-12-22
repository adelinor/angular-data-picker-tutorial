angular-data-picker-tutorial
============================

Audience
--------
This tutorial is meant for Javascript and AngularJS beginners like me who already went
through the [official AngularJS tutorial](http://docs.angularjs.org/tutorial), and
preferrably, through the [AngularJS in one week end program](http://joelhooks.com/blog/2013/08/03/learn-angularjs-in-a-weekend/).
For this tutorial you will need a browser, a text editor and a git client.

Objective
---------
My personal objective when writing this tutorial was to see how AngularJS can be used to write a simple form. As we know, even for the most simple data model, you will depend on a dictionary of some sort:
* it could be a list of countries
* or some other sort of data with a very high number of items

Typically, a dropdown list is used when the number of items is small. For large lists,
you will have to search for your data. This is the *topic of this tutorial*: to explore how a search "widget" embeddable in a simple form can be implemented with AngularJS.


First step
----------
To view of this tutorial please clone this tutorial with

    git clone https://github.com/adelinor/angular-data-picker-tutorial.git

Afterwards, check out the branch step01 to view the code for the first step:

    git checkout step01

In the first step, we setup a project folder, and three files: one for the HTML page, one
for the AngularJS code and one for a mock JSON message that simulates a call to the
backend.
     +
     |
     +- app/
     |   |
     |   +- index.html
     |   |
     |   +- js/
     |       |
     |       +- controllers.js
     |
     +- messages/
         |
         +- search-orgs.js
jjj
First we build a message that emulates the results returned by a backend implementation. The file `search-orgs.js` contains only two items:

```js
[
{
	"dn": "uniqueIdentifier=1000,dc=orgs",
	"displayName": "Javascript development org"
},
{
	"dn": "uniqueIdentifier=1001,dc=orgs",
	"displayName": "Enthusiastic user org"
}
]
```

Then we create the index.html page:

```html
<html lang="en" ng-app>
<head>
	<title>Picker</title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap.min.css">
	<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.0.8/angular.min.js"></script>
	<script src="js/controllers.js"></script>
</head>
<body>

```

The head section links to the [Bootstrap CSS framework](http://getbootstrap.com) and to
AngularJS version 1.0.8.
The `html` tag contains the attribute `ng-app` to let AngularJS know that this HTML page contains an AngularJS application.

To test this setup, we want to display the data from search org message. For that purpose we use AngularJS's ng-repeat:

```html
<h2>Let's test stuff</h2>
<p>
<ul ng-controller="OrgsListCtrl">
	<li ng-repeat="org in searchResults">
		{{org.displayName}}
	</li>
</ul>
</p>
```

A controller, OrgsListCtrl, is declared in the `ul` element. This allows to fetch data and
store in the `scope` to make it available. In the `li` we iterate through the search results using the `ng-repeat` directive.

The controller is written with a simple function as shown in the
[Angular tutorial step 5](http://docs.angularjs.org/tutorial/step_05). We use the out of
the box `$http` service to invoke the search. The result of the search is stored in the scope under the name `searchResults`.
```js
function OrgsListCtrl($scope, $http) {
	$http.get('../messages/search-orgs.js').success(function(data) {
		$scope.searchResults = data;
	});
}
```

Now open the index.html page and you should see the list of organisations displayed:

[Screenshot of expecte output](site/step01.png) .

Et voilà, that's it for the first step.
