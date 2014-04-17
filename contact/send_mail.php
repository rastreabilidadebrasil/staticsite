<?php

/*
	$send = false;
	
  if (count($_POST)>0) {
    $name=addslashes(strip_tags($_POST["name"]));
    $email=addslashes(strip_tags($_POST["email"]));
    $phone=addslashes(strip_tags($_POST["phone"]));
    $empresa=addslashes(strip_tags($_POST["empresa"]));
    $message=addslashes(strip_tags($_POST["message"]));

    $recipient  	= "robson@pilhadigital.com.br";
    $object 			= "Nova Mensagem através do formulário de contato";
    $htmlmessage 	= <<<MESSAGE
    <html>
    	<head>
     		<title>Nova Mensagem através do formulário de contato</title>
    	</head>
	    <body>
	      <style>body {font: 12px/1.2em Verdana}</style>
	      <strong>User: </strong>$name<br />
	      <strong>Phone: </strong>$phone<br />
	      <strong>Email: </strong>$email<br />
	      <p><strong>Message: </strong>$message</p>
	    </body>
    </html>
MESSAGE;

    $headers  = "MIME-Version: 1.0\n";
    $headers .= "Content-type: text/html; charset=iso-8859-1\n";
    $headers .= "From: $name <$email>\n";
    if(mail($recipient, $object, $htmlmessage, $headers)){
      $send = true;
    }
  }
  echo json_encode($send);
  
  */
$send = false;

    $name=addslashes(strip_tags($_POST["name"]));
    $email=addslashes(strip_tags($_POST["email"]));
    $phone=addslashes(strip_tags($_POST["phone"]));
    $empresa=addslashes(strip_tags($_POST["empresa"]));
    $message=addslashes(strip_tags($_POST["message"]));

$headers = "MIME-Version: 1.1\r\n";
$headers .= "Content-type: text/plain; charset=iso-8859-1\r\n";
$headers .= "From: contato@rastreabilidadebrasil.com.br\r\n"; // remetente, precisa estar no dominio da rastreabilidade Brasil
$headers .= "Reply-To: ".$name." <".$email.">";
$headers .= "Return-Path: ".$email."\r\n";

$envio = mail("alopes@rastreabilidadebrasil.com.br,contato@rastreabilidadebrasil.com.br", "SITE - CONTATO AGENDAMENTO", "Alguém entrou em contato através do site. \r\n As informações inseridas no formulário são:\r\n nome:".$name."\r\n email:".$email."\r\n Telefone:".$phone."\r\n Empresa:".$empresa."\r\n Mensagem:".$message, $headers);
 
if($envio)
{
$send = true;
}

echo json_encode($send);


?>