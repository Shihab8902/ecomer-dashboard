const verificationCodeTemplate = (code, storeName) => {

    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
          body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f4f4f4;
              font-size: 16px;
          }
          .container {
              width: 80vw;
              max-width: 600px;
              margin: 20px auto;
              background-color: #ffffff;
              padding: 20px;
              box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
          }
            .wrapper {
                width: 100%;
                height: 200px;
                text-align: center;
                margin-top: 100px;
            }
            .store-name{
                font-size: 16px;
                font-weight: 500;
                margin: 0;
                margin-bottom : 30px;
            }
            .code{
                font-size: 24px;
                letter-spacing: 8px;
                margin: 0;
            }
          .footer {
              text-align: center;
              padding: 20px;
              background-color: #f4f4f4;
              font-size: 12px;
              color: #888;
          }
      </style>
      <title>Verification Code</title>
    </head>
    <body>
    
    <div class="container">

        <div class="wrapper">
            <h3 class="store-name">${storeName}</h3>
            <p>Your login code: </p>
            <h4 class="code">${code}</h4>
            <p>This code can only be used once. It expires in 15 minutes.</p>
        </div>
 
    
      <div class="footer">
          <p>Powered by eComer.</p>
      </div>
    </div>
    
    </body>
    </html>
    `;
}


module.exports = verificationCodeTemplate;