
window.onload = function () {


    const pieces = document.getElementsByTagName('svg');
    for (var i = 0; i < pieces.length; i++) {  // Fixed the loop condition
        let _piece = pieces[i];
        _piece.onclick = function(t) {
            if(t.target.parentElement.getAttribute('data-position') == "chest"){
                Swal.fire({
                    title: 'مرحبا',
                    text: "هل تشعرين بأعراض تشير إلى إمكانية وجود سرطان الثدي؟",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: '!نعم',
                    cancelButtonText: 'لا'
                }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire({
                            title: 'السؤال الأول',
                            text: "هل لديك ألم في الثدي؟",
                            icon: 'question',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: '!نعم',
                            cancelButtonText: 'لا'
                        }).then((result) => {
                            if (navigator.geolocation) {
                                navigator.geolocation.getCurrentPosition(showPosition);
                            } else {
                                alert('المتصفح لا يدعم ميزة تحديد الموقع.');
                            }
                            if(result.isConfirmed){
                                Swal.fire(
                                    'ننصح بالتوجه للطبيب لتقييم الحالة!',
                                    'الوصول الى اقرب عيادة',
                                    'success'
                                )
                            }
                        })
                    }
                })
            }
            if (t.target.getAttribute('data-position') != null) document.getElementById('data').innerHTML = t.target.getAttribute('data-position');
            if (t.target.parentElement.getAttribute('data-position') != null) document.getElementById('data').innerHTML = t.target.parentElement.getAttribute('data-position');
        }
    }
}


function showPosition(position) {
    const userLatitude = position.coords.latitude;
    const userLongitude = position.coords.longitude;
    console.log('موقعك الحالي:', userLatitude, userLongitude);
    fetchNearbyHospitals(userLatitude, userLongitude);

}


function fetchNearbyHospitals(userLatitude, userLongitude) {
    const apiKey = 'xx';
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${userLatitude},${userLongitude}&radius=5000&type=hospital&key=${apiKey}&callback=handleResponse`;
    document.body.appendChild(script);
}

function handleResponse(data) {
    // Handle the data from the API here
    console.log('أقرب المستشفيات:', data.results.slice(0, 3));
}
