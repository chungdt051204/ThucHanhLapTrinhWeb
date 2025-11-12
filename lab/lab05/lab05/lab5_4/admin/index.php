
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Back-End</title>
<link rel="stylesheet" type="text/css" href="css/style.css"/>

</head>

<body>
<div id="contain">
<div id="header">Header</div>
<div id="body">
	<div id="left">
        <!-- Khi click vào Home url sẽ hiển thị localhost:3000/index.php -->
    	<a href="index.php">Home</a><br />
         <!-- Khi click vào Danh mục sách url sẽ hiển thị localhost:3000/index.php?mod=sach -->
        <a href="index.php?mod=sach">Danh Mục Sách</a><br />
        <!-- Khi click vào Loại sách url sẽ hiển thị localhost:3000/index.php?mod=loai -->
		<a href="index.php?mod=loai">Loại sách</a><br />
        <!-- Khi click vào Nhà xuất bản url sẽ hiển thị localhost:3000/index.php?mod=nhaxb -->
		<a href="index.php?mod=nhaxb">Nhà xuất bản</a><br />
         <!-- Khi click vào Quản lý đơn hàng url sẽ hiển thị localhost:3000/index.php?mod=order -->
        <a href="index.php?mod=order">Quản lý đơn hàng</a><br />
         <!-- Khi click vào Thông tin user url sẽ hiển thị localhost:3000/index.php?mod=user -->
        <a href="index.php?mod=user">Thông tin user</a><br />
        <hr />
        <!-- Khi click vào Trang front-end  url sẽ hiển thị localhost:3000/index.php -->
        <a href="../index.php">Trang front-end</a>
    </div>
    <div id="right">
   
		<div id=thongtinadmin>
            <div class=info>
            	Thông tin admin
            </div>
            <div class=logout>
            	<a href="#">Thoát</a>
            </div>
        </div>
       
	 <div>
	  Nội dung ...
	</div>
	
	
    </div>
</div>
<div id="footer">footer</div>
</div>
</body>
</html>