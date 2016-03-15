# Online Sales Manager
Reykjavík University, March 2016<br>
T-303-WEPO - Web Programming II<br>
Assignment: Online Sale Business for Sellers<br>
Authors: asav13@ru.is, vedise13@ru.is, laurar14@ru.is

An AngularJS application that displays a list of sellers and their respective products.
## Installation and dependencies
### Dependencies
All javascript references are handled by gulp.

In order for everything to work properly one must first run in the ***root*** folder
```
	bower install
	npm install
```
preferably in the order listed here to avoid eventual dependency conflicts.

### Run the client
Go to the project's ***root*** and with you prefered command line interface, simply run 

```
	gulp
```

### Start the application

The previous step of running the 
```
	gulp
```
command should automatically open http://localhost:7000 in your browser, where the client will be running.

### Unit tests

To run the unit tests, run
```
	karma start
```
from the root.
Open the *index.html* file, located in *../coverage/Chrome 48.0.2564 (Windows 10 0.0.0)* to see the coverage of unit tests.

## Browser support
During developement the site was tested on:
* Chrome 
* Firefox 
* Microsoft edge
* Internet explorer

## Bonus features

Features not mentioned in project description:
* Search on sellers
* Search on products
* Order-by on products

## User instructions
* To change the language, click the ***flags*** in the top right corner.
* To locate from seller-details page, back to list of sellers, click the ***SellSharks*** icon on the top left of the screen.

##### Sellers
* To add a new seller, press the ***+ New Seller*** button and fill in the name and category of product. You can add a photo but it is not mandatory. Upon finish, an error/success message will tell you if it was a success or not.
* To edit a seller, click the ***edit*** symbol on the far right. (A box with a line sticking into it) Upon finish, an error/success message will tell you if it was a success or not.
* To search a seller, type in his name, or a part of his name in the ***Search textbox*** on the left, above the list of sellers.
* To change sellers list order, click the title of the column you want to order by.
* To see the products a seller has to offer, click the seller's row.

##### Sellers details
* If a seller has no products listed, there will be a message confirming that.
* To see seller's most sold products, click the ***10 most bought tab***.
* To change product's order, choose and order-by opiton from the ***order-by dropdown*** list. (Name (A-Z), Name(Z-A), Price(High-Low), Price(Low-High).
* To search for a product, type in the product's name, price, sold units or in stock (or id) in the ***search textbox*** on the left, above the tabs.
* To add new product to seller, click the ***+ Add new product*** button on the right and fill in the name, price and add an image if you like to, but it's not mandatory. You will then gett a success/error message that will inform you if you succeeded.
* To edit a product, click ***it***.
