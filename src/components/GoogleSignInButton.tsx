"use client"; // This directive marks this as a Client Component

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Script from 'next/script';

export function GoogleSignInButton() {
  const router = useRouter();

  const handleCredentialResponse = (response: google.accounts.id.CredentialResponse) => {
    if (response.credential) {
      console.log("Encoded JWT ID token: " + response.credential);
      router.push('/dashboard');
    } else {
      console.error("Google Sign-In failed: No credential returned.");
    }
  };

  useEffect(() => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: "878645007192-2v99u1asjq74ffgn2c726utp7b64vps4.apps.googleusercontent.com",
        callback: handleCredentialResponse
      });

      const signInDiv = document.getElementById("signInDiv");
      
      // --- THE FIX IS HERE ---
      // We must ensure the element exists before trying to render the button
      if (signInDiv) {
        window.google.accounts.id.renderButton(
          signInDiv,
          { theme: "outline", size: "large", text: "continue_with", shape: "rectangular", logo_alignment: "left" }
        );
      } else {
        console.error("Could not find element with id 'signInDiv'");
      }
    }
  }, []);

  return (
    <>
      <Script src="https://accounts.google.com/gsi/client" async defer />
      <div id="signInDiv"></div>
    </>
  );
}
