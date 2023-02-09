const BASE_URL = '/api/weather'

function create(data) {
    return(
        fetch(BASE_URL, {
            method: "POST",
            body: JSON.stringify({ data }),
            headers: {"Content-Type": "application/json"},
        
    }).then((res) => {
        if(res.ok) return res.json();
        console.log(res, ' response from server is firing in API');
        
    }).catch(err => {
        res.status(400).send("Did not save to database")
    })
    
)}

export default {
    create
}