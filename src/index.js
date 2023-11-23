document.addEventListener('DOMContentLoaded', () => {
    const dogForm = document.getElementById('dog-form');
    const tableBody = document.getElementById('table-body');
  
    function populateForm(dog) {
      const { name, breed, sex } = dog;
      dogForm.name.value = name;
      dogForm.breed.value = breed;
      dogForm.sex.value = sex;
    }
  
    function fetchAndRenderDogs() {
      fetch('http://localhost:3000/dogs')
        .then(response => response.json())
        .then(data => {
          tableBody.innerHTML = '';
          data.forEach(dog => {
            const row = document.createElement('tr');
            row.innerHTML = `
              <td>${dog.name}</td>
              <td>${dog.breed}</td>
              <td>${dog.sex}</td>
              <td><button class="edit-btn" data-id="${dog.id}">Edit</button></td>
            `;
            tableBody.appendChild(row);
          });
  
          const editButtons = document.querySelectorAll('.edit-btn');
          editButtons.forEach(button => {
            button.addEventListener('click', () => {
              const dogId = button.getAttribute('data-id');
              fetch(`http://localhost:3000/dogs/${dogId}`)
                .then(response => response.json())
                .then(dog => {
                  populateForm(dog);
                });
            });
          });
        });
    }
  
    fetchAndRenderDogs();
  
    dogForm.addEventListener('submit', event => {
      event.preventDefault();
      const dogId = ;
      const formData = new FormData(dogForm);
      const updatedDog = {
        name: formData.get('name'),
        breed: formData.get('breed'),
        sex: formData.get('sex')
      };
  
      fetch(`http://localhost:3000/dogs/${dogId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedDog)
      })
      .then(() => {
        fetchAndRenderDogs();
      });
    });
  });
  