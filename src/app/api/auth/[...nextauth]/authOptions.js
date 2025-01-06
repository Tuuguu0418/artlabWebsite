import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      authorization: {
        params: {
          scope: "email,public_profile",
        },
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log("SignIn callback triggered");
      console.log("User:", user);
      console.log("Account:", account);
      console.log("Profile:", profile);
      console.log("State passed to Facebook:", account?.state);
      if (account.error) {
        console.error("Facebook Login Error:", account.error);
        return false; // Reject the login explicitly
      }
      if (account.provider === "facebook") {
        try {
          console.log("API Request Payload:", { fbAsid: user.id });
          const response = await fetch(
            "http://api03.artlab.mn:8082/web/social/user/register",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ fbAsid: user.id }),
            }
          );
          const data = await response.json();
          console.log(data);
          if (!response.ok || !data.success) {
            console.log("Something is wrong.");
            return false;
          }
          if (response.ok && data.success) {
            console.log("Facebook signin successful");
            return true;
          }
        } catch (error) {
          console.log("Error during Facebook signin: ", error.message);
        }
        // return true;
      }
      // } else if (account.provider === "google") {
      //   try {
      //     const response = await fetch(
      //       "http://localhost:8080/web/social/user/register",
      //       {
      //         method: "POST",
      //         headers: {
      //           "Content-Type": "application/json",
      //         },
      //         body: JSON.stringify({ googleId: user.id }),
      //       }
      //     );
      //     const data = await response.json();
      //     console.log(data);
      //     if (!response.ok) {
      //       console.log("Something is wrong.");
      //       return;
      //     }
      //     if (response.ok && data.success) {
      //       console.log("Google signin successful");
      //       return;
      //     }
      //   } catch (error) {
      //     console.log("There is an error that says: ", error.message);
      //   }
      // }
      return true;
    },
  },
};
