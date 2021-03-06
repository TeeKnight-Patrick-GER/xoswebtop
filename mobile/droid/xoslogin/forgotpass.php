<?
/**
 * ForgotPass.php
 *
 * This page is for those users who have forgotten their
 * password and want to have a new password generated for
 * them and sent to the email address attached to their
 * account in the database. The new password is not
 * displayed on the website for security purposes.
 *
 * Note: If your server is not properly setup to send
 * mail, then this page is essentially useless and it
 * would be better to not even link to this page from
 * your website.
 *
 * Written by: Jpmaster77 a.k.a. The Grandmaster of C++ (GMC)
 * Last Updated: August 26, 2004
 */
include("include/session.php");
?>

<html>
<title>xOS Link | Retrieve Password</title>
<meta id="viewport" name="viewport" content ="width=device-width, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
<style type="text/css">
body,td,th {
	color: #0F0;
}
body {
	background-color: #333;
}
a:link {
	color: #00C;
}
a:visited {
	color: #00C;
}
a:hover {
	color: #00C;
}
a:active {
	color: #00C;
}
</style>
<body>

<?
/**
 * Forgot Password form has been submitted and no errors
 * were found with the form (the username is in the database)
 */
if(isset($_SESSION['forgotpass'])){
   /**
    * New password was generated for user and sent to user's
    * email address.
    */
   if($_SESSION['forgotpass']){
      echo "<h1>New Password Generated</h1>";
      echo "<p>Your new password has been generated "
          ."and sent to the email <br>associated with your account. "
          ."<a href=\"main.php\">Main</a>.</p>";
   }
   /**
    * Email could not be sent, therefore password was not
    * edited in the database.
    */
   else{
      echo "<h1>New Password Failure</h1>";
      echo "<p>There was an error sending you the "
          ."email with the new password,<br> so your password has not been changed. "
          ."<a href=\"main.php\">Main</a>.</p>";
   }
       
   unset($_SESSION['forgotpass']);
}
else{

/**
 * Forgot password form is displayed, if error found
 * it is displayed.
 */
?>

<h1>Forgot Password</h1>
A new password will be generated for you and sent to the email address<br>
associated with your account, all you have to do is enter your
username.<br><br>
<? echo $form->error("user"); ?>
<form action="process.php" method="POST">
<b>Username:</b> <input type="text" name="user" maxlength="30" value="<? echo $form->value("user"); ?>">
<input type="hidden" name="subforgot" value="1">
<input type="submit" value="Get New Password">
</form>

<?
}
?>

</body>
</html>
