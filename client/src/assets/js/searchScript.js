const tmEventSearch = async (e) => {
    
    e.preventDefault();

    const payload = {
        keyword: $("#keyword").val().trim(),
        startDate: $("#startDate").val().trim(),
        endDate: $("#endDate").val().trim(),
        location: $("#location").val().trim(),
    }

    const response = await fetch("/events/ticketMasterSearch", {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET',
        body: JSON.stringify(payload)
    }).then(res => res.json()).catch(err => console.error(err));

};

//document.querySelector('#btnSubmit').addEventListener('click', tmEventSearch);