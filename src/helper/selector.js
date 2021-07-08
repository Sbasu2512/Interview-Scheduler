//... returns an array of appointments for that day
export default function getAppointmentsForDay (state, day) {
 
  let appointments ;
  for(const dayObj of state.days) 
  {
    if(dayObj.name === day)
    {
      appointments = [...dayObj.appointments];
    }
  }

  if(!appointments) {
    return [] ;
  }

  // get appointment info for corresponding id in appointments array
  let dayAppointments = [];
  for (const appointment of appointments) {
    dayAppointments.push({ ...state.appointments[appointment] });
  }

  return dayAppointments;
  
}