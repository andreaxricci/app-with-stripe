// pages/terms.js
import React from 'react';
import Head from 'next/head';

const Terms = () => {
  return (
    <div>
      <Head>
        <title style={{ fontWeight: 'bold' }}>Terms and Conditions</title>
        <meta name="description" content="Terms and Conditions for using our website and services." />
      </Head>
      <main style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <h1 style={{ fontWeight: 'bold', marginBottom: '20px' }}>Terms and Conditions</h1>

        <p style={{ marginBottom: '15px' }}>
          <span style={{ fontWeight: 'bold', textDecoration: 'underline' }}>1. Introduction</span>
          <br />
          Welcome to makethatmeme.com. By using our website and services, you agree to comply with and be bound by the following terms and conditions. Please review them carefully.
        </p>

        <p style={{ marginBottom: '15px' }}>
          <span style={{ fontWeight: 'bold', textDecoration: 'underline' }}>2. Acceptance of Terms</span>
          <br />
          By accessing and using our website, you accept and agree to be bound by these terms and conditions, our <a href="/privacy" style={{ textDecoration: 'underline' }}>Privacy Policy</a>, and any other legal notices or guidelines posted on the website. If you do not agree with these terms, you should not use our services.
        </p>

        <p style={{ marginBottom: '15px' }}>
          <span style={{ fontWeight: 'bold', textDecoration: 'underline' }}>3. Description of Service</span>
          <br />
          Our website allows users to upload a picture of their face and an image of a known meme to generate a personalized meme with the face swap functionality. Users can also add overlay text to the generated image.
        </p>

        <p style={{ marginBottom: '15px' }}>
          <span style={{ fontWeight: 'bold', textDecoration: 'underline' }}>4. User Conduct and Responsibilities</span>
          <br />
          You agree not to use our website for any unlawful purpose or in any way that could harm our services or reputation. Specifically, you agree not to:
        </p>
        <ul style={{ marginBottom: '15px', listStyleType: 'disc', paddingLeft: '20px' }}>
          <li style={{ marginBottom: '10px' }}>Upload any image that infringes on any third party’s intellectual property rights or privacy rights.</li>
          <li style={{ marginBottom: '10px' }}>Upload any image that is offensive, obscene, defamatory, or otherwise inappropriate.</li>
          <li style={{ marginBottom: '10px' }}>Use the generated images for any malicious, harmful, or illegal activities.</li>
        </ul>

        <p style={{ marginBottom: '15px' }}>
          <span style={{ fontWeight: 'bold', textDecoration: 'underline' }}>5. Intellectual Property Rights</span>
          <br />
          You affirm that you own or have the necessary licenses, rights, consents, and permissions to upload and use the images you provide. You grant makethatmeme.com a non-exclusive, royalty-free, worldwide license to use, display, reproduce, and distribute the images for the purpose of providing our services.
        </p>

        <p style={{ marginBottom: '15px' }}>
          <span style={{ fontWeight: 'bold', textDecoration: 'underline' }}>6. Privacy</span>
          <br />
          We are committed to protecting your privacy. Please review our Privacy Policy to understand our practices regarding the collection and use of your personal information.
        </p>

        <p style={{ marginBottom: '15px' }}>
          <span style={{ fontWeight: 'bold', textDecoration: 'underline' }}>7. Disclaimer of Warranties</span>
          <br />
          Our services are provided "as is" without any warranties of any kind, either express or implied. We do not warrant that the services will be uninterrupted or error-free, nor do we make any warranty as to the results that may be obtained from the use of our services.
        </p>

        <p style={{ marginBottom: '15px' }}>
          <span style={{ fontWeight: 'bold', textDecoration: 'underline' }}>8. Limitation of Liability</span>
          <br />
          To the fullest extent permitted by law, makethatmeme.com shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from:
        </p>
        <ul style={{ marginBottom: '15px', listStyleType: 'disc', paddingLeft: '20px' }}>
          <li style={{ marginBottom: '10px' }}>Your use or inability to use our services.</li>
          <li style={{ marginBottom: '10px' }}>Any unauthorized access to or use of our servers and/or any personal information stored therein.</li>
          <li style={{ marginBottom: '10px' }}>Any interruption or cessation of transmission to or from our services.</li>
          <li style={{ marginBottom: '10px' }}>Any bugs, viruses, trojan horses, or the like that may be transmitted to or through our services by any third party.</li>
        </ul>

        <p style={{ marginBottom: '15px' }}>
          <span style={{ fontWeight: 'bold', textDecoration: 'underline' }}>9. Indemnification</span>
          <br />
          You agree to indemnify and hold harmless makethatmeme.com, its affiliates, officers, directors, employees, agents, and licensors from any claims, damages, liabilities, costs, and expenses (including reasonable attorneys' fees) arising out of or related to your use of our services, your violation of these terms, or your violation of any rights of another.
        </p>

        <p style={{ marginBottom: '15px' }}>
          <span style={{ fontWeight: 'bold', textDecoration: 'underline' }}>10. Modifications to Terms</span>
          <br />
          We reserve the right to modify these terms and conditions at any time. Any changes will be posted on this page, and your continued use of our services after such changes have been posted constitutes your acceptance of the new terms.
        </p>

        <p style={{ marginBottom: '15px' }}>
          <span style={{ fontWeight: 'bold', textDecoration: 'underline' }}>11. Governing Law</span>
          <br />
          These terms and conditions are governed by and construed in accordance with the laws of Switzerland, without regard to its conflict of law principles. Any legal action or proceeding arising under these terms will be brought exclusively in the federal or state courts located in Switzerland and the parties irrevocably consent to the personal jurisdiction and venue therein.
        </p>

        <p style={{ marginBottom: '15px' }}>
          <span style={{ fontWeight: 'bold', textDecoration: 'underline' }}>12. Contact Information</span>
          <br />
          If you have any questions about these terms and conditions, please contact us at info@makethatmeme.com.
        </p>
      </main>
    </div>
  );
};

export default Terms;
