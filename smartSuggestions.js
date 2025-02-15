document.getElementById('cityComparisonForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Αποτροπή της ανανέωσης της σελίδας

    const traffic = parseFloat(document.getElementById('traffic').value);
    const transport = parseFloat(document.getElementById('transport').value);

    // Νέα πόλη που εισάγει ο χρήστης
    const newCity = {
        traffic_congestion_not_a_problem: traffic,
        public_transport_satisfactory: transport,
    };

    // Υπολογισμός ομοιότητας
    const similarCities = calculateSimilarity(newCity, cityData);

   // Εμφάνιση αποτελέσματος
    const mostSimilar = similarCities[0];
    document.getElementById('results').innerHTML = `
    <p>The most similar city is <strong>${mostSimilar.city}</strong>, located in <strong>${mostSimilar.country}</strong> and has SCR <strong>${mostSimilar.smart_city_ranking}</strong>.</p>
    <p>You can adopt similar strategies to improve mobility!</p>`;


});

// Συνάρτηση υπολογισμού ομοιότητας
function calculateSimilarity(newCity, cityData) {
    return cityData
        .map(city => {
            const distance = Math.sqrt(
                Math.pow(city.traffic_congestion_not_a_problem - newCity.traffic_congestion_not_a_problem, 2) +
                Math.pow(city.public_transport_satisfactory - newCity.public_transport_satisfactory, 2)
            );
            return { city: city.city, country: city.country, smart_city_ranking: city.smart_city_ranking, distance };
        })
        .sort((a, b) => a.distance - b.distance); // Ταξινόμηση κατά ομοιότητα
}
