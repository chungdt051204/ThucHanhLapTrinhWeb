<?php
function postIndex($index, $value="")
{
	if (!isset($_POST[$index]))	return $value;//Nếu tồn tại $_POST[$index] trong mảng $_POST 
	//thì trả về giá trị của $_POST[$index]
	return $_POST[$index];
}

function getIndex($index, $value="")
{
	if (!isset($_GET[$index]))	return $value;//Nếu tồn tại $_GET[$index] trong mảng $_GET
	//thì trả về giá trị của $_GET[$index]
	return $_GET[$index];
}

function requestIndex($index, $value="")
{
	if (!isset($_REQUEST[$index]))	return $value;//Nếu tồn tại $_REQUEST[$index] trong mảng $_REQUEST
	//thì trả về giá trị của $_REQUEST[$index]
	return $_REQUEST[$index];
}