document.getElementById('form-search').addEventListener('submit', function(event) {
    event.preventDefault(); // Предотвращаем отправку формы
    document.getElementById('text-search').value = '';
    alert('Форма не отправлена!');
});

function showErrorAlert(pageName){
    alert(`Раздел "${pageName}" Недоступен!`);
}
