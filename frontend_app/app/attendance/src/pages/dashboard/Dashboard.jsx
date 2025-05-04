import AdminDashboard from "./AdminDashboard/AdminDashboard"
import StudentDashboard from "./StudentDashboard/StudentDashboard"
import TeacherDashboard from "./TeacherDashboard/TeacherDashboard"


export default function Dashboard ({user}) {  
    console.log(user)
    console.log(user?.role)

    if(user?.role==="admin"){
        return <AdminDashboard user={user}/>
    } else if(user?.role === "student"){
        return <StudentDashboard user={user}/>
    } else if(user?.role === "teacher"){
        return <TeacherDashboard user={user}/>
    } else{
        return <div>Nothing here</div>
    }
}