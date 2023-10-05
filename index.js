const questions = [
    {
        question: 'هل تشعرين بألم غير عادي في الثدي؟',
        key: 'q1'
    },
    {
        question: 'هل تظهر أو تسمع صدور غير عادية؟',
        key: 'q2'
    },
];

let answers = {};

function displayQuestion(index) {
    if (index < questions.length) {
        Swal.fire({
            title: questions[index].question,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'نعم',
            cancelButtonText: 'لا'
        }).then((result) => {
            if (result.isConfirmed) {
                answers[questions[index].key] = 'نعم';
            } else {
                answers[questions[index].key] = 'لا';
            }
            displayQuestion(index + 1);
        });
    } else {
        displayResults();
    }
}

function displayResults() {
    let score = 0;

    let resultText = 'نتائج الاختبار:\n';
    for (const question of questions) {
        if (answers[question.key] == 'نعم') score++;

        resultText += `${question.question}: ${answers[question.key]}\n`;
    }

    let percentage = (score / questions.length) * 100;
    if (percentage >= 50) {
        resultText += `نسبة الاصابة بسرطان الثدي: ${percentage}%\n`;
        resultText += 'ننصحك بالذهاب للمستشفى للفحص';
    }else{
        resultText += `نسبة الاصابة بسرطان الثدي: ${percentage}%\n`;
        resultText += 'لا داعي للقلق';
    }

    Swal.fire({
        title: 'النتائج',
        text: resultText,
        icon: 'info'
    });
}

window.onload = function () {


    const pieces = document.getElementsByTagName('svg');
    for (var i = 0; i < pieces.length; i++) {  // Fixed the loop condition
        let _piece = pieces[i];
        _piece.onclick = function(t) {
            if(t.target.parentElement.getAttribute('data-position') == "chest"){
                displayQuestion(0)
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
