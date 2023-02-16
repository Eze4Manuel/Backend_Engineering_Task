


# Documentation: How to Consume Product Functions in an Express Application
This documentation explains how to consume the product functions provided in the sample code snippet for a Node.js/Express application. These functions provide an interface for performing basic CRUD operations on a product resource.

## Prerequisites
A Node.js development environment should be installed on your machine.
An Express application with the appropriate middleware and routes set up.
MongoDB should be installed and running.
Mongoose should be installed as a dependency in your project.
Typescript need to be install as well

To run the application locally you can make use of docker to spin up the server and mongoDB database. Use the code below, which will fetch the required images for mongoDB and node as well as start the application.

``` docker-compose up  ```


## Installation
Ensure that you have installed the necessary dependencies by running the following command:

```npm install --save express mongoose```

``` tsc init```

To start the app run

``` node dist/index.js ```


## Usage

### Create a new product

To create a new product, use the HTTP POST method and the / route. Make sure you have valid data in your request body.

```  http://localhost:5004/api/products```

 - Sample data for product

```js
export type ProductType = {
    name: string;
    description: string;
    price: number,
    image: string
};
```

The validateNewProduct middleware is used to validate the request body. You should implement this middleware function in a separate file under the middleware folder.

```js 
exports.validateNewProduct = (req, res, next) => {
  // validate the request body here
  next();
}
```


### Get all products

To get all products, use the HTTP GET method and the / route.

```router.get('/', getAllProducts);```

```  http://localhost:5004/api/products```

you can perform pagination by passing the following parameters

- page - Tells the particular paginated page
- limit - Tells the particular number of documents to return


### Get a single product

To get a single product, use the HTTP GET method and the /:id route. The :id parameter should be replaced with the id of the product you want to retrieve.

``` router.get('/:id', getProduct); ```

``` http://localhost:5004/api/products/:id```



### Update a product

To update a product, use the HTTP PUT method and the /:id route. The :id parameter should be replaced with the id of the product you want to update.

```router.put('/:id', validateUpdateProduct, updateProduct);```

```  http://localhost:5004/api/products/:id ```


The validateUpdateProduct middleware is used to validate the request body. You should implement this middleware function in a separate file under the middleware folder.

```js
exports.validateUpdateProduct = (req, res, next) => {
  // validate the request body here
  next();
}
```


### Delete a product

To delete a product, use the HTTP DELETE method and the /:id route. The :id parameter should be replaced with the id of the product you want to delete.

``` router.delete('/:id', deleteProduct);```

```  http://localhost:5004/api/products/:id ```



## Additional Information

- The Product model is assumed to have been defined in a separate file under the models folder.

- The sample code assumes that you have set up a MongoDB database and connected to it using Mongoose.

- If any of the operations fail, the corresponding error message will be sent back to the client with an appropriate status code.

- Ensure that the middleware functions have been implemented before consuming the product functions in the routes file.