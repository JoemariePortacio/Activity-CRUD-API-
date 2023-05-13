<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    require('Empdb.php');


    $method = $_SERVER['REQUEST_METHOD'];

    if($method === "GET"){
        $sql = "SELECT * FROM tblemployee";
        if(isset($_GET['id'])){
            $sql = "SELECT * FROM tblemployee WHERE id =" . $_GET['id'];
        }

        $db = new DB();
        //Connect Database
        $connect = $db->connect();
        //Execute Query
        $result = mysqli_query($connect, $sql);
    
        //Check number of row
        if (mysqli_num_rows($result) > 0) {
            // Fetch each data (mysqli_fetch_all get assosiative and value array)
            while($row = mysqli_fetch_all($result, MYSQLI_ASSOC)) {
                $data = $row;
            }
        } 
        else {
            $data = "0 results";
        }
        mysqli_free_result($result);
        $db->closeConnection($connect);
        echo json_encode($data);
    }

    if($method == "POST"){
        $data = urldecode(file_get_contents('php://input'));
        
        $value = json_decode($data, TRUE);

        $db = new DB();
        $sql = "INSERT INTO tblemployee (id, lastname, firstname, middle, address, email, cel, birthday, department, gender, bio, pic) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    
        //Connect Database
        $connect = $db->connect();
        //Execute Query
        if($stmt = mysqli_prepare($connect, $sql)){
            mysqli_stmt_bind_param($stmt, "ssssss", $last_name, $first_name, $mid_name, $address, $email_add, $cel_No, $birthday, $department, $bio, $pic);
            
            $last_name = $value['lastname'];  
            $first_name = $value['firstname']; 
            $mid_name =  $value['middle'];    
            $address =  $value['address'];    
            $email_add =  $value['email'];    
            $cel_No = $value['cel'];
            $birthday = $value['birthday'];
            $department = $value['department'];
            $gender = $value['gender'];
            $bio = $value['bio'];
            $pic = $value['pic'];
            mysqli_stmt_execute($stmt);
        }
        else{
            echo json_decode("No Record Found");
        }
        
        mysqli_stmt_close($stmt);
        $db->closeConnection($connect);
        $response =
        [
            "Message" => "Record Added Successful",
        ];
        echo json_encode($response);
    }

    if($method == "PUT"){
        $message = null;
        $sql = null;

        $data = urldecode(file_get_contents('php://input'));
        
        $value = json_decode($data, TRUE);

        if(isset($_GET['id'])){
            $last_name = $value['lastname'];  
            $first_name = $value['firstname']; 
            $mid_name =  $value['middle'];    
            $address =  $value['address'];    
            $email_add =  $value['email'];    
            $cel_No = $value['cel']; 
            $birthday = $value['birthday'];
            $department = $value['department'];
            $gender = $value['gender'];
            $bio = $value['bio'];
            $pic = $value['pic']; 
            $sql = "UPDATE tblemployee SET lastname = '$last_name', firstname = '$firstname', middle = '$mid_name', address = '$address', $email_add = 'email', $cel_No = 'cel', $birthday = 'birthday', $department = 'department', $gender = 'gender', $bio = 'bio', $pic = 'pic'  WHERE id = ". $_GET['id'];
            $response =
            [
                "message" => "Student of " . $value['firstname'] . " ". $value['lastname'] . " was Updated",
            ];
            echo json_encode($response);
        }
        else{
            die("Error ID");
        }

        $db = new DB();
        //Connect Database
        $connect = $db->connect();
        //Execute Query
        
        if (mysqli_query($connect, $sql)) {
            $message = "Record Update Successful";
        } 
        else {
            $message = "Error Updating record";
        }
        $db->closeConnection($connect);
        echo json_encode($message);      
    }

    if($method == "DELETE"){
        $message = null;
        $sql = null;

        $data = urldecode(file_get_contents('php://input'));
        
        $value = json_decode($data, TRUE);

        if(isset($_GET['id'])){
            $sql = "DELETE FROM tblemployee WHERE id = " . $_GET['id'];
        }
        else{
            die("Error ID");
        }

        $db = new DB();
        //Connect Database
        $connect = $db->connect();
        //Execute Query
        
        if (mysqli_query($connect, $sql)) {
            $message = "Record Delete Successful";
        } 
        else {
            $message = "Error Updating record";
        }
        $db->closeConnection($connect);
        echo json_encode($message);      
    }


?>