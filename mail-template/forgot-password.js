
const mailTemplate = (username, url) => {
  const year = (new Date()).getFullYear();
  
  return `
    <div style="width: 400px;position: fixed; left: 50%; transform: translate(-50%, 0%); margin-top: 50px; padding: 50px; border: 1px solid #F3F3F3;">
      <div style="color:#565a5c;font-size:18px;margin:10px 0 10px 0">
        <h1 style="font-size:30px;color:#444444;font-weight:800;margin:0 0 32px 0;text-align:center;line-height:36px;">Reset Your Password</h1>
        <h2 style="color:#444;font-size:18px;margin:10px 0 24px 0; text-align:center">Hi, ${username}</h1>
        <p style="color:#565a5c;font-size:15px;margin:10px 0 10px 0;text-align:center;line-height:24px">
            You recently requested to reset your password for NIMEDIx .<br/>
            Click the button below to reset it.
        </p>
      </div>
      <p style="color:#565a5c;font-size:32px;font-weight:500;padding:10px 10px 25px 10px;text-align:center">
        <a href='${url}' target="_blank" style="border-radius: 3px; font-size: 16px; font-weight: 600; padding: 16px 26px; background-color: #58a1f6; color: #fff; text-decoration: none">Reset Password</a>
      </p>
      
      <div style="margin-top: 20px;">
        <p style="font-family: 'Inconsolata', monospace; font-size: 12px; line-height: 20px; color: #aaa;margin:0px; text-align: center;">Copyright © ${year} NIMEDIx, All rights reserved.</p>
      </div>
    </div>
  `
}

module.exports = mailTemplate;