//... returns an array of appointments for that day
function getAppointmentsForDay (state, day) {
  /**
   * const filteredNames = state.users.filter(user => user.name === name);
  return filteredNames; */
  // const filteredAppoinments = state.appointments.filter(appointment => appointment.name === day)
  // return filteredAppoinments ; 

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