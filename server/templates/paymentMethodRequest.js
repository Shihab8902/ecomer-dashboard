const paymentMethodRequestTemplate = (message) => {
  return `
    
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Payment Method Request</title>
  <style>
    body{
    	font-family: Arial;
    }
  	.title-wrapper{
    	background-color: #000;
    	color: #FFF;
    	padding: 10px 30px;
    	text-align: center;
    }
    .list-wrapper{
    	margin-top: 3rem;
    }
    .list{
    	margin-bottom: 20px;
     }
    .list span {
    	font-weight: 700;
    }
    .desc{
    	margin-left: 20px;
    	font-weight: 400 !important;
    }
  </style>
</head>

<body>
  
  <div class="title-wrapper">
  	 <h1>A new payment method request arrived for eComer.</h1>
  </div>
  
  <ul class="list-wrapper">
    <li class="list"><span>Sender : </span> <a href="${message.user}">${message.user}</a></li>
    <li class="list"><span>Payment service provider name :</span>${message.providerName}</li>
     <li class="list"><span>Service provider website :</span> <a href="${message.providerWebsite}">${message.providerWebsite}</a></li>
         <li class="list"><span>Service provider API link :</span> <a href="${message.providerAPI}">${message.providerAPI}</a></li>
    <li class="list"><span>Why the payment method is needed : <br/></span> <span class="desc">${message.description}</span></li>
  </ul>
  
</body>

</html>
    
    
    `
}

module.exports = paymentMethodRequestTemplate;