import {BiTrash} from "react-icons/bi";

//Here, the value of appointment is found from the App.js when this function is called with the parameter value of the data.json file.
const AppointmentInfo = ({appointment, onDeleteAppointment}) => {
    return(
        <li className="px-3 py-3 flex items-start">
            {/*On click, we are using a function that calls a function, onDeleteAppointment with the id of the appointment. This function is used as a parameter itself which is defined in the app.js when calling appointmentInfo */}
            <button  onClick={() => onDeleteAppointment(appointment.id)} type="button" className="p-1.5 mr-1.5 mt-1 rounded text-white bg-red-500 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <BiTrash />
            </button>
            <div className="flex-grow">
                <div className="flex items-center">
                    {/* A span tag in html highlights the text */}
                    <span className="flex-none font-medium text-2xl text-blue-500">{appointment.petName}</span>
                    <span className="flex-grow text-right">{appointment.aptDate}</span>
                </div>
                <div>
                    <b className="font-bold text-blue-500">Owner:</b>
                    {appointment.ownerName}
                </div>
                <div className="leading-tight">{appointment.aptNotes}</div>
            </div>
        </li>
    );
    
}

export default AppointmentInfo;