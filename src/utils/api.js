const API_URL = process.env.NEXT_PUBLIC_API_URL;


export const apiRequest = async (
    endpoint,
    options = {}
) => {

    const response = await fetch(
        `${API_URL}${endpoint}`,
        {
            ...options,
            headers:{
                "Content-Type":"application/json",
                ...options.headers
            }
        }
    );


    const data = await response.json();


    if(!response.ok){

        throw new Error(
            data.message || "Request failed"
        );

    }


    return data;

};