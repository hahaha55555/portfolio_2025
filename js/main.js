document.addEventListener("DOMContentLoaded", function () {
  // 헤더
  const header = document.querySelector("header");

  window.addEventListener("scroll", () => {
    if (document.documentElement.scrollTop > 50) {
      header.classList.add("on");
    } else {
      header.classList.remove("on");
    }
  });

  const gnbLinks = document.querySelectorAll(".gnb a");

  // gnb 클릭 시 스크롤 이동 + active 클래스
  gnbLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      gnbLinks.forEach((eve) => eve.classList.remove("active"));
      this.classList.add("active");

      const targetId = this.getAttribute("href");

      if (targetId === "#") {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        return;
      }

      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const headerHeight = header.offsetHeight;
        const targetOffset = targetElement.offsetTop - headerHeight;

        window.scrollTo({
          top: targetOffset,
          behavior: "smooth",
        });
      }
    });
  });

  // 스크롤 시 섹션에 따라 gnb 메뉴 자동 active
  const sections = document.querySelectorAll("section[id]");

  window.addEventListener("scroll", () => {
    let currentSectionId = "";

    if (window.scrollY === 0) {
      gnbLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === "#mainV");
      });
      return;
    }

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 100 && rect.bottom >= 100) {
        currentSectionId = section.id;
      }
    });

    gnbLinks.forEach((link) => {
      const linkHref = link.getAttribute("href").replace("#", "");
      if (linkHref === currentSectionId) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  });

  // fade-up 애니메이션 (IntersectionObserver)
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        } else {
          entry.target.classList.remove("show");
        }
      });
    },
    { threshold: 0.5 }
  );

  document.querySelectorAll(".fade-up").forEach((el) => {
    observer.observe(el);
  });
});
