"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Script from 'next/script';

export function GoogleSignInButton() {
  const router = useRouter();

  const handleCredentialResponse = (response: google.accounts.id.CredentialResponse) => {
    if (response.credential) {
      console.log("Encoded JWT ID token: " + response.credential);
      router.push('/dashboard');
    }
  };

  useEffect(() => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: "878645007192-2v99u1asjq74ffgn2c726utp7b64vps4.apps.googleusercontent.com",
        callback: handleCredentialResponse
      });

      const signInDiv = document.getElementById("signInDiv");
      if (signInDiv) {
        window.google.accounts.id.renderButton(
          signInDiv,
          { 
            // --- THE FIX IS HERE ---
            type: "standard", // This property was missing
            theme: "outline", 
            size: "large", 
            text: "continue_with", 
            shape: "rectangular", 
            logo_alignment: "left" 
          }
        );
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
