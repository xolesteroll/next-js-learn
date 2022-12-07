import React from 'react';
import {NextPage} from "next";
import ContactForm from "../../components/contact/ContactForm/ContactForm";
import Head from "next/head";

const ContactPage: NextPage = () => {
    return (
        <>
            <Head >
                <title>Contact Me</title>
                <meta name='description' content='Send me a message!'/>
            </Head>
        <ContactForm />
        </>
    );
};

export default ContactPage;