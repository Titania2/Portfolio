let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');


menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}


window.onscroll = () => {
    menu.classList.remove('bx-x');
    navbar.classList.remove('active');
}


const typed = new Typed('.multiple-text', {
    strings: ['Game Developer', 'Web Developer', 'Machine Learning Engineer', 'AI Engineer'],
    typeSpeed: 80,
    backSpeed: 80,
    backDelay: 1200,
    loop: true
});

// Skills Section Animation
document.addEventListener('DOMContentLoaded', () => {
  const skillCategories = document.querySelectorAll('.skill-category');
  
  skillCategories.forEach(category => {
    const skillBars = category.querySelectorAll('.skill-bar');
    const progressBars = category.querySelectorAll('.skill-progress');
    
    // Create falling balls
    function createFallingBalls(progressBar, skillBar) {
      const balls = [];
      const barWidth = progressBar.offsetWidth;
      const barHeight = progressBar.offsetHeight;
      const targetWidth = skillBar.getAttribute('data-level');
      
      // Create initial balls
      for (let i = 0; i < 5; i++) {
        const ball = document.createElement('div');
        ball.className = 'skill-ball';
        ball.style.left = `${Math.random() * barWidth}px`;
        progressBar.appendChild(ball);
        balls.push(ball);
      }
      
      // Animate balls
      let currentWidth = 0;
      const interval = setInterval(() => {
        if (currentWidth >= targetWidth) {
          clearInterval(interval);
          // Reset animation immediately
          balls.forEach(ball => ball.remove());
          skillBar.style.width = '0%';
          setTimeout(() => {
            createFallingBalls(progressBar, skillBar);
          }, 100); // Small delay before restarting
          return;
        }
        
        currentWidth += 1;
        skillBar.style.width = `${currentWidth}%`;
        
        // Add new ball
        if (Math.random() < 0.3) {
          const ball = document.createElement('div');
          ball.className = 'skill-ball';
          ball.style.left = `${Math.random() * barWidth}px`;
          progressBar.appendChild(ball);
          balls.push(ball);
        }
        
        // Remove balls that have fallen
        balls.forEach((ball, index) => {
          if (ball.offsetTop > barHeight) {
            ball.remove();
            balls.splice(index, 1);
          }
        });
      }, 150); // Adjust speed of progress
    }
    
    // Initialize animations for each skill
    skillBars.forEach((skillBar, index) => {
      const progressBar = progressBars[index];
      createFallingBalls(progressBar, skillBar);
    });
  });
});

// Contact Form Handling
document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData.entries());
      
      try {
        // Show loading state
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual API call)
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = `
          <i class='bx bx-check-circle'></i>
          <p>Message sent successfully!</p>
        `;
        contactForm.appendChild(successMessage);
        
        // Reset form
        contactForm.reset();
        
        // Remove success message after 3 seconds
        setTimeout(() => {
          successMessage.remove();
          submitBtn.innerHTML = originalBtnText;
          submitBtn.disabled = false;
        }, 3000);
        
      } catch (error) {
        // Show error message
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.innerHTML = `
          <i class='bx bx-error-circle'></i>
          <p>Something went wrong. Please try again.</p>
        `;
        contactForm.appendChild(errorMessage);
        
        // Remove error message after 3 seconds
        setTimeout(() => {
          errorMessage.remove();
          submitBtn.innerHTML = originalBtnText;
          submitBtn.disabled = false;
        }, 3000);
      }
    });
  }
});