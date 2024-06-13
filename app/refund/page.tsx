import React from 'react';
import Head from 'next/head';

const Refund = () => {
  return (
    <div>
      <Head>
        <title style={{ fontWeight: 'bold' }}>Refund Policy</title>
        <meta name="description" content="Refund Policy." />
      </Head>
      <main style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <h1 style={{ fontWeight: 'bold', marginBottom: '20px' }}>Refund Policy</h1>

        <p style={{ marginBottom: '15px' }}>
          <span style={{ fontWeight: 'bold', textDecoration: 'underline' }}>1. Eligibility</span>
          <br />
          Customers who have purchased credits are eligible for a partial refund of the credits not utilized within a 14-day period.
        </p>

        <p style={{ marginBottom: '15px' }}>
          <span style={{ fontWeight: 'bold', textDecoration: 'underline' }}>2. Refund Process</span>
          <br />
          To initiate a refund request for unutilized credits, please contact us at info@makethatmeme.com within 14 days of the payment period. Please provide your order details and provide a reason for the refund request. We will review your request and respond to you as soon as possible.
        </p>

        <p style={{ marginBottom: '15px' }}>
          <span style={{ fontWeight: 'bold', textDecoration: 'underline' }}>3. Refund Conditions</span>
          <br />
          Please note the following conditions for refund eligibility:
          <br />
          Refunds are only applicable within the first 14 days of the purchase. Only unused credits can be refunded.
          Refunds will be issued back to the original payment method used for the purchase.
          <br />
          Processing fees or transaction charges imposed by payment gateways or banks during the initial transaction will not be included in the refund amount. 
          <br />
          We reserve the right to modify or update this refund policy at any time without prior notice. It is recommended to review this policy periodically for any changes.
          <br />
          If you have any questions or need further clarification regarding our refund policy, please contact us. We are here to assist you.
        </p>

      </main>
    </div>
  );
};

export default Refund;