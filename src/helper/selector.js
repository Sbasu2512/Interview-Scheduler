//... returns an array of appointments for that day
function getAppointmentsForDay (state, day) {
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

function getInterview(state, interview) {
  if (!interview) {
    return null;
  }

  const interviewerInfo = state.interviewers[interview.interviewer];
  return {
    student: interview.student,
    interviewer: interviewerInfo
  }
}

//Go through an appointments object and return an array pf all the nested objects with that id
const matchIds = (appointments, ids) => {
  const matched = ids.map(id => appointments[id]);
  return matched;
}

function getInterviewersForDay(state, day) {

  let interviewersArr = [];
  // eslint-disable-next-line
  state.days.map(dayObject => {
    if (dayObject.name === day) {
      dayObject.interviewers.forEach(interviewerId => interviewersArr.push(interviewerId))
    }
  })
  return matchIds(state.interviewers, interviewersArr);
}

export default {getAppointmentsForDay, getInterview, getInterviewersForDay, matchIds}
