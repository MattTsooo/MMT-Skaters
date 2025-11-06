document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#bookingForm");
  
    form?.addEventListener("submit", async (e) => {
      e.preventDefault();
  
      const formData = {
        name: document.getElementById("name").value.trim(),
        email: document.getElementById("email").value.trim(),
        lessonType: document.getElementById("lessonType").value,
        message: document.getElementById("message").value.trim(),
      };
  
      if (!formData.name || !formData.email || !formData.lessonType) {
        alert("Please fill in all required fields.");
        return;
      }
  
      try {
        const res = await fetch("http://127.0.0.1:5050/book", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
  
        if (res.ok) {
          alert("✅ Lesson Booked! Check your email for confirmation.");
          form.reset();
        } else {
          const data = await res.json();
          console.error("Server error:", data);
          alert("❌ Something went wrong. Please try again later.");
        }
      } catch (err) {
        console.error("Network error:", err);
        alert("⚠️ Could not connect to the server.");
      }
    });
  });  
  
    // SECTION ANIMATIONS
    const sections = document.querySelectorAll("section");
    sections.forEach((section) => {
      section.style.opacity = "0";
      section.style.transform = "translateY(40px)";
      section.style.transition = "opacity 0.8s ease, transform 0.8s ease";
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

    // 💫 ABOUT SECTION FADE-IN
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
  