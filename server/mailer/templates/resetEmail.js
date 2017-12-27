const resetEmail = params => {
    const { tokenLink } = params;

    return `
        <div>
            <p>Hello</p>
               
            <p>
                Please reset your account password by clicking the link below:
                <a href="${tokenLink}">${tokenLink}</a>
            </p>
                                        
            <p>
                If you did not request this email please email info@titan.com.
            </p>
                                        
            <p>
                Heres to the next step in your journey.
            </p>
            <p>
                Titan
            </p>
        </div>
        `;
};

export default resetEmail;
