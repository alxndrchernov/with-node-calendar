export const getEvents = () => fetch('/api/events')
export const newEvent = (event) =>fetch('/api/events/create',{method:"POST",body:JSON.stringify(event),headers:{"Content-Type":"application/json"}})
export const updateEvent = (event)=>fetch('api/events/update',{method:"POST",body:JSON.stringify(event),headers:{"Content-Type":"application/json"}})
