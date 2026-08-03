const API =
process.env.NEXT_PUBLIC_API_URL;



export const registerUser=async(user)=>{


const res =
await fetch(
`${API}/auth/register`,
{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:
JSON.stringify(user)

}

);


return res.json();


};




export const loginUser=async(data)=>{


const res =
await fetch(
`${API}/auth/login`,
{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:
JSON.stringify(data)

}

);



return res.json();


};