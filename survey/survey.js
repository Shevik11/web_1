// Збереження значення
const setValue = (key, value) => localStorage.setItem(key, JSON.stringify(value));

// Отримання значення
const getValue = (key) => JSON.parse(localStorage.getItem(key));

const modalSurveyForm = document.getElementById('modalSurveyForm');
if (modalSurveyForm) {
    modalSurveyForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission
        saveSurveyData(); // Call the function to save survey data
    });
}

const submitButton = document.getElementById('surveybtn');
submitButton.addEventListener('click', saveSurveyData);

function saveSurveyData() {
    // Get form values
    const getValue = (id) => (document.getElementById(id)?.value || 'not provided');

    const faculty = getValue('faculty');
    const year = document.querySelector('input[name="stream"]:checked')?.value || 'not selected';
    const groupNumber = getValue('groupNumber');
    const country = getValue('country');
    const city = getValue('city');
    const playFootballRadios = document.querySelectorAll('input[name="playFootball"]');
    const playFootball = Array.from(playFootballRadios).find(radio => radio.checked)?.value || 'not selected';

    // Create an object with the survey data
    const surveyData = {
        faculty,
        year,
        groupNumber,
        country,
        city,
        playFootball
    };

    // Get existing survey data from localStorage
    let allSurveyData = getValue('allSurveyData') || [];

    // Add new survey data to the existing array
    allSurveyData.push(surveyData);

    // Store the updated survey data in localStorage
    setValue('allSurveyData', allSurveyData);

    // Display the saved survey data in the console
    console.log('Survey data saved: ', surveyData);

    // Display all survey data from localStorage in the console
    allSurveyData = getValue('allSurveyData');
    console.log('All survey data in localStorage: ', allSurveyData);

    // Optional: Display a success message or perform additional actions
    alert('Survey data saved!');

    // Call the filterByFaculty function after saving data
    filterByFaculty();
}

function redirectToPage(page) {
    window.location.href = page;
}

function filterByFaculty() {
    const faculty = document.getElementById('facultyFilter').value; // Отримуємо вибраний факультет
    const allSurveyData = getValue('allSurveyData') || []; // Отримуємо всі дані з localStorage

    // Фільтруємо дані за факультетом
    const filteredData = allSurveyData.filter(data => data.faculty === faculty);

    // Виводимо відфільтровані дані на сторінку
    const resultDiv = document.getElementById('filteredfacResults');
    resultDiv.innerHTML = ''; // Очищуємо попередні результати

    filteredData.forEach(data => {
        const p = document.createElement('p');
        p.textContent = `surveyData: ${JSON.stringify(data)}`;
        resultDiv.appendChild(p);
    });
}

function filterByGroup() {
    const group = document.getElementById('groupFilter').value;
    const allSurveyData = getValue('allSurveyData') || []; // Отримуємо всі дані з localStorage

    // Фільтруємо дані за факультетом
    const filteredData = allSurveyData.filter(data => data.groupNumber === group);

    // Виводимо відфільтровані дані на сторінку
    const resultDiv = document.getElementById('filteredgroupResults');
    resultDiv.innerHTML = ''; // Очищуємо попередні результати

    filteredData.forEach(data => {
        const p = document.createElement('p');
        p.textContent = `surveyData: ${JSON.stringify(data)}`;
        resultDiv.appendChild(p);
    });
}

function filterByYear() {
    const year = document.getElementById('yearFilter').value;
    const allSurveyData = getValue('allSurveyData') || []; // Отримуємо всі дані з localStorage

    // Фільтруємо дані за факультетом
    const filteredData = allSurveyData.filter(data => data.year === year);

    // Виводимо відфільтровані дані на сторінку
    const resultDiv = document.getElementById('filteredyearResults');
    resultDiv.innerHTML = ''; // Очищуємо попередні результати

    filteredData.forEach(data => {
        const p = document.createElement('p');
        p.textContent = `surveyData: ${JSON.stringify(data)}`;
        resultDiv.appendChild(p);
    });
}
// Викликаємо функцію filterByFaculty() при зміні вибору факультету
document.getElementById('facultyFilter').addEventListener('change', filterByFaculty);
document.getElementById('groupFilter').addEventListener('change', filterByGroup);
document.getElementById('yearFilter').addEventListener('change', filterByYear);

