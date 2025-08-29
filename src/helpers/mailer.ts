import nodemailer from 'nodemailer'
import User from "@/models/userModel";
import bcrypt from "bcryptjs"

export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        const hashedToken = await bcrypt.hash(userId.toString(), 10)
        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId,
                {
                    verifyToken: hashedToken,
                    verifyTokenExpiry: Date.now() + 3600000
                },
                {
                    new: true,
                    runValidators: true,
                    useFindAndModify: false
                }
            )
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId,
                {
                    forgotPasswordToken: hashedToken,
                    forgotPasswordTokenExpiry: Date.now() + 3600000
                })
        }

        // Looking to send emails in production? Check out our Email API/SMTP product!
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        });

        const mailOptin = {
            from: "sash@gmail.com",
            to: email,
            subject: emailType === "VERIFY"? "Verify Your Email": "Reset you Password",
           html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
           or copy and paste the link below in your browser.
           <br/> ${process.env.DOMAIN}/verifyemail?
           token=${hashedToken}
           </p>`
        }

        const mailResponce =  await transport.sendMail(mailOptin);
        return mailResponce;
    }
    catch (error: any) {
        throw new Error(error.message)
    }
}