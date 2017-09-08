<?php

// Get request query
$requestString = !isset($_SERVER['QUERY_STRING']) ? '' : substr($_SERVER['QUERY_STRING'], 2);

// Define simple router
$router = new Core\Router();
$router->addRoute('v1');

// Perform router procedure
$router->performRouting($requestString);

?>