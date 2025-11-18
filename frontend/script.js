document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#bookingForm");
    const submitBtn = form?.querySelector(".btn-submit");

    const dateInput = document.getElementById("date");
    if(dateInput){
      const today = new Date().toISOString().split('T')[0];
      dateInput.setAttribute('min', today);
    }
  
    form?.addEventListener("submit", async (e) => {
      e.preventDefault();
  
      const formData = {
        name: document.getElementById("name").value.trim(),
        email: document.getElementById("email").value.trim(),
        lessonType: document.getElementById("lessonType").value,
        date: document.getElementById("date").value,
        message: document.getElementById("message").value.trim(),
      };
  
      if (!formData.name || !formData.email || !formData.lessonType || !formData.date) {
        showNotification("Please fill in all required fields.", "error");
        return;
      }
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if(!emailRegex.test(formData.email)){
        showNotification("Please enter a valid email address.", "error");
        return;
      }

      submitBtn.classList.add("loading");
      submitBtn.disabled = true;

      try {
        const res = await fetch("http://127.0.0.1:5050/book", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
  
        if (res.ok) {
          alert("🎉 Lesson Booked! Check your email for confirmation.", "success");
          form.reset();

          setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth'});
          }, 2000);
        } else {
          const data = await res.json();
          console.error("Server error:", data);
          showNotification("Something went wrong. Please try again or contact us directly.", "error");
        }
      } catch (err) {
        console.error("Network error:", err);
        showNotification("Could not connect to the server. Please check your connection.", "error");
      } finally {
        submitBtn.classList.remove("loading");
        submitBtn.disabled = false;
      }
    });
  
  
  function showNotification(message, type){
    const existing = document.querySelector(".custom-notification");
    if (existing){
      existing.remove();
    }

    const notification = document.createElement("div");
    notification.className = `custom-notification ${type}`;
    notification.textContent = message;

    notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 30px;
    background: ${type} === 'success' ? '#10b981' : '#ef4444'};
    color: white;
    padding: 20px 30px;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0,0,0,.3);
    z-index: 10000;
    font-weight: 600;
    max-width: 400px;
    animation: slideInRight .5s ease;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.animation = "slideOutRight .5s ease";
      setTimeout(() => notification.remove(), 500);
    }, 5000);
  }


  if (!document.querySelector("#notification-styles")){
    const style = document.createElement("style");
    style.id = "notification-styles";
    style.textContent = `
      @keyframes slideInRight {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
      @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(400px); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }
  
    // SECTION ANIMATIONS
    const sections = document.querySelectorAll("section");
    sections.forEach((section) => {
      section.style.opacity = "0";
      section.style.transform = "translateY(40px)";
      section.style.transition = "opacity 1s ease, transform 1s ease";
    });
  
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          } else {
            entry.target.style.opacity = "0";
            entry.target.style.transform = "translateY(40px)";
          }
        });
      },
      { threshold: 0.3 }
    );
  
    sections.forEach((section) => sectionObserver.observe(section));

    // ABOUT SECTION FADE-IN
    const aboutSection = document.querySelector(".about-container");
    if (aboutSection) {
      const aboutObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("about-visible");
            } else {
              entry.target.classList.remove("about-visible");
            }
          });
        },
        { threshold: 0.3 }
      );
      aboutObserver.observe(aboutSection);
    }

    // Header Background on scroll
    const header = document.querySelector("header");
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        header.style.background = "rgba(255,255,255,.98)";
        header.style.boxShadow = "0 6px 30px rgba(0,0,0,.2)";
      } else {
        header.style.background = "rgba(255,255,255,.95)";
        header.style.boxShadow = "0 4px 20px rgba(0,0,0,.1)";
      }
    });

    //smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  });