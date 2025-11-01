const API_BASE = 'http://localhost:4000';

// Handle registration
$('#registerForm').submit(function (e) {
    e.preventDefault();

    const userData = {
        user_name: $('#regName').val(),
        password: $('#regPass').val(),
        mobile: $('#regMobile').val()
    };

    $.ajax({
        url: `${API_BASE}/register-user`,
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(userData),
        success: function (res) {
            alert(res.message);
            $('#registerForm')[0].reset();
        },
        error: function (xhr) {
            alert('Error: ' + (xhr.responseJSON?.message || 'Registration failed'));
        }
    });
});

// Add appointment
$('#addAppointmentForm').submit(function (e) {
    e.preventDefault();

    const data = {
        title: $('#title').val(),
        date: $('#date').val(),
        description: $('#description').val(),
        user_id: localStorage.getItem('userId')
    };

    $.ajax({
        url: `${API_BASE}/add-appointment`,
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function (res) {
            alert(res.message);
            $('#addAppointmentForm')[0].reset();
            loadAppointments();
        },
        error: function () {
            alert('Failed to add appointment');
        }
    });
});

// Load appointments
function loadAppointments() {
    const userId = localStorage.getItem('userId');
    $.get(`${API_BASE}/appointments/${userId}`, function (appointments) {
        $('#appointmentList').empty();
        appointments.forEach(app => {
            $('#appointmentList').append(`
                <li class="list-group-item">
                    <strong>${app.title}</strong> on ${new Date(app.date).toLocaleDateString()}
                    <p>${app.description}</p>
                    <button class="btn btn-sm btn-danger" onclick="deleteAppointment('${app._id}')">Delete</button>
                </li>
            `);
        });
    });
}

// Delete appointment
function deleteAppointment(id) {
    $.ajax({
        url: `${API_BASE}/delete-appointment/${id}`,
        method: 'DELETE',
        success: function () {
            alert('Deleted');
            loadAppointments();
        }
    });

}

// Load appointments automatically on dashboard page
if (window.location.pathname.includes('dashboard.html')) {
    loadAppointments();
}
