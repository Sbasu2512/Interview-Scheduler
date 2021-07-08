//... returns an array of appointments for that day
function getAppointmentsForDay (state, day) {
  /**
   * const filteredNames = state.users.filter(user => user.name === name);
  return filteredNames; */

  const filteredAppoinments = state.appointments.filter(appointment => appointment.name === day)
  return filteredAppoinments ; 
}