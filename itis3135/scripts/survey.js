function addCourse() {
    const container = document.getElementById('coursesContainer');
    const courseDiv = document.createElement('div');
    courseDiv.className = 'course-entry';
    courseDiv.innerHTML = `
        <input type="text" name="courses[]" placeholder="Course name - reason for taking" required>
        <button type="button" class="delete-course" onclick="deleteCourse(this)">Delete</button>
    `;
    container.appendChild(courseDiv);
}

function deleteCourse(button) {
    const courseEntries = document.querySelectorAll('.course-entry');
    if (courseEntries.length > 1) {
        button.parentElement.remove();
    }
}

function handleSubmit(event) {
    event.preventDefault();
    
    // Validate file type
    const imageInput = document.getElementById('image');
    const file = imageInput.files[0];
    if (file) {
        const fileType = file.type.toLowerCase();
        if (!fileType.includes('jpeg') && !fileType.includes('jpg') && !fileType.includes('png')) {
            alert('Please upload only JPG or PNG images.');
            return false;
        }
    }

    // Hide form and show results
    const form = document.getElementById('introForm');
    const result = document.getElementById('result');
    
    // Create the introduction content matching your introduction.html format
    const introContent = `
        <h2 class="heading-secondary">${document.getElementById('name').value} || ${document.getElementById('mascot').value}</h2>
        
        <figure>
            <img id="uploadedImage" alt="Uploaded image" style="max-width: 300px;">
            <figcaption>${document.getElementById('imageCaption').value}</figcaption>
        </figure>

        <section class="background-info">
            <h3 class="heading-tertiary"><strong>Personal Background</strong></h3>
            <p>${document.getElementById('personalBackground').value}</p>

            <h3 class="heading-tertiary"><strong>Professional Background</strong></h3>
            <p>${document.getElementById('professionalBackground').value}</p>

            <h3 class="heading-tertiary"><strong>Academic Background</strong></h3>
            <p>${document.getElementById('academicBackground').value}</p>

            <h3 class="heading-tertiary"><strong>Background in Web Development</strong></h3>
            <p>${document.getElementById('webdevBackground').value}</p>

            <h3 class="heading-tertiary"><strong>Primary Computer Platform</strong></h3>
            <p>${document.getElementById('computerPlatform').value}</p>

            <h3 class="heading-tertiary"><strong>Courses I'm Taking, & Why</strong></h3>
            <ul>
                ${Array.from(document.getElementsByName('courses[]'))
                    .map((course) => `<li><strong>${course.value}</strong></li>`)
                    .join('')}
            </ul>

            ${document.getElementById('funnyThing').value ? `
                <h3 class="heading-tertiary"><strong>Funny Thing About Me</strong></h3>
                <p>${document.getElementById('funnyThing').value}</p>
            ` : ''}

            ${document.getElementById('anythingElse').value ? `
                <h3 class="heading-tertiary"><strong>Additional Information</strong></h3>
                <p>${document.getElementById('anythingElse').value}</p>
            ` : ''}
        </section>

        <button onclick="resetForm()" class="button">Create New Introduction</button>
    `;

    result.innerHTML = introContent;

    // Display the uploaded image
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            document.getElementById('uploadedImage').src = e.target.result;
        };
        reader.readAsDataURL(file);
    }

    form.style.display = 'none';
    result.style.display = 'block';
    return false;
}

function resetForm() {
    const form = document.getElementById('introForm');
    const result = document.getElementById('result');
    
    form.reset();
    form.style.display = 'block';
    result.style.display = 'none';
    
    // Reset courses to just one entry
    const coursesContainer = document.getElementById('coursesContainer');
    coursesContainer.innerHTML = `
        <div class="course-entry">
            <input type="text" name="courses[]" placeholder="Course name - reason for taking" required>
            <button type="button" class="delete-course" onclick="deleteCourse(this)">Delete</button>
        </div>
    `;
}
