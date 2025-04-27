// Smooth scroll behavior for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Offset for fixed header if needed
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mobile menu toggle
    const createMobileMenu = () => {
        const nav = document.querySelector('nav');
        const navUl = nav.querySelector('ul');
        
        // Create hamburger menu button
        const hamburger = document.createElement('div');
        hamburger.className = 'hamburger';
        hamburger.innerHTML = '<span></span><span></span><span></span>';
        nav.insertBefore(hamburger, navUl);
        
        // Toggle menu on click
        hamburger.addEventListener('click', () => {
            navUl.classList.toggle('show');
            hamburger.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        navUl.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navUl.classList.remove('show');
                hamburger.classList.remove('active');
            });
        });
    };
    
    // Only create mobile menu for smaller screens
    if (window.innerWidth < 850) {
        createMobileMenu();
    }
    
    // Handle resize events
    window.addEventListener('resize', () => {
        if (window.innerWidth < 850 && !document.querySelector('.hamburger')) {
            createMobileMenu();
        }
    });

    // Typewriter effect for intro headline
    const typeWriter = () => {
        const headline = document.querySelector('#intro h2');
        const originalText = headline.textContent;
        headline.textContent = '';
        
        let i = 0;
        const typing = setInterval(() => {
            if (i < originalText.length) {
                headline.textContent += originalText.charAt(i);
                i++;
            } else {
                clearInterval(typing);
                // Add blinking cursor at the end
                const cursor = document.createElement('span');
                cursor.className = 'cursor';
                cursor.textContent = '|';
                headline.appendChild(cursor);
            }
        }, 100);
    };
    
    typeWriter();

    // Reveal animations on scroll
    const revealOnScroll = () => {
        const elements = document.querySelectorAll('.reveal');
        
        elements.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    };
    
    // Add reveal class to elements we want to animate
    document.querySelectorAll('#projects article, .info-card').forEach(el => {
        el.classList.add('reveal');
    });
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Check on initial load

    // Add skill bars with animation
    const addSkillBars = () => {
        const skillsSection = document.querySelector('#skills .skills-text');
        const skillsData = [
            { name: 'Python', level: 90 },
            { name: 'C/C++', level: 80 },
            { name: 'JavaScript', level: 75 },
            { name: 'Java', level: 65 },
            { name: 'Elixir', level: 70 },
            { name: 'SQL', level: 85 },
            { name: 'Machine Learning', level: 80 },
            { name: 'Git', level: 85 }
        ];
        
        // Create container for skill bars
        const skillBarsContainer = document.createElement('div');
        skillBarsContainer.className = 'skill-bars';
        
        // Create skill bars
        skillsData.forEach(skill => {
            const skillBar = document.createElement('div');
            skillBar.className = 'skill-bar';
            
            const skillInfo = document.createElement('div');
            skillInfo.className = 'skill-info';
            
            const skillName = document.createElement('span');
            skillName.className = 'skill-name';
            skillName.textContent = skill.name;
            
            const skillPercent = document.createElement('span');
            skillPercent.className = 'skill-percent';
            skillPercent.textContent = `${skill.level}%`;
            
            skillInfo.appendChild(skillName);
            skillInfo.appendChild(skillPercent);
            
            const skillProgress = document.createElement('div');
            skillProgress.className = 'skill-progress';
            
            const skillProgressBar = document.createElement('div');
            skillProgressBar.className = 'skill-progress-bar';
            skillProgressBar.style.width = '0%';
            skillProgressBar.setAttribute('data-width', `${skill.level}%`);
            
            skillProgress.appendChild(skillProgressBar);
            
            skillBar.appendChild(skillInfo);
            skillBar.appendChild(skillProgress);
            
            skillBarsContainer.appendChild(skillBar);
        });
        
        // Replace the existing skills content
        skillsSection.innerHTML = '';
        skillsSection.appendChild(skillBarsContainer);
    };
    
    addSkillBars();

    // Animate skill bars on scroll
    const animateSkillBars = () => {
        const skillBars = document.querySelectorAll('.skill-progress-bar');
        
        skillBars.forEach(bar => {
            const targetWidth = bar.getAttribute('data-width');
            const rect = bar.getBoundingClientRect();
            
            if (rect.top < window.innerHeight) {
                bar.style.width = targetWidth;
            }
        });
    };
    
    window.addEventListener('scroll', animateSkillBars);
    setTimeout(animateSkillBars, 1000); // Initial animation after a delay

    // Create floating contact button
    const createFloatingContact = () => {
        const floatingBtn = document.createElement('div');
        floatingBtn.className = 'floating-contact';
        floatingBtn.innerHTML = '<i class="fa-solid fa-envelope"></i>';
        
        floatingBtn.addEventListener('click', () => {
            const contactSection = document.querySelector('#contact');
            window.scrollTo({
                top: contactSection.offsetTop,
                behavior: 'smooth'
            });
        });
        
        document.body.appendChild(floatingBtn);
    };
    
    createFloatingContact();

    // Theme toggle functionality
    const createThemeToggle = () => {
        const themeToggle = document.createElement('div');
        themeToggle.className = 'theme-toggle';
        themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
        
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            
            // Update icon based on theme
            if (document.body.classList.contains('light-theme')) {
                themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
            } else {
                themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
            }
        });
        
        // Add to the navigation
        const navUl = document.querySelector('nav ul');
        const liElement = document.createElement('li');
        liElement.appendChild(themeToggle);
        navUl.appendChild(liElement);
    };
    
    createThemeToggle();

    // Initialize particles.js for intro section background
    const initParticles = () => {
        // Create a canvas element for particles
        const particlesContainer = document.createElement('div');
        particlesContainer.id = 'particles-js';
        
        // Insert before the first child of intro section
        const introSection = document.querySelector('#intro');
        introSection.insertBefore(particlesContainer, introSection.firstChild);
        
        // Load particles.js script
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js';
        script.onload = () => {
            // Configure particles
            particlesJS('particles-js', {
                particles: {
                    number: { value: 80, density: { enable: true, value_area: 800 } },
                    color: { value: '#86fbfb' },
                    shape: { type: 'circle' },
                    opacity: { value: 0.5, random: false },
                    size: { value: 3, random: true },
                    line_linked: {
                        enable: true,
                        distance: 150,
                        color: '#e310cb',
                        opacity: 0.4,
                        width: 1
                    },
                    move: {
                        enable: true,
                        speed: 2,
                        direction: 'none',
                        random: false,
                        straight: false,
                        out_mode: 'out',
                        bounce: false
                    }
                },
                interactivity: {
                    detect_on: 'canvas',
                    events: {
                        onhover: { enable: true, mode: 'grab' },
                        onclick: { enable: true, mode: 'push' },
                        resize: true
                    },
                    modes: {
                        grab: { distance: 140, line_linked: { opacity: 1 } },
                        push: { particles_nb: 4 }
                    }
                },
                retina_detect: true
            });
        };
        
        document.body.appendChild(script);
    };
    
    initParticles();

    // Add 3D tilt effect to project cards
    const addTiltEffect = () => {
        const projectCards = document.querySelectorAll('#projects article');
        
        projectCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const xPercent = x / rect.width;
                const yPercent = y / rect.height;
                
                const rotateX = (0.5 - yPercent) * 10;
                const rotateY = (xPercent - 0.5) * 10;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            });
        });
    };
    
    addTiltEffect();

    // Create project filter system
    const createProjectFilter = () => {
        // Extract all technologies from projects
        const technologies = new Set();
        document.querySelectorAll('#projects article ul li').forEach(li => {
            technologies.add(li.textContent.trim());
        });
        
        // Create filter container
        const filterContainer = document.createElement('div');
        filterContainer.className = 'project-filter';
        filterContainer.innerHTML = '<h3>Filter by technology:</h3>';
        
        // Create filter buttons
        const filterButtons = document.createElement('div');
        filterButtons.className = 'filter-buttons';
        
        // Add 'All' button
        const allButton = document.createElement('button');
        allButton.textContent = 'All';
        allButton.className = 'filter-btn active';
        allButton.setAttribute('data-filter', 'all');
        filterButtons.appendChild(allButton);
        
        // Add buttons for each technology
        technologies.forEach(tech => {
            const button = document.createElement('button');
            button.textContent = tech;
            button.className = 'filter-btn';
            button.setAttribute('data-filter', tech);
            filterButtons.appendChild(button);
        });
        
        filterContainer.appendChild(filterButtons);
        
        // Insert filter before projects
        const projectsSection = document.querySelector('#projects');
        projectsSection.insertBefore(filterContainer, projectsSection.querySelector('h2').nextSibling);
        
        // Add filter functionality
        filterButtons.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active button
                filterButtons.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const filter = btn.getAttribute('data-filter');
                
                // Filter projects
                document.querySelectorAll('#projects article').forEach(article => {
                    if (filter === 'all') {
                        article.style.display = 'grid';
                        return;
                    }
                    
                    const technologies = Array.from(article.querySelectorAll('ul li')).map(li => li.textContent.trim());
                    
                    if (technologies.includes(filter)) {
                        article.style.display = 'grid';
                    } else {
                        article.style.display = 'none';
                    }
                });
            });
        });
    };
    
    createProjectFilter();

    // Create interactive timeline for education and experience
    const createTimeline = () => {
        // Create timeline container
        const timelineContainer = document.createElement('div');
        timelineContainer.className = 'timeline-container';
        
        // Create timeline items from education and experience sections
        const educationSection = document.querySelector('#education');
        const experienceSection = document.querySelector('#experience');
        
        // Extract education data
        const educationData = {
            title: 'B.Tech in Computer Science and Engineering',
            institution: 'National Institute of Technology, Calicut',
            period: 'December 2020 – May 2024',
            type: 'education'
        };
        
        // Extract experience data
        const experienceData = {
            title: 'Analyst II - Data Science',
            institution: 'Accordion India',
            period: 'July 2024 - Present',
            type: 'experience'
        };
        
        // Timeline data
        const timelineData = [educationData, experienceData].sort((a, b) => {
            // Sort by end date (most recent first)
            const aEndYear = parseInt(a.period.split('–').pop().trim().split(' ').pop());
            const bEndYear = parseInt(b.period.split('–').pop().trim().split(' ').pop());
            return bEndYear - aEndYear;
        });
        
        // Create timeline
        const timeline = document.createElement('div');
        timeline.className = 'timeline';
        
        timelineData.forEach((item, index) => {
            const timelineItem = document.createElement('div');
            timelineItem.className = `timeline-item ${item.type}`;
            
            const timelineContent = document.createElement('div');
            timelineContent.className = 'timeline-content';
            
            const timelineDate = document.createElement('div');
            timelineDate.className = 'timeline-date';
            timelineDate.textContent = item.period;
            
            const timelineTitle = document.createElement('h3');
            timelineTitle.textContent = item.title;
            
            const timelineInstitution = document.createElement('h4');
            timelineInstitution.textContent = item.institution;
            
            const timelineIcon = document.createElement('div');
            timelineIcon.className = 'timeline-icon';
            timelineIcon.innerHTML = item.type === 'education' 
                ? '<i class="fa-solid fa-graduation-cap"></i>' 
                : '<i class="fa-solid fa-briefcase"></i>';
            
            timelineContent.appendChild(timelineDate);
            timelineContent.appendChild(timelineTitle);
            timelineContent.appendChild(timelineInstitution);
            
            timelineItem.appendChild(timelineContent);
            timelineItem.appendChild(timelineIcon);
            
            timeline.appendChild(timelineItem);
        });
        
        timelineContainer.appendChild(timeline);
        
        // Replace education and experience sections with timeline
        const infoContainer = document.querySelector('.info-container');
        const timelineSection = document.createElement('section');
        timelineSection.id = 'timeline-section';
        timelineSection.className = 'info-section timeline-section';
        
        const timelineCard = document.createElement('div');
        timelineCard.className = 'info-card';
        
        const timelineHeading = document.createElement('h2');
        timelineHeading.textContent = 'Education & Experience';
        
        timelineCard.appendChild(timelineHeading);
        timelineCard.appendChild(timelineContainer);
        
        timelineSection.appendChild(timelineCard);
        
        // Replace the education and experience sections with the timeline
        const educationDiv = document.querySelector('.education-div');
        const experienceDiv = document.querySelector('.experience-div');
        
        infoContainer.insertBefore(timelineSection, educationDiv);
        infoContainer.removeChild(educationDiv);
        infoContainer.removeChild(experienceDiv);
    };
    
    createTimeline();
});