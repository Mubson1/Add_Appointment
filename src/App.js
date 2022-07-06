//Here, we are importing the icons to be used which can be found by searching react icons
import { BiCalendar } from "react-icons/bi";
import Search from "./components/Search";
import AddAppointment from "./components/AddAppointment";
import AppointmentInfo from "./components/AppointmentInfo";
import {useState, useEffect, useCallback} from 'react';

function App() {
  //We are using useState to create a list of data
  let [appointmentList, setAppointmentList] = useState([]);
  //We are creating another local state for searching. Here, query contains value whatever is searched in search bar.
  let [query, setQuery] = useState("");
  
  //Now to make the dropdown items of sorting functional, we create two new states. Then, we will add a sort method to the filteredAppiontment as it is the one that is used for displaying the changing lists.
  let [sortBy, setSortBy] = useState("petName");  //In default the category on which the appointment will be sorted is petName
  let [orderBy, setOrderBy] = useState("asc");  //In default the order in which the appointment is going to be seen in ascending.

  /*
    How the search fileter should work like is: first the list of appointmentInfo is shown. But, when something is searched, appointments containing words matching that search should only be displayed. Others should not be.
    So, for this a new array is created that contains the filtered appointments because our origingal array, i.e, appointmentList should not be changed which contains all the details of the appointments.
  */
 //Our new filteredAppiontments array is equal to the appointmentList and then we will filter it which will only show the appointments that are affected by the query
  const filteredAppointments = appointmentList.filter(
    //Here, item is a temporary item variable
    item => {
      return (
        /*
          Here, all the letters are changed to lowercase to disregard the alphabets.
          .includes is the one that helps for searching the appointments.
          So, what happening is the data from appointmentList is compared to the query variable that we have created above. This query will have whatever is wrrtten on search bar.
          Finally, when something is searched, not just pet name, but all the info like ownerName, aptNotes are compared and filtered.
        */
        item.petName.toLowerCase().includes(query.toLowerCase()) ||
        item.ownerName.toLowerCase().includes(query.toLowerCase()) ||
        item.aptNotes.toLowerCase().includes(query.toLowerCase())
      )
    }
    //sort function is expected to return a negative value if the first argument is less than the second argument, zero if they're equal, and a positive value otherwise.
  ).sort((a,b) => 
  // So, a function is made to check the values of a and b. If function returns -1, a is small. If retuns 1, b is small.
  //assume a=1 and b=3 and orderBy=asc. So, order will be 1 and as 1<3, order will be multiplied by -1 and function will return -1. So, it will sort as a first and then b second.
  //But, if a=3 and b=1 and orderBy=asc. Order will be same 1 and as 3!<1, order will be multiplied by 1 and function will return 1. So, it will sort as b first and a second.
  //In another case, if a=1 and b=3 and orderBy!=asc, order will be -1. As 1<3, order will be multiplied by -1 and function will return 1. So, it will sort as b first and a second.
  //===========This is just the algorithm. Now, we will make sure that upon interaction with the dropdown of the app, funciton will happen. So, we will make certain changes in the search.js and the parameters we pass below when calling search============
  {
    let order = (orderBy === "asc") ? 1: -1;  //if orderBy is asc, then value of order will be 1, else -1
    return (
      a[sortBy].toLowerCase() < b[sortBy].toLowerCase() ?
        -1 * order : 1 * order
    );
  })

  //Here we are retrieving the data and asking useCallback to monitor any changes that happen to the data.
  const fetchData = useCallback(() => {
    //Here, the location of data.json is in the current directory but is not actually there as it is kept in public folder.
    //But, as anything in the public folder will just appear at the same level as your application, it is done so.
    fetch('./data.json')
    //When we receive the data, it will be in text. But we want that data to be kept in the json file format as we are working in data.json
      .then(response => response.json())
    //Here all the received data are placed in the appointment array using setAppointmentList. Here, 'data' is the parameter.
      .then(data => {setAppointmentList(data)})
  }, []);

  //Now, to track the data and track any changes to the data, we will be using useEffect
  //What we are doing here is: we are issuing a fechData function defined above and we will ask the useEffect to keep the track of any changes and update our application automatically.
  useEffect(() => {
    fetchData()
  }, [fetchData]);//Here fetchData is given as dependency as everytime the fetchData is changed, the useEffect is executed.

  return (
    //we are adding container which creates a grid. 
    //Then mx-auto centers the grid on the screen. If not used, everything will be aligned left
    //mt-3 is margin top
    //all the fonts will have thin font by default.
    <div className="App container mx-auto mt-3 font-thin">
      {/* Again, we are using tailwind in h1.
          We are keeping the text size 5xl and making sure that the icon and text appear in same line of flex using inline-flex
          In AiFillAudio, we made the color of the icon red with color depth of 400*/}
      <h1 className="text-5xl inline-flex mb-3">
        <BiCalendar className="text-red-400" />Your Appointment
      </h1>
      <AddAppointment
        //Here, myApointment will have all the details of the input fields which will be added in the apointment list using the appointmentList function created in the useState above.
        //The three dot below is saying we will be adding the newly created appointmet at the end of the appointmentList
        onSendAppointment={myAppointment => setAppointmentList([...appointmentList, myAppointment])}
        /*
        ===================== What is the uses of reduce? ==========================================
        The reduce() method reduces all the elements in an array into a single output value. The output value can be a number, object, or string. reduce() method has two arguments. The first one is a callback function and the second one is the initial value.
        (max, item) => Number(item.id) > max ? Number(item.id) : max is the first argument which is the call back function.
        0 at the last is the second argument which is the initial value of the max.
        So, what happening below is: each list's id is compared to the max value. If the id is greater than max, return id else return max. In this way, the maximum id will be found.
        Also, we are using Number for string conversion as the data from the data.json will be received in string. So, to compare it, the string is changed to the number data type.
        */
        lastId={appointmentList.reduce((max, item) => Number(item.id) > max ? Number(item.id) : max, 0)}
      />
      <Search 
        query={query} //Here, left query is the parameter query of the component and the right query is the local query that we have created using useState above. Right now, the parameter query is having "" as value
        //Remember that the onQueryChange already has a parameter which we have declared in the search function. The value of this parameter is whatever string that is in the search bar.
        onQueryChange={
          //Here, myQuery is parameter of the arrow function which has the value of whatever is written in the search bar. So, using setQuery, the state will have the value updated from the initial "" to "<thing wrintten on the searchbar>". Now, we will create a sepearte array filtered appointment above.
          myQuery => setQuery(myQuery)
        }
        //For sorting the values, we will pass few more parameters to the search.
        sortBy={sortBy} //Here, left orderBy is the parameter of search which value is set to the local orderBy which in this case is the asc
        onSortByChange={mySort => setSortBy(mySort)}  //Now, mySort has the value of whatever is selected on the dropdown. So, when on event change, say for eg. user selected desc, the sorting will be changed from asc to desc.
        orderBy={orderBy}
        onOrderByChange={myOrder => setOrderBy(myOrder)}
        //Now, we need to make sure that these new added parameters be wrritten down on the search function when declaring.
      />

      {/* Now showing the list of data from the json file we cretaed-data.json */}
      {/* We are using unordered list and divide-y is dividign those data vertically and the color is gray between those data */}
      {/* 
      ===========================================Here, what's happening is:=====================================================
      We are taking all the data from the data.json file and mapping it to a arrow function. That arrow function creates an interface or component where data is displayed with design.
      So, first one data is fetched or mapped and then displayed in that particular design which is returned from arrow function. Then other data are also shown with the same design.
      */}
      <ul className="divide-y divide-gray-200">
        {/* Our app will show the info about the list of appointments which may change upon something searched. So, filteredAppointment is used below instead of appointmentList. Think of filteredAppointment as an array that changes and appointmentList as an array that doesn't change. */}
        {filteredAppointments.map(appointment => (
          // Here, In AppointmentInfo function, a parameter called appointmet is passed. All the values from the data.json are passed through it. Key is defined to remove any errors showning in the browser.
          <AppointmentInfo key={appointment.id}
          appointment={appointment}
          onDeleteAppointment={
            //Here, the function has appointmentID as parameter. This funciton uses our setAppointmentList as a part of our state management.
            //We will take the appointmentList and use the js fileter method to remove any items that match the id that we have passed.
            //For this we will receive the id passed in the appointment parameter
            //A fillter method creates a new array filled with elements that pass a given condition. So, we are saying !== as we want everything in the array but not what we have passed because it shoudl be deleted. 
            appointmentId => 
              setAppointmentList(appointmentList.filter(appointment => 
                appointment.id !== appointmentId))
          }/>
        ))}
      </ul>
    </div>
  );
}

export default App;
