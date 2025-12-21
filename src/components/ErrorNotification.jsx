import '../App.css'
export default function ErrorNotification({message}){

    return(
        <div className="error">
            <h4>{message}</h4>
        </div>
    )
}