import React, { useLayoutEffect } from 'react';

export default function LoginWithGoogle() {

    const handleGoogle = async (response) => {
        console.log('--> handleGoogle');
        console.log(response);

        // TODO -> send credential to API for verification and sign out if user is not in DB
    };


    useLayoutEffect(() => {
        if (window.google) {
            // eslint-disable-next-line no-undef
            google.accounts.id.initialize({
                client_id: import.meta.env.FF_GOOGLE_OAUTH_CLIENT_ID,
                callback: handleGoogle,
            });

            // eslint-disable-next-line no-undef
            google.accounts.id.renderButton(document.getElementById('sign-in-div'), {
                type: 'standard',
                theme: 'filled_blue',
                size: 'medium',
                text: 'signin_with',
                shape: 'rectangular',
                // logo_alignment: 'left',
            });
        }
    });

    return (
        <div id="sign-in-div" className="g_id_signin" />
    );
}
