import { sendVerifyEmail } from './send-verify-email';

describe('sendVerifyEmail', () => {
  const setup = () => {
    const transporter = {
      sendMail: jest.fn(),
    };
    const options = {
      email: 'receiver@email.com',
      from: {
        address: 'test@email.com',
        name: 'Test',
      },
      productName: 'Test Product',
      transporter: transporter as never,
      verifyCode: '123456',
    };
    return { options, transporter };
  };

  it('should pass the expected options to the transporter', async () => {
    const { transporter, options } = setup();
    await sendVerifyEmail(options);
    expect(transporter.sendMail).toHaveBeenCalledWith({
      from: options.from,
      html: expect.any(String),
      subject: `${options.productName} - Verify Email`,
      text: 'Please confirm your email.',
      to: options.email,
    });
  });

  it('should return the expected html template', async () => {
    const { transporter, options } = setup();
    await sendVerifyEmail(options);
    const email = transporter.sendMail.mock.calls[0][0].html;
    expect(email).toMatchInlineSnapshot(`
      "
      <div style="width: 500px;background-color: rgb(175, 175, 175);overflow: hidden;border-radius: 5px;">
          <table style="width:500px;text-align:center;border-collapse:collapse;background-color:rgb(245,245,245);color:rgb(90,110,122)">
              <thead style="text-align: center;background-color: rgb(232, 100, 100);color: #fff">
              <tr>
                  <th><h1>Welcome!</h1></th>
              </tr>
              </thead>
              <tbody style="background-color: rgb(235, 235, 235)">
              <tr>
                  <td>
                      <h2 style="margin:15px;">You have created an account with Test Product</h2>
                  </td>
              </tr>
              <tr>
                  <td>
                      <h2 style="margin:15px;">Your verification code is: 123456</h2>
                  </td>
              </tr>
              <tr>
                  <td>
                      <p style="margin: 0 15px 15px;line-height: 1.25">Please confirm your email by visiting this link: <span style="white-space: nowrap">{{verifyEmailLink}}</span></p>
                  </td>
              </tr>
              <tr style="text-align: center;padding: 10px;height: 50px">
                  <td>
                      <a href="http://google.com" style="background-color: rgb(232, 100, 100);color: #fff;padding: 10px 30px;margin: 10px 20px 25px;text-decoration: none;cursor: pointer;">Log in now</a>
                  </td>
              </tr>
              </tbody>
          </table>
      </div>
      "
    `);
  });
});
