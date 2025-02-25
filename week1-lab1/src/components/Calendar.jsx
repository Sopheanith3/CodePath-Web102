import React from "react";
import Event from './Event';

const Calendar = ()  => {
    return (
        <div className="Calendar">
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Sunday</th>
                        <th>Monday</th>
                        <th>Tuesday</th>
                        <th>Wednesday</th>
                        <th>Thursday</th>
                        <th>Friday</th>
                        <th>Saturday</th>
                    </tr>
                </thead>
                <tbody>
                <tr>
                    <td className="time">8 am</td>
                    <Event event="Starbucks ☕️" location="656 Michigan Ave"  color="green" />
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <Event event="Yolk 🍳" location="335 E Ohio St" color="green" />
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td className="time">9 am</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <Event event="Subway 🚆" location="Grand Station" color="pink" />
                    <td></td>
                    <td></td>
                    <Event event="The Bean 🫘" location="Millennium Park" color="blue" />
                    <td></td>
                    <td></td>
                </tr>
                <tr> 
                    <td className="time">10 am</td>
                    <td></td>
                    <Event event="River Cruise 🛥️" location="Chicago River" color="blue" />
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td className="time">11 am</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <Event event="Deep Dish 🍕" location="Giodano's" color="green" />
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td className="time">12 pm</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <Event event="Subway 🚆" location="Washington Station" color="pink" />
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td className="time">1 pm</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td className="time">2 pm</td>
                    <td></td>
                    <td></td>
                    <Event event="Art Institute 🎨" location="111 S Michgan Ave" color="blue" />
                    <td></td>
                    <Event event="Girl & the Goat" location="809 W Randolph St" color="green" />
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td className="time">3 pm</td>
                    <Event event="Cubs Game ⚾" location="Wrigley Field" color="blue" />
                    <td></td>
                    <td></td>
                    <td></td>
                    <Event event="Subway 🚆" location="Roosevelt" color="pink" />
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td className="time">4 pm</td>
                    <td></td>
                    <td></td>
                    <Event event="Fancy Dinner 🎩" location="Maple & Ash" color="green" />
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td className="time">5 pm</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <Event event="Shopping 🛍️" location="Magnificent Mile" color="blue" />
                    <td></td>
                    <td></td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}


export default Calendar;