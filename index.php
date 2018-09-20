<head>
<title>Forever Passwords</title>
<style>
  body { background-color: gray; }
  form { text-align: center; }
  .tocenter { text-align: center; }
</style>
</head>

<body>

<h6 align='center'>Note: for off brand browsers. Calc done on emogic.com, not by JS</h6>
<h6 align='center'>based on PWCalc</h6>
<h2 align='center'>Forever Passwords</h2>

<?php
if ( $_GET["length"] )
    {
    $alias = $_GET["alias"] ; 
    $secret = $_GET["secret"] ;
    $length = $_GET["length"];   
    }
if ( $_POST["length"] )
    {
    $alias = $_POST["alias"]; 
    $secret =  $_POST["secret"];
    $length =  $_POST["length"];
    }
    
$alias = trim($alias); #no whitespace
$total = "$secret$alias";
$b =  sha1($total , 1); 
$c = base64_encode ( $b );
$c = substr($c,0,$length);
?>

<div class='tocenter'>
<form action=""  method="post" target="_top" autocomplete="off" >
    <input name='alias' placeholder="Alias eg: mysite.com : no spaces, they will be removed" size='50'> 
    <br><br>
    <input name='secret' type='password' placeholder="Secret" size='50'>
  <br> <br>
    <input name='password'  placeholder="Password" value="<? echo $c ?>" size='50'>
  <br> <br>
      <select name='length'>
        <option value="8">8</option>
        <option value="12">12</option>
        <option value="16">16</option>
        <option value="20">20</option>
        <option value="24">24</option>
        <option value="28" selected>28</option>
    </select>
  <br> <br>
<input type='submit' value='Get Password' ">
</form>
 </div>

<p class='tocenter'><a href='https://raw.githubusercontent.com/vpelss/Forever_Passwords/master/README.md' target='_blank'>Read Me / Help</a></p>
<p class='tocenter'><a href='https://github.com/vpelss/Forever_Passwords' target='_blank'>Github</a></p>
<p class='tocenter'><a href='https://www.emogic.com/' target='_blank'>by Emogic</a></p>

</body>
 
