<?php
  include 'jsonObj.php';
  include 'ia.php';

  $iaJuego=new ia();
  $jsObj=new jsonObj($iaJuego);
  //Comprobación de accion
  if(isset($_GET['accion'])){
    if($_GET['accion']=='mover'){
          //Capturamos el numero de naves y generamos el array de naves HUMANAS Y IA
          $numNavesHumanas=$_GET['numNaves'];
          $iaJuego->setMapaCol($numNavesHumanas);
          $iaJuego->setMapaFil($numNavesHumanas);
          //HUMANAS
          for($i=0;$i<$numNavesHumanas;$i++){
            $iaJuego->setNaveHumana($_GET['idH'.$i],$_GET['tipoH'.$i],$_GET['colH'.$i],$_GET['filH'.$i]);
          }
          //IA
          for($i=0;$i<$numNavesHumanas;$i++){
            $iaJuego->setNaveIA($_GET['idIA'.$i],$_GET['tipoIA'.$i],$_GET['colIA'.$i],$_GET['filIA'.$i]);
          }
    }
  }
  $jsObj->devuelveNaves();
?>
