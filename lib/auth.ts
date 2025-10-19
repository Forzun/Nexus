// import { betterAuth } from "better-auth";
// import { prismaAdapter } from "better-auth/adapters/prisma";
// import { PrismaClient } from "@prisma/client";
// import { nextCookies } from "better-auth/next-js";
// import { Resend } from "resend";
// import VerificationEmail from "@/components/email/emial-template";
// import PasswordResetEmail from "@/components/email/reset-email";

// const prisma = new PrismaClient();

// const resend = new Resend(process.env.RESEND_API_KEY);

// export const auth = betterAuth({
//   emailVerification: {
//     sendVerificationEmail: async ( { user, url,}) => {
//         await resend.emails.send({
//         from: 'Acme <onboarding@resend.dev>',
//         to: [user.email],
//         subject: 'Please verify your email address',
//         react: VerificationEmail({ userName: user.name , verificationUrl: url}),
//       });
//     },
//     sendOnSignUp:true,
//   },

//   socialProviders: {
//     google: { 
//         clientId: process.env.GOOGLE_CLIENT_ID as string, 
//         clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
//     }, 
//   },

//   emailAndPassword: { 
//     enabled: true,
//     sendResetPassword: async ({user, url}) => {
//     await resend.emails.send({
//       from: 'Acme <onboarding@resend.dev>',
//       to: [user.email],
//       subject: "Reset your password",
//       react: PasswordResetEmail({ userName: user.name , resetUrl: url , requestTime: new Date().toLocaleString()}),
//     });
//   },
// },
//   database: prismaAdapter(prisma, { provider: "postgresql" }),
//   plugins: [nextCookies()] 
// });

import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";
import { nextCookies } from "better-auth/next-js";
import { Resend } from "resend";
import VerificationEmail from "@/components/email/emial-template";
import PasswordResetEmail from "@/components/email/reset-email";

// Prevent Prisma from connecting during build
const prisma = process.env.VERCEL_ENV === 'production' && !process.env.DATABASE_URL?.startsWith('prisma')
  ? null
  : new PrismaClient();

const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
  emailVerification: {
    sendVerificationEmail: async ( { user, url,}) => {
        await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: [user.email],
        subject: 'Please verify your email address',
        react: VerificationEmail({ userName: user.name , verificationUrl: url}),
      });
    },
    sendOnSignUp:true,
  },

  socialProviders: {
    google: { 
        clientId: process.env.GOOGLE_CLIENT_ID as string, 
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
    }, 
  },

  emailAndPassword: { 
    enabled: true,
    sendResetPassword: async ({user, url}) => {
    await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: [user.email],
      subject: "Reset your password",
      react: PasswordResetEmail({ userName: user.name , resetUrl: url , requestTime: new Date().toLocaleString()}),
    });
  },
},
  database: prisma ? prismaAdapter(prisma, { provider: "postgresql" }) : {
    // Dummy adapter for build time
    create: async () => ({}),
    findOne: async () => null,
    update: async () => ({}),
    delete: async () => undefined,
  } as any,
  plugins: [nextCookies()] 
});