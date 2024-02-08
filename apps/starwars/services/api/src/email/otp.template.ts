/*
One-time Login Passcode
Hi there,


Your one-time login passcode is {{passcode}}.


If you did not initiate the login, we recommend reviewing your account credentials and turning on 2FA.
We highly recommend configuring 2FA to avoid encountering these notifications in the future.



Thank you,


The StarWars Team
 */
export const verifyEmailTemplate = `
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
                <h2 style="margin:15px;">You have created an account with StarWars App</h2>
            </td>
        </tr>
        <tr>
            <td>
                <h2 style="margin:15px;">Your verification code is: {{verificationCode}}</h2>
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
`;
