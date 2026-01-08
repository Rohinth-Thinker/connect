import { useState } from "react";
import validateInputs from "../utils/validateInputs";

function useLogin() {
    const [loading, setLoading] = useState(false);

    const authenticate = async (inputs) => {
        try {
            setLoading(true);
            const validationStatus = validateInputs(inputs.username, inputs.password);
            if (!validationStatus.status) {
                setLoading(false);
                return validationStatus;
            }

            const response = await fetch('/api/auth/login', {
                method: 'POST',
                body: JSON.stringify(inputs),
                headers: {
                    "Content-Type": "application/json",
                },
            })

            const result = await response.json();

            setLoading(false)

            if (!response.ok) {
                return {status: false, error: result.error};
            }

            return {status: true, userID: result.userID};

        } catch(err) {
            console.log(err);
            return {status: false, error: 'Something went wrong. Try again later'};
        }        
    }

    return [loading, authenticate];
}

export default useLogin;