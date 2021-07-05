import Profile from "../components/Profile";
import useUser from "../lib/useUser"

/*
* profile component that implemented the /profile page by callinf the Profile Component.
* if user is not authenticated, they will be redirected to the /account page.
*/

const profile =() =>{
    const { user } = useUser({ redirectTo: "/account" });

  if (!user) {
    return <h1>Loading</h1>
  }
    return(
        <div>
            <Profile />
        </div>
    )
}

export default profile;