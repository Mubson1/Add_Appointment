import {BiCalendarPlus} from "react-icons/bi";
//In the interface, at the top, there is Add Appointment button. That button on click should display or undisplay the form. For this we will be using useState
import { useState } from "react";

const AddAppointment = ({onSendAppointment, lastId}) => {
    //This will keep track of the form and will dipslay or hide the form. In default while opening the website, the form will be hidden.
    let [toggleForm, setToggleForm] = useState(false)
    //To add appointments we will need to create a new state. This state will have array that stores various data. So, on variable as set as state which is of array data type.
    const clearData = {
        ownerName: '',
        petName: '',
        aptDate: '',
        aptTime: '',
        aptNotes: ''
    }
    let [formData, setFormData] = useState(clearData)
    //Now, every input field is given an event handler.

    function formDataPublish() {
        //Here above object is just created to set how the initial array would look. It would also help to set the values of the text field as null when fields are cleared.
        //Now, the below object is created to actually add the appointment after reading the input fields.
        const appointmentInfo = {
            //Here, lastId is the highest Id that the appointments have. So, the new added appointment would have one number above the lastly added appointment. The value of this lastId would be passed through the parameter.
            id: lastId + 1,
            ownerName: formData.ownerName,
            petName: formData.petName,
            aptDate: formData.aptDate + ' ' + formData.aptTime,
            aptNotes: formData.aptNotes 
        }
        onSendAppointment(appointmentInfo); //Here, this onSendAppointment is also passed as parameter which will have its own parameter of appointmentInfo. The function will be defined while it is called in the App.js
        setFormData(clearData); //Once, the form is submitted, the filed will be cleared.
        setToggleForm(!toggleForm); //Then, once the field is cleared, the form to submit will be hidden automatically.
    }

    return (
        <div>
            {/* Here, onClick is used to find the action i.e. click of the button, and thus change the value of the useState variable i.e. toggleForm */}
        <button onClick={()=>{setToggleForm(!toggleForm)}}
            /*
                Here, the things done inside className might look weird but it is actually done for designing purpose. So, you can also leave it if you don't understand.
                So, the problem in the user interface was that the button for hidding and showing the form didn't look like a button because it was rounded in top only. But, when making completely rounded, and when the form appeared, the top part looked circular and the form was rectangular.
                Thus, the logic is when the form is not displayed the design of the button should be rounded at all corners. And when the form appeared, the button should be rounded by top only. So, this needed some if else statement and hence, we used js expression.
                The js expression is used with `` inside a curly bracket as below.
                In default, the top will only be rounded (rounded-t-md). If the toggleForm has true value, the design of the button should always be rounded on top only. But if false, it should be rounded in all corners always
                So, this all is for the design purpose only to make sure that the interface looks good.
            */
            className={`bg-blue-400 text-white px-2 py-3 w-full text-left rounded-t-md
            ${toggleForm ? 'rounded-t-md' : 'rounded-md'}`}>
            <div><BiCalendarPlus className="inline-block align-text-top" />  Add Appointment</div>
        </button>
        {/* If toggleForm is true show the things else hide them. Understand the below code as ternary if else statement */}
        {
            toggleForm &&
            <div className="border-r-2 border-b-2 border-l-2 border-light-blue-500 rounded-b-md pl-4 pr-4 pb-4">
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5">
                    <label htmlFor="ownerName" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                        Owner Name
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                        <input type="text" name="ownerName" id="ownerName"
                            //here, if there is changes to any formData i.e. input fields, then it is going to take the current value of ownerName's input field and set it in the state variable.
                            /*
                            ======================================= What does the three dots represent? ===============================================
                            The three dots is known as the spread syntax which iterate (i.e., can merge, add, etc.) the array and object.
                            Eg: if we want to add 3 and 4 in the middle of an array.
                                    Normally:
                                        var mid = [3,4];
                                        var arr = [1, 2, mid, 5,6];
                                        console.log(arr);   //Output will be [1,2,[3,4],5,6]
                                    Using the spread syntax:
                                        var mid = [3,4];
                                        var arr = [1, 2, ...mid, 5,6];
                                        console.log(arr);   //Output will be [1,2,3,4,5,6]
                            */
                            onChange={(event) => {setFormData({...formData, ownerName: event.target.value})}}
                            value={formData.ownerName}  //Remember to put the value as formData.ownerName
                            className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md" />
                    </div>
                </div>

                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5">
                    <label htmlFor="petName" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                        Pet Name
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                        <input type="text" name="petName" id="petName"
                            onChange={(event) => {setFormData({...formData, petName: event.target.value})}}
                            value={formData.petName}
                            className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md" />
                    </div>
                </div>

                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5">
                    <label htmlFor="aptDate" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                        Apt Date
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                        <input type="date" name="aptDate" id="aptDate"
                            onChange={(event) => {setFormData({...formData, aptDate: event.target.value})}}
                            value={formData.aptDate}
                            className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md" />
                    </div>
                </div>

                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5">
                    <label htmlFor="aptTime" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                        Apt Time
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                        <input type="time" name="aptTime" id="aptTime"
                            onChange={(event) => {setFormData({...formData, aptTime: event.target.value})}}
                            value={formData.aptTime}
                            className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md" />
                    </div>
                </div>

                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5">
                    <label htmlFor="aptNotes" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                        Appointment Notes
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                        <textarea id="aptNotes" name="aptNotes" rows="3"
                            onChange={(event) => {setFormData({...formData, aptNotes: event.target.value})}}
                            value={formData.aptNotes}
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md" placeholder="Detailed comments about the condition"></textarea>
                    </div>
                </div>


                <div className="pt-5">
                    <div className="flex justify-end">
                        <button type="submit" 
                            //When the button to add the appointment is clicked, it will call a function formDataPublish above
                            onClick={formDataPublish}
                            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-400 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400">
                        Submit
                        </button>
                    </div>
                </div>
            </div>
        }
      </div>
    );
}

export default AddAppointment;