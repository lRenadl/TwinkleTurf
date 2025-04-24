
/* --- HOME PAGE --- */
document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
  }

  const toggleSwitch = document.getElementById('theme-toggle');
  const body = document.body;
  const modeLabel = document.getElementById('mode-label');

  if (toggleSwitch && modeLabel) {
    if (localStorage.getItem('theme') === 'dark') {
      body.classList.add('dark-mode');
      toggleSwitch.checked = true;
      modeLabel.textContent = 'Light Mode';
    } else {
      modeLabel.textContent = 'Dark Mode';
    }

    toggleSwitch.addEventListener('change', () => {
      body.classList.toggle('dark-mode');

      if (toggleSwitch.checked) {
        localStorage.setItem('theme', 'dark');
        modeLabel.textContent = 'Light Mode';
      } else {
        localStorage.removeItem('theme');
        modeLabel.textContent = 'Dark Mode';
      }

      // ✅ REAPPLY THEME STATE TO OTHER ELEMENTS
      const themeToggle = document.getElementById("theme-toggle");
      const themeModeText = document.getElementById("mode-label");

      const savedTheme = localStorage.getItem("theme");
      if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
        if (themeToggle) themeToggle.checked = true;
        if (themeModeText) themeModeText.textContent = "Dark";
      } else {
        document.body.classList.remove("dark-mode");
        if (themeToggle) themeToggle.checked = false;
        if (themeModeText) themeModeText.textContent = "Light";
      }
    });
  }
});




  const tooltip = document.getElementById("tooltip");
  const reviewCards = document.querySelectorAll(".review-card");

  if (tooltip && reviewCards.length > 0) {
    reviewCards.forEach(card => {
      card.addEventListener("mouseenter", () => {
        tooltip.innerHTML = `
          <strong>Parent:</strong> ${card.dataset.customer}<br>
          <strong>Activity:</strong> ${card.dataset.activity}<br>
          <strong>Rating:</strong> ${card.dataset.rating}<br>
          <strong>Feedback:</strong> ${card.dataset.feedback}
        `;
        tooltip.style.display = "block";
      });

      card.addEventListener("mousemove", (e) => {
        const spacing = 15;
        const tooltipWidth = 250;
        let top = e.clientY + window.scrollY + spacing;
        let left = e.clientX + window.scrollX + spacing;
        if (left + tooltipWidth > window.innerWidth) {
          left = e.clientX + window.scrollX - tooltipWidth - spacing;
        }
        tooltip.style.top = `${top}px`;
        tooltip.style.left = `${left}px`;
      });

      card.addEventListener("mouseleave", () => {
        tooltip.style.display = "none";
      });
    });
  }

 /* --- PARENT DASHBOARD --- */
const sortSelect = document.getElementById('sort-kids');
const kidsContainer = document.querySelector('.kids-cards');

if (sortSelect && kidsContainer) {
  const defaultKids = [
    { name: "Kayan", age: 5, activities: 2, image: "images/Kid1.jpeg" },
    { name: "Hanay", age: 13, activities: 5, image: "images/Kid2.jpeg" },
    { name: "Essa", age: 3, activities: 1, image: "images/Kid3.jpeg" }
  ];

  function loadKids() {
    const stored = localStorage.getItem('kids');
    if (stored) {
      return JSON.parse(stored);
    } else {
      localStorage.setItem('kids', JSON.stringify(defaultKids));
      return defaultKids;
    }
  }

  function renderKids(kids) {
    const preserved = Array.from(kidsContainer.children).filter(child =>
      child.classList.contains("button-link") ||
      child.classList.contains("sort-container")
    );
  
    kidsContainer.innerHTML = '';
    preserved.forEach(el => kidsContainer.appendChild(el));
  
    kids.forEach(kid => {
      const card = document.createElement('div');
      card.className = 'kid-card';
      card.innerHTML = `
        <img class="kid-photo" src="${kid.image}" alt="Kid Image">
        <p><em>${kid.name}</em></p>
        <p><em>${kid.age} years old</em></p>
        <p><em>Activities: ${kid.activities || 0}</em></p>
      `;
      kidsContainer.appendChild(card);
    });
  }
  

  function sortKids(kids, method) {
    const sorted = [...kids];
    switch (method) {
      case 'A-Z': sorted.sort((a, b) => a.name.localeCompare(b.name)); break;
      case 'Z-A': sorted.sort((a, b) => b.name.localeCompare(a.name)); break;
      case 'youngest': sorted.sort((a, b) => a.age - b.age); break;
      case 'oldest': sorted.sort((a, b) => b.age - a.age); break;
    }
    return sorted;
  }

  const kids = loadKids();
  renderKids(kids);

  sortSelect.addEventListener('change', () => {
    const sorted = sortKids(loadKids(), sortSelect.value);
    renderKids(sorted);
  });
}


  // --- REGISTER A NEW KID PAGE ---
  (function registerKidHandler() {
    const tryInitForm = () => {
      const form = document.getElementById("kid-form");
      const submitBtn = document.getElementById("submit-kid");
  
      if (form && submitBtn) {
        submitBtn.addEventListener("click", function (e) {
          e.preventDefault();
  
          const fullName = document.getElementById("full-name").value.trim();
          const dob = document.getElementById("dob").value;
          const age = document.getElementById("age").value.trim();
          const gender = document.getElementById("gender").value;
          const weight = document.getElementById("weight").value.trim();
          const height = document.getElementById("height").value.trim();
          const phone = document.getElementById("phone").value.trim();
          const email = document.getElementById("email").value.trim();
  
          if (!fullName || !dob || !age || !gender || !weight || !height || !phone || !email) {
            alert("Please fill in all fields.");
            return;
          }
  
          if (!email.includes('@')) {
            alert("Email must contain '@'.");
            return;
          }
  
          if (/^\d/.test(fullName)) {
            alert("Name cannot start with a number.");
            return;
          }
  
          if (!/^\d{10}$/.test(phone)) {
            alert("Phone number must be exactly 10 digits.");
            return;
          }
  
          const kidData = {
            name: fullName,
            dob: dob,
            age: age,
            gender: gender,
            weight: weight,
            height: height,
            phone: phone,
            email: email,
            image: "images/Kid1.jpeg"
          };
  
          let savedKids = JSON.parse(localStorage.getItem("kids")) || [];
          savedKids.push(kidData);
          localStorage.setItem("kids", JSON.stringify(savedKids));
  
          alert("Kid successfully registered!");
          form.reset();
  
          const printWindow = window.open('', '_blank');
          printWindow.document.write(`
            <html>
            <head>
              <title>Print Kid Info</title>
              <style>
                body { font-family: Arial, sans-serif; padding: 2em; }
                .info-container { border: 1px solid #ccc; padding: 2em; width: 500px; margin: auto; }
                .profile-pic { width: 100px; height: 100px; border-radius: 50%; object-fit: cover; margin-bottom: 1em; }
                .info-line { margin-bottom: 0.7em; font-size: 1em; }
              </style>
            </head>
            <body onload="window.print();">
              <div class="info-container">
                <center><img src="${kidData.image}" class="profile-pic" alt="Child Photo"></center>
                <div class="info-line"><strong>Child Name:</strong> ${kidData.name}</div>
                <div class="info-line"><strong>DOB:</strong> ${kidData.dob}</div>
                <div class="info-line"><strong>Gender:</strong> ${kidData.gender}</div>
                <div class="info-line"><strong>Phone:</strong> ${kidData.phone}</div>
                <div class="info-line"><strong>Email:</strong> ${kidData.email}</div>
              </div>
            </body>
            </html>
          `);
          printWindow.document.close();
        });
      } else {
        // Retry init until DOM is ready (if needed)
        setTimeout(tryInitForm, 200);
      }
    };
  
    tryInitForm();
  })();
  
// --- END REGISTER A NEW KID PAGE ---


document.addEventListener('DOMContentLoaded', function() {
  // Schedule Page Functionality
  if (document.getElementById('weekDate')) {
      function displayCurrentDate() {
          const today = new Date();
          const options = { weekday: 'long', month: 'long', day: 'numeric' };
          const currentDateString = today.toLocaleDateString('en-US', options);
          document.getElementById('weekDate').textContent = `Current Date: ${currentDateString}`;
          
          // Highlight current day in schedule
          const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
          const currentDay = days[today.getDay()];
          
          document.querySelectorAll('.schedule-table tbody tr').forEach(row => {
              const dayCell = row.querySelector('td:first-child');
              if (dayCell && dayCell.textContent.toLowerCase() === currentDay) {
                  row.classList.add('current-day');
              }
          });
      }
      displayCurrentDate();
  }

  // Activity Evaluation Page Functionality
  if (document.querySelector('.star')) {
      // Star rating 
      document.querySelectorAll('.star').forEach(star => {
          star.addEventListener('click', function() {
              const value = parseInt(this.dataset.value);
              document.getElementById('rating').value = value;
              
              document.querySelectorAll('.star').forEach(s => {
                  s.classList.remove('active', 'rating-1', 'rating-2', 'rating-3', 'rating-4', 'rating-5');
              });
              
              document.querySelectorAll('.star').forEach((s, index) => {
                  if(index < value) {
                      s.classList.add('active', `rating-${value}`);
                  }
              });
          });
      });

      // Form submission handling
      document.querySelector('form').addEventListener('submit', function(e) {
          e.preventDefault();
          const activity = document.getElementById('activity-dropdown').value;
          const rating = document.getElementById('rating').value;
          const feedback = document.getElementById('feedback').value;
          
          if (!activity || rating === '0') {
              alert('Please select an activity and provide a rating!');
              return;
          }
          
          alert(`Thank you for your feedback!\nActivity: ${activity}\nRating: ${rating} stars\nFeedback: ${feedback || "No feedback provided"}`);
          window.location.href = 'index.html';
      });
  }
});  // Properly closed here


/*admin js */
// admin1

document.addEventListener('DOMContentLoaded', () => {
  const extras    = document.querySelectorAll('#kids-list li.extra');
  const toggleBtn = document.getElementById('toggle-kids');
  let isExpanded  = false;

  // If there's no toggle button or no extra items, exit early
  if (!toggleBtn || extras.length === 0) return;

  toggleBtn.addEventListener('click', () => {
    isExpanded = !isExpanded;

    extras.forEach(li => {
      // use list-item so each <li> stays on its own line
      li.style.display = isExpanded ? 'list-item' : 'none';
    });

    // swap the button text
    toggleBtn.textContent = isExpanded ? 'Less' : 'More';
  });
});
/* end admin js */
