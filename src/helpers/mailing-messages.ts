const renderQuestionEmailTemplate = (
  authorName: string,
  message: string,
  fullName: string,
  email: string,
  phone: number,
  offerName: string,
): string => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta http-equiv="x-ua-compatible" content="ie=edge">
      <title>Welcome Email</title>
    </head>

    <body>
      <div class="email">
        <h2>Hey ${authorName}!</h2>
        <p>We are glad that someone has sent a question for your offer named: <strong>${offerName}</strong></p>
        <p>Check all the details below:</p>
        
        <ul>
          <li>
            Related offer: <strong>${offerName}</strong>
          </li>
    
          <li>
            Full Name: <strong>${fullName}</strong>
          </li>

          <li>
            Email address: <strong>${email}</strong>
          </li>

          <li>
            Phone number: <strong>${phone}</strong>
          </li>

          <li>
            Question: <strong>${message}</strong>
          </li>
        </ul>

        <p>This email has been sent automatically, <strong>PLEASE DO NOT REPLY.</strong></p>
        <p>Instead of replying, please contact with the user by his email or phone number - thank you!</p>
      </div>
    </body>
    </html>
  `;
};

export { renderQuestionEmailTemplate };
