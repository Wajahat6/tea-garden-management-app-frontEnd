import profile_image from './user_profile_image.png'
import "./stylesheets/profile.css"

export default function Profile(){
    let user;
    try{
        user=JSON.parse(localStorage.getItem('user'))
        console.log(user)
    } catch(e){
        console.log(e)
        window.history.replaceState('page1', 'Title', '/');
        window.location.reload()
    }
    
    return (
        <>
            <div class="container"> 
                <img id="profile_image" src={user.image||profile_image} alt={'Profile Image'}></img>
                <h2 id="username">{user.name}</h2>
                <table>
                    <tr>
                        <td class="heading">Phone Number</td>
                        <td>{user.phone}</td>
                    </tr>
                    <tr>
                        <td class="heading">Profession</td>
                        <td>{user.profession}</td>
                    </tr>
                    <tr>
                        <td class="heading">Garden ID</td>
                        <td>{user.gardenid}</td>
                    </tr>
                    <tr>
                        <td class="heading">Database access permission</td>
                        <td>{user.db_role}</td>
                    </tr>
                    </table>
            </div>
        </>
    )
}