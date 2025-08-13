import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";
import { nextCookies } from "better-auth/next-js";
import { Resend } from "resend";
import VerificationEmail from "@/components/email/emial-template";

const prisma = new PrismaClient();

const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
  emailVerification: {
    sendVerificationEmail: async ( { user, url, token }, request) => {
      const { data, error } = await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: [user.email],
        subject: 'Please verify your email address',
        react: VerificationEmail({ userName: user.name , verificationUrl: url}),
      });
    },
    sendOnSignUp:true,
  },
  database: prismaAdapter(prisma, { provider: "postgresql"}),
  emailAndPassword: { enabled: true },
  plugins: [nextCookies()] 
});
