"use client"; // This directive marks this as a Client Component

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Script from 'next/script';

// Define the type for the credential response for TypeScript
interface CredentialResponse {
  credential?: string;
}

export function GoogleSignInButton() {
  const router = useRouter();

  const handleCredentialResponse = (response: CredentialResponse) => {
    if (response.credential) {
      console.log("Encoded JWT ID token: " + response.credential);
      // In a real app, you would send this to your backend for verification
      // For now, we'll just redirect to the dashboard
      router.push('/dashboard');
    } else {
      console.error("Google Sign-In failed: No credential returned.");
    }
  };

  useEffect(() => {
    // Manually initialize Google Sign-In when the component mounts
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: "878645007192-2v99u1asjq74ffgn2c726utp7b64vps4.apps.googleusercontent.com", // Your Google Client ID
        callback: handleCredentialResponse
      });
      window.google.accounts.id.renderButton(
        document.getElementById("signInDiv"),
        { theme: "outline", size: "large", text: "continue_with", shape: "rectangular", logo_alignment: "left" }
      );
      // Optional: Display the One Tap prompt
      // window.google.accounts.id.prompt(); 
    }
  }, []);

  return (
    <>
      <Script src="https://accounts.google.com/gsi/client" async defer />
      <div id="signInDiv"></div>
    </>
  );
}
