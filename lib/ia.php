<?php
class ia
{
//Declaracion de una propiedad
public $mapaCol = 4;
public $mapaFil = 4;
public $numNaves = 3;
public $navesHumano=[];

//Arrays
public $navesIA = [];



// Declaracion de un metodo
public function getFila() {
  return $this->fila;
}
public function getColumna() {
  return $this->columna;
}

public function getNave() {
  return $this->numNaves;
}

public function getNaveHumano() {
  return $this->navesHumano;
}

public function getNavesIA() {
$podemosMover="true";

  foreach ($this->navesIA as $key => &$nave) {
    if ($nave["tipo"]=="tipo1") {
  foreach ($this->navesHumano as $key => $navesH) {
    if (($nave["fil"]-1)==$navesH["fil"] && $nave["col"]==$navesH["col"]) {
    $podemosMover="false";
    }
  }
  if ($podemosMover=="true") {
    $nave["fil"]=$nave["fil"]-1;
  }
}
}
  return $this->navesIA;
}

//Setters
public function setFila($fil) {
  $this->fila = $fil;

}
public function setColumna($col) {
  $this->columna = $col;

}

public function setMapaCol($mapaCol){
  if ($mapaCol<3) {
      $this->mapaCol=3;
  }
  elseif ($mapaCol<0) {
    $this->mapaCol=0;
  }else {
    $this->mapaCol=$mapaCol;
  }
}

public function setMapaFil($mapaFil){
  if ($mapaFil<3) {
      $this->mapaFil=3;
  }
  elseif ($mapaFil<0) {
    $this->mapaFil=0;
  }else {
    $this->mapaFil=$mapaFil;
  }
}


public function setNaveHumana($id,$tipo,$col,$fil){
  $this->navesHumano[]=[
    'id'=>$id,
    'tipo'=>$tipo,
    'col'=>$col,
    'fil'=>$fil,
  ];
}
public function setNaveIA($id,$tipo,$col,$fil){
  $this->navesIA[]=[
    'id'=>$id,
    'tipo'=>$tipo,
    'col'=>$col,
    'fil'=>$fil,
  ];
}

public function setNavesIA($navesIA)
{
  return $this->navesIA;
}

public function randomPos(){
  $this->columna=rand(0,3);
  $this->fila=rand(0,3);
}
}
?>
