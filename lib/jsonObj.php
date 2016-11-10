<?php
/**
 *
 */
class jsonObj
{
  private $ia;
  function __construct($ia){
    $this->ia=$ia;
  }
  function generaNaveAle(){
    $this->ia->randomPos();
  }
  function devuelveNave(){
    echo json_encode($this->ia->getNavesIA());
  }
  function devuelveNaves(){
    echo json_encode($this->ia->getNavesIA());
  }
}

 ?>
