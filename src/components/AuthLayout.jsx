import React, {useEffect,useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
export default function Protected({children, authentication=true}) {
const navigate=useNavigate()
const [loader,setLoader]= useState(true)
const authStatus= useSelector(state=>state.auth.status)
useEffect(()=>{
if(authentication && authStatus !== authentication){
navigate("/login")
}
else if(!authentication && authStatus !== authentication){
    navigate("/")
}
setLoader(false)
},[authStatus,navigate,authentication])
  return loader ? <h1>Loading....</h1>:<>{children}</>
}

/*The Protected component in your code is designed to conditionally render child components based on authentication status, and to redirect users if they do not meet the required authentication criteria for accessing a particular route. This is crucial for maintaining security and access controls within an application. Let’s delve into how different cases of authStatus and authentication are handled, and why using the authentication prop in conjunction with authStatus is essential:

Understanding authStatus and authentication
authStatus: Typically a boolean or a similar indicator fetched from the Redux store that represents whether the user is currently authenticated. True means the user is logged in, false or undefined otherwise.
authentication: A prop for the Protected component that specifies whether the route should be accessible to authenticated users (true) or should be specifically for unauthenticated users (false).
Breakdown of Use Cases:
Let's consider different scenarios to illustrate how the component operates:

Authenticated Route (authentication = true)

User is authenticated (authStatus = true): No redirection occurs, and the children are rendered. This is the desired behavior as authenticated users should have access to authenticated routes.
User is not authenticated (authStatus = false): Redirects to /login. This ensures that only authenticated users can access routes that require authentication.
Unauthenticated Route (authentication = false)

User is authenticated (authStatus = true): Redirects to /. This might be used to prevent logged-in users from revisiting login or signup pages.
User is not authenticated (authStatus = false): No redirection occurs, and the children are rendered. This is correct as the route is intended for unauthenticated users.
Why We Need authentication Alongside authStatus:
Role-Based Access Control: The authentication prop allows the component to handle routes that have different access requirements based on user authentication. Without this prop, the component would either always redirect unauthenticated users or always allow access regardless of authentication status, which is not suitable for most applications.

Handling Redirects for Different States: By evaluating both authentication and authStatus, the component can decide not only whether a user is authenticated but also whether they should have access to a given route. This is important for:

Preventing authenticated users from accessing routes meant for unauthenticated users (like login or registration pages).
Redirecting unauthenticated users to login when trying to access routes that require authentication.
Flexibility and Security: This approach provides a flexible yet secure method to control access to various parts of an application. It ensures that each route can enforce its own access requirements dynamically based on the current user state.

Conclusion
By using both authentication and authStatus, the Protected component can dynamically handle navigation and access control based on the user's current authentication state and the requirements of the route. This makes the application more secure and user-friendly by ensuring that users are only able to access content that is appropriate for their authentication status. This mechanism is crucial for any application with areas that require user authentication or are intended only for unauthenticated visitors.*/