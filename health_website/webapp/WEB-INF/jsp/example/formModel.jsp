<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
</head>
<body>

<form action="testFormModel.do" method = "post">
 
  <p>用户信息</p>
  user.loginName : <input type = "text" name = "user.loginName"/><br><br>
  user.password : <input type = "text" name = "user.password"/><br><br>
  
  <p>任务信息</p>
 title ：  <input type = "text" name = "title"/><br><br>
 description:  <input type = "text" name = "description"/><br>

  <button type = "submit">提交</button>
</form>


</body>
</html>