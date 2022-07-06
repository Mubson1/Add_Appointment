import {BiSearch, BiCaretDown, BiCheck} from "react-icons/bi"
import { useState } from "react";

//Creating a drowdown menu
/*
    Now once we have made sure that on click of a button, the form appears and diseapaears, we need to do the same for the drop down menu.
    Up until now, the drop down menu was consitently showing. It was not shown when the button was clicked but was always there. So, it should hide and when on click should appear.
    To do so, it is almost similar to that of the previous appointment's form appear and disapear. First we will be importing useState.
    Now understand that the DropDown only contains the list of things that are present inside the useState. The button is actually present in another component i.e., search. So, we will be calling useState there.
*/
const DropDown = ({toggle, sortBy, onSortByChange, orderBy, onOrderByChange}) => {
    if(!toggle){
        return null;
    }
    return (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                <div onClick={() => onSortByChange('petName')}
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex justify-between cursor-pointer" role="menuitem">
                    Pet Name
                    {/* Now, we need to make sure that the check mark will appear only when the dropdown item is clicked. */}
                    {(sortBy==='petName') && <BiCheck />}
                </div>
                <div onClick={() => onSortByChange('ownerName')}
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex justify-between cursor-pointer" role="menuitem">
                    Owner name
                    {(sortBy==='ownerName') && <BiCheck />}
                </div>
                <div onClick={() => onSortByChange('aptDate')}
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex justify-between cursor-pointer" role="menuitem">
                    Date
                    {(sortBy==='aptDate') && <BiCheck />}
                </div>
                <div onClick={() => onOrderByChange('asc')}
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex justify-between cursor-pointer border-gray-1 border-t-2" role="menuitem">
                    Asc
                    {(orderBy==='asc') && <BiCheck />}
                </div>
                <div onClick={() => onOrderByChange('desc')}
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex justify-between cursor-pointer" role="menuitem">
                    Desc
                    {(orderBy==='desc') && <BiCheck />}
                </div>
            </div>
        </div>
    );
}

//Creatign a search button
const Search = ({query, onQueryChange,sortBy, onSortByChange, orderBy, onOrderByChange}) => {
    let [toggleSort, setToggleSort] = useState(false);
    return(
        //py is padding top and buttom
        <div className="py-5">
            <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <BiSearch />
                    <label htmlFor="query" className="sr-only" />
                </div>
                {/*
                    When user types certain thing the app's search bar, code should display the matched content 
                    For this, onChange event is created which will have event variable. This variable will be created for every change in the search bar.
                    On certain change in the search bar, it will triger an arrow function that calls onQUeryChange(event.target.value). This event.target.value sets the event variable with whatever string is written in the search bar. Basically it is: onQueryChange(<whatever is written on the serach bar>)
                    Here, the value of the search bar is tracked every time. So, for this the value={query} must be set for tracking whatever is there on the search bar.
                    Remember, when somebody is typing something in the search bar, the whole app component is changed i.e., the appointment info is going to be changed as per search. In short, when somebody types in this search, the larger app component is going to be changed. So, we will be passing query and onQueryChange on the parameter of this search function.
                    Now, we will go to the app.js where we had called the search component. We will also be creating new useState.
                */}
                <input type="text" name="query" id="query" value={query}
                    onChange={(event) => {onQueryChange(event.target.value)}}
                    className="pl-8 rounded-md focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300" 
                    placeholder="Search" />

                <div className="absolute inset-y-0 right-0 flex items-center">
                    <div>
                        {/* Now, on click of the button the value of the toggle togglesort should be reversed. */}
                        <button type="button" onClick={()=>{setToggleSort(!toggleSort)}} className="justify-center px-4 py-2 bg-blue-400 border-2 border-blue-400 text-sm text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center" id="options-menu" aria-haspopup="true" aria-expanded="true">
                            Sort By <BiCaretDown className="ml-2" />
                        </button>
                        {/* 
                            Now, the items of the dropdown are the ones that should be hidden and displayed. So, instead of hiding and displaying this search components, we have to hide and display the dropdown components. 
                            Thus we do so by passing the current reversed value of toggle variable after the button has been clicked. 
                            If the value after button click is true then show the drop down items if not show null.
                            This if else statement will be added in the dropdown component above.
                        */}
                        <DropDown toggle={toggleSort}
                        //As dropdown component is shown by the search component, we first have to do the same thing that we did while calling the search function in app.js 
                            sortBy={sortBy}
                            //Here, onSortByChange in left is the parameter
                            onSortByChange={mySort => onSortByChange(mySort)}
                            orderBy={orderBy}
                            onOrderByChange={myOrder => onOrderByChange(myOrder)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Search;