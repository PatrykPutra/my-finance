import '../App.css'

export default function Notification({type,message}){

    return(
        <div className={`notification notification-${type}`}>
            <h4 >{`${type.toUpperCase()}!`}</h4>
            <p>{`${message}`}</p>
        </div>
    )
}