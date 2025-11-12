<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Form nhập liệu</title>
  </head>
  <body>
    
    <?php
      $err = "";//Khai báo biến $err rỗng
      $submit = $_POST["submit"] ?? "";//Nếu tồn tại $_POST["submit"] thì gán $submit = $_POST["submit"]
      //ngược lại $submit bằng rỗng
      $username = $_POST["username"] ?? "";//Nếu tồn tại $_POST["username"] thì gán $username = $_POST["username"]
      //ngược lại $username bằng rỗng
      $password =  $_POST["password"] ?? "";//Nếu tồn tại $_POST["password"] thì gán $password = $_POST["password"]
      //ngược lại $password bằng rỗng
      $verifyPassword = $_POST["verifyPassword"] ?? "";//Nếu tồn tại $_POST["verifyPassword"] thì gán $verifyPassword = $_POST["verifyPassword"]
      //ngược lại $verifyPassword bằng rỗng
      $gender = "";//Khai báo biến $gender bằng rỗng
      if(isset($_POST["gender"])){//Nếu tồn tại $_POST["gender"
        $gender = $_POST["gender"] === "0" ? "Nam" : "Nữ";//Nếu $_POST["gender"] = 0 thì gán $gender là Nam ngược lại gán $gender là Nữ
      }
      $hobby = array();//Khai báo mảng $hobby rỗng
      if(isset($_POST["hobby"])){//Nếu tồn tại $_POST["hobby"]
          $hobby = $_POST["hobby"];//Gán giá trị cho mảng $hobby là mảng  $_POST["hobby"]
      }
      $city = "";//Khai báo biến city rỗng
      if(isset($_POST["city"])){//Nếu tồn tại $_POST["city"]
        if($_POST["city"] === "1")//Nếu $_POST["city"] = 1 thì gán $city là "Thành phố Hồ Chí Minh"
          $city = "Thành phố Hồ Chí Minh";
        if($_POST["city"] === "2")//Nếu $_POST["city"] = 2 thì gán $city là "Tỉnh Bà Rịa Vũng Tàu"
          $city = "Tỉnh Bà Rịa Vũng Tàu";
        if($_POST["city"] === "3")//Nếu $_POST["city"] = 3 thì gán $city là "Tỉnh Long An"
          $city = "Tỉnh Long An";
      }
      if(!$username)//Nếu $username bằng rỗng thì gán $err là Chưa nhập tên đăng nhập
        $err = "Chưa nhập tên đăng nhập";
      else if(!$password || !$verifyPassword || $password !== $verifyPassword)//Nếu $password hoặc $verifyPassword bằng rỗng 
      //hoặc $password không bằng $verifyPassword thì gán $err là Chưa nhập mật khẩu hoặc mật khẩu không hợp lệ
        $err = "Chưa nhập mật khẩu hoặc mật khẩu không hợp lệ";
      else if(!$gender)//Nếu $gender bằng rỗng thì gán $err là Chưa chọn giới tính
        $err = "Chưa chọn giới tính";
      else if(count($hobby) === 0)//Nếu mảng $hobby rỗng thì gán $err là Chưa chọn sở thích
        $err = "Chưa chọn sở thích";
      else if(!$city)//Nếu $city rỗng thì gán $err là Chưa chọn tỉnh/thành phố
        $err = "Chưa chọn tỉnh/thành phố";
      if($err && $submit)//Nếu $err có giá trị và người dùng đã bấm nút submit thì xuất ra thông báo lỗi tương ứng
        echo $err;
      else{//Nếu $username, $password, $gender, mảng $hobby, $city có giá trị thì xuất ra thông tin tương ứng
        if($username)
          echo "Tên đăng nhập: $username <br>";
        if($password)
          echo "Mật khẩu: $password <br>";
        if($gender)
          echo "Giới tính: $gender <br>";
        if(count($hobby) > 0){
          echo "Sở thích:";
          foreach($hobby as $v)//Duyệt từng phần tử của mảng $hobby
            echo $v." ";
        } 
        echo "<br>";
        if($city)
          echo "Tỉnh/Thành phố: $city";
      }
     ?>
  </body>
</html>
