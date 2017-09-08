<?php

namespace Core;

class Router {

  private $routes = array();

  public function addRoute($controller = NULL) {
    if(!$controller)
      return false;

    if(!in_array($controller,  $this->routes)) {
      $this->routes[$controller] = $controller;
    }
  }

  public function performRouting($actualroute,$action = 'index') {
    $route = explode('/', $actualroute);
    $controller = array_shift($route);

    $action = ($a = array_shift($route)) ? $a : $action;

    if(in_array($controller,  $this->routes)) {
      try {
        require __DIR__ . '/../controllers/' . ucfirst($controller) . 'Controller.php';
        $controllerName = ucfirst($controller) . 'Controller';
        $controller = new $controllerName();
        $controller->{strtolower($action)}();
      } catch(Exception $e) {
        print_r($e);
      }

    } else {
      return false;
    }
  }

}

?>
