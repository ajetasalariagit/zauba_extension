<?php 
header('Access-Control-Allow-Origin: *');

header('Access-Control-Allow-Methods: GET, POST');

header("Access-Control-Allow-Headers: *");

require_once('config.php');

if($_POST){

  $data = json_decode($_POST['data']);
  $newarr = [];
  $date = date('y-m-d h:i:s');
  foreach($data as $key=>$value){
    $value = (array)$value;
    $value['status'] = 0;
    $value['created'] = $date;
    $newarr[] = $value;
  }
    if ( $collection->insertMany($newarr) ) {
    echo json_encode([
      'status' => 1,
       'message' => 'Data inserted successfully'
      ]);
  }else{
      echo json_encode([
      'status' => 0,
       'message' => 'something went wrong'
      ]);
  }
}

?>