var app = angular.module("pInvApp", []);

app.controller("pInvAppCtrl", function($scope,$http) {
    //DE FORMA GENERAL
    // [i][j]
    // i=> Fila
    // j => Columna
    //mapa de juego
    $scope.mapaCol=3;
    $scope.mapaFil=4;
    //semaforo de nave seleccionada por usuario
    $scope.idNaveSelec=-1;
    $scope.idNaveSelecFil=-1;
    $scope.idNaveSelecCol=-1
    //Creacion del array de imagenes e ids
    $scope.imgs = new Array($scope.mapaFil);
    $scope.ids = new Array($scope.mapaFil);
    $scope.idsIA = new Array($scope.mapaFil);
    $scope.movs = new Array($scope.mapaFil);
    for (i = 0; i < $scope.mapaFil; i++) {
      $scope.imgs[i] = new Array($scope.mapaCol);
      $scope.ids[i] = new Array($scope.mapaCol);
      $scope.idsIA[i] = new Array($scope.mapaCol);
      $scope.movs[i] = new Array($scope.mapaCol);
      for (j = 0; j < $scope.mapaCol; j++) {
        $scope.imgs[i][j]={img:"img/celda.png"};
        $scope.ids [i][j] = -1;
        $scope.idsIA [i][j] = -1;
        $scope.movs [i][j] = -1;
      }
    }
    //Array de naves humanas
    $scope.numNavesHumanas=3;
    $scope.navesHumanas = new Array($scope.numNavesHumanas);
    //Posicion inicial de las naves
    //Nave tipo 3 id=0
    $scope.navesHumanas[0]={
      id:0,
      col:0,
      fil:0,
      tipo:"tipo3",
      img:"img/naveTipo3.png",
      imgAct:"img/naveTipo3Activa.png"
    };
    //Nave tipo 2 id=1
    $scope.navesHumanas[1]={
      id:1,
      col:1,
      fil:0,
      tipo:"tipo2",
      img:"img/naveTipo2.png",
      imgAct:"img/naveTipo2Activa.png"
    };
    //Nave tipo 1 id=2
    $scope.navesHumanas[2]={
      id:2,
      col:2,
      fil:0,
      tipo:"tipo1",
      img:"img/naveTipo1.png",
      imgAct:"img/naveTipo1Activa.png"
    };
    //Pintamos las naves inicialmente
    for (i = 0; i < $scope.numNavesHumanas; i++) {
      $scope.imgs[$scope.navesHumanas[i].fil][$scope.navesHumanas[i].col].img=$scope.navesHumanas[i].img;
      $scope.ids[0][i]=$scope.navesHumanas[i].id;
    }
    //Array de naves IA
    $scope.numNavesIA=3;
    $scope.navesIA = new Array($scope.numNavesIA);
    //Posicion inicial de las naves
    //Nave tipo 2 id=1
    $scope.navesIA[0]={
      id:0,
      col:0,
      fil:3,
      tipo:"tipo2",
      img:"img/naveTipo3IA.png",
      imgAct:"img/naveTipo3ActivaIA.png"
    };
    //Nave tipo 2 id=1
    $scope.navesIA[1]={
      id:1,
      col:1,
      fil:3,
      tipo:"tipo2",
      img:"img/naveTipo2IA.png",
      imgAct:"img/naveTipo1ActivaIA.png"
    };
    //Nave tipo 1 id=2
    $scope.navesIA[2]={
      id:2,
      col:2,
      fil:3,
      tipo:"tipo1",
      img:"img/naveTipo1IA.png",
      imgAct:"img/naveTipo1ActivaIA.png"
    };
    for (i = 0; i < $scope.numNavesIA; i++) {
      $scope.imgs[$scope.navesIA[i].fil][$scope.navesIA[i].col].img=$scope.navesIA[i].img;
      $scope.idsIA[3][i]=$scope.navesIA[i].id;
    }
    //--------------------------
    //Peticion colocar naves iA
    //--------------------------
    $scope.selecPos = function($i,$j) {
      //Si no hay naves seleccionadas (primera seleccion)
      if($scope.idNaveSelec==-1){
        //Si la selección contiene una nave humana
        if($scope.ids[$i][$j]>-1){
          $scope.idNaveSelec=$scope.ids[$i][$j];
          $scope.imgs[$scope.navesHumanas[$scope.ids[$i][$j]].fil][$scope.navesHumanas[$scope.ids[$i][$j]].col].img=$scope.navesHumanas[$scope.idNaveSelec].imgAct;
          $scope.idNaveSelecFil=$i;
          $scope.idNaveSelecCol=$j;
          //Comprobamos el tipo para el siguiente movimiento
          //-----------------TIPO1--------------------------------
          if($scope.navesHumanas[$scope.idNaveSelec].tipo=="tipo1"){
            //Solo puede mover hacia abajo
            $movFil=$i+1;
            if(($movFil<$scope.mapaFil)){
              if(($scope.ids[$movFil][$j]==-1)&&($scope.idsIA[$movFil][$j]==-1)){
                //Siguiente movimiento es posible
                //Colocamos movimientos
                $scope.movs[$movFil][$j]=0;
                $scope.imgs[$movFil][$j].img="img/celdaActiva.png";
              }
            }
          //-----------------TIPO1--------------------------------
          //-----------------TIPO2--------------------------------
          }else if($scope.navesHumanas[$scope.idNaveSelec].tipo=="tipo2"){
            //Puede mover en todos los sentidos
            $movFil=$i+1;
            if(($movFil<$scope.mapaFil)){
              if(($scope.ids[$movFil][$j]==-1)&&($scope.idsIA[$movFil][$j]==-1)){
                //Siguiente movimiento es posible
                //Colocamos movimientos
                $scope.movs[$movFil][$j]=0;
                $scope.imgs[$movFil][$j].img="img/celdaActiva.png";
              }
            }
            $movCol=$j+1;
            if(($movCol<$scope.mapaCol)){
              if(($scope.ids[$i][$movCol]==-1)&&($scope.idsIA[$i][$movCol]==-1)){
                //Siguiente movimiento es posible
                //Colocamos movimientos
                $scope.movs[$i][$movCol]=0;
                $scope.imgs[$i][$movCol].img="img/celdaActiva.png";
              }
            }
            $movCol=$j-1;
            if(($movCol>-1)){
              if(($scope.ids[$i][$movCol]==-1)&&($scope.idsIA[$i][$movCol]==-1)){
                //Siguiente movimiento es posible
                //Colocamos movimientos
                $scope.movs[$i][$movCol]=0;
                $scope.imgs[$i][$movCol].img="img/celdaActiva.png";
              }
            }
            $movFil=$i-1;
            if(($movFil>-1)){
              if(($scope.ids[$movFil][$j]==-1)&&($scope.idsIA[$movFil][$j]==-1)){
                //Siguiente movimiento es posible
                //Colocamos movimientos
                $scope.movs[$movFil][$j]=0;
                $scope.imgs[$movFil][$j].img="img/celdaActiva.png";
              }
            }
            $movFil=$i+1;
            $movCol=$j+1;
            if(($movFil<$scope.mapaFil)&&($movCol<$scope.mapaCol)){
              if(($scope.ids[$movFil][$movCol]==-1)&&($scope.idsIA[$movFil][$movCol]==-1)){
                //Siguiente movimiento es posible
                //Colocamos movimientos
                $scope.movs[$movFil][$movCol]=0;
                $scope.imgs[$movFil][$movCol].img="img/celdaActiva.png";
              }
            }
            $movFil=$i+1;
            $movCol=$j-1;
            if(($movFil<$scope.mapaFil)&&($movCol>-1)){
              if(($scope.ids[$movFil][$movCol]==-1)&&($scope.idsIA[$movFil][$movCol]==-1)){
                //Siguiente movimiento es posible
                //Colocamos movimientos
                $scope.movs[$movFil][$movCol]=0;
                $scope.imgs[$movFil][$movCol].img="img/celdaActiva.png";
              }
            }
            $movFil=$i-1;
            $movCol=$j-1;
            if(($movFil>-1)&&($movCol>-1)){
              if(($scope.ids[$movFil][$movCol]==-1)&&($scope.idsIA[$movFil][$movCol]==-1)){
                //Siguiente movimiento es posible
                //Colocamos movimientos
                $scope.movs[$movFil][$movCol]=0;
                $scope.imgs[$movFil][$movCol].img="img/celdaActiva.png";
              }
            }
            $movFil=$i-1;
            $movCol=$j+1;
            if(($movFil>-1)&&($movCol<$scope.mapaCol)){
              if(($scope.ids[$movFil][$movCol]==-1)&&($scope.idsIA[$movFil][$movCol]==-1)){
                //Siguiente movimiento es posible
                //Colocamos movimientos
                $scope.movs[$movFil][$movCol]=0;
                $scope.imgs[$movFil][$movCol].img="img/celdaActiva.png";
              }
            }
          }
          //-----------------TIPO2--------------------------------
          //-----------------TIPO3--------------------------------
          else if($scope.navesHumanas[$scope.idNaveSelec].tipo=="tipo3"){
            //Puede mover en diagonal
            $movFil=$i+1;
            $movCol=$j+1;
            if(($movFil<$scope.mapaFil)&&($movCol<$scope.mapaCol)){
              if(($scope.ids[$movFil][$movCol]==-1)&&($scope.idsIA[$movFil][$movCol]==-1)){
                //Siguiente movimiento es posible
                //Colocamos movimientos
                $scope.movs[$movFil][$movCol]=0;
                $scope.imgs[$movFil][$movCol].img="img/celdaActiva.png";
              }
            }
            $movFil=$i+1;
            $movCol=$j-1;
            if(($movFil<$scope.mapaFil)&&($movCol>-1)){
              if(($scope.ids[$movFil][$movCol]==-1)&&($scope.idsIA[$movFil][$movCol]==-1)){
                //Siguiente movimiento es posible
                //Colocamos movimientos
                $scope.movs[$movFil][$movCol]=0;
                $scope.imgs[$movFil][$movCol].img="img/celdaActiva.png";
              }
            }
            $movFil=$i-1;
            $movCol=$j-1;
            if(($movFil>-1)&&($movCol>-1)){
              if(($scope.ids[$movFil][$movCol]==-1)&&($scope.idsIA[$movFil][$movCol]==-1)){
                //Siguiente movimiento es posible
                //Colocamos movimientos
                $scope.movs[$movFil][$movCol]=0;
                $scope.imgs[$movFil][$movCol].img="img/celdaActiva.png";
              }
            }
            $movFil=$i-1;
            $movCol=$j+1;
            if(($movFil>-1)&&($movCol<$scope.mapaCol)){
              if(($scope.ids[$movFil][$movCol]==-1)&&($scope.idsIA[$movFil][$movCol]==-1)){
                //Siguiente movimiento es posible
                //Colocamos movimientos
                $scope.movs[$movFil][$movCol]=0;
                $scope.imgs[$movFil][$movCol].img="img/celdaActiva.png";
              }
            }
          }
        }
      //Hay nave seleccionada con id
      }else{
        //Solo se puede seleccionar huecos marcados
        if($scope.movs[$i][$j]==0){
        //Realizamos movimiento
          //Borramos imagenes de movimientos
          for (fil = 0; fil < $scope.mapaFil; fil++) {
            for (col = 0; col < $scope.mapaCol; col++) {
              if($scope.movs [fil][col]==0) $scope.imgs[fil][col].img="img/celda.png";
            }
          }
          $scope.imgs[$i][$j].img=$scope.navesHumanas[$scope.idNaveSelec].img;
          $scope.imgs[$scope.idNaveSelecFil][$scope.idNaveSelecCol].img="img/celda.png";
          $scope.navesHumanas[$scope.idNaveSelec].fil=$i;
          $scope.navesHumanas[$scope.idNaveSelec].col=$j;
          $scope.ids[$i][$j]=$scope.idNaveSelec;
          $scope.ids[$scope.idNaveSelecFil][$scope.idNaveSelecCol]=-1;
        //En el caso de que no esté vacia volvemos hacia atrás todo
        }else{
          $scope.imgs[$scope.idNaveSelecFil][$scope.idNaveSelecCol].img=$scope.navesHumanas[$scope.idNaveSelec].img;
          //Borramos imagenes de movimientos
          for (fil = 0; fil < $scope.mapaFil; fil++) {
            for (col = 0; col < $scope.mapaCol; col++) {
              if($scope.movs [fil][col]==0) $scope.imgs[fil][col].img="img/celda.png";
            }
          }
        }
        //Borramos movimientos
        for (i = 0; i < $scope.mapaFil; i++) {
          for (j = 0; j < $scope.mapaCol; j++) {
            $scope.movs [i][j] = -1;
            if($scope.movs [i][j]==0) $scope.imgs[i][j].img="img/celda.png";
          }
        }
        $scope.idNaveSelec=-1;
        $scope.idNaveSelecFil=-1;
        $scope.idNaveSelecCol=-1;
      }
    }
    //--------------------------
    //Peticion colocar naves iA
    //--------------------------
    $scope.mueveIA = function() {
      $stringConexion="lib/app.php?accion=mover&numNaves="+$scope.numNavesHumanas+"&";
      //Generamos la cadena de conexion
      for (i = 0; i < $scope.numNavesHumanas; i++) {
        if(i!=0) $stringConexion=$stringConexion+"&";
        $stringConexion=$stringConexion+"idH"+i+"="+$scope.navesHumanas[i].id+"&";
        $stringConexion=$stringConexion+"colH"+i+"="+$scope.navesHumanas[i].col+"&";
        $stringConexion=$stringConexion+"filH"+i+"="+$scope.navesHumanas[i].fil+"&";
        $stringConexion=$stringConexion+"tipoH"+i+"="+$scope.navesHumanas[i].tipo;
      }
      $stringConexion=$stringConexion+"&";
      for (i = 0; i < $scope.numNavesHumanas; i++) {
        if(i!=0) $stringConexion=$stringConexion+"&";
        $stringConexion=$stringConexion+"idIA"+i+"="+$scope.navesIA[i].id+"&";
        $stringConexion=$stringConexion+"colIA"+i+"="+$scope.navesIA[i].col+"&";
        $stringConexion=$stringConexion+"filIA"+i+"="+$scope.navesIA[i].fil+"&";
        $stringConexion=$stringConexion+"tipoIA"+i+"="+$scope.navesIA[i].tipo;
      }
      console.log($stringConexion);
      $http.get($stringConexion)
        .then(function(response) {
          $scope.naves = response.data;
          console.log($scope.naves);
          angular.forEach($scope.naves,
            function(nave, naveKey) {
            $scope.imgs[$scope.navesIA[nave.id].fil][$scope.navesIA[nave.id].col].img="img/celda.png";
            $scope.imgs[nave.fil][nave.col].img=$scope.navesIA[nave.id].img;
            $scope.navesIA[nave.id].col=nave.col;
            $scope.navesIA[nave.id].fil=nave.fil;
          }
          );
          for (i = 0; i < $scope.mapaFil; i++) {
            for (j = 0; j < $scope.mapaCol; j++) {
              $scope.idsIA [i][j] = -1;
            }
          }
          for (i = 0; i < $scope.numNavesIA; i++) {
            $scope.idsIA[$scope.navesIA[i].fil][$scope.navesIA[i].col]=$scope.navesIA[i].id;
          }
        });
    };

});
